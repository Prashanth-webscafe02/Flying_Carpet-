import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, type MotionValue } from 'framer-motion'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { ease } from './motion'

// The Lucid Line: the brand's hairline wave with small dot nodes (see the campaign creatives).
// One engine draws every instance: it measures its box, threads a smooth curve through the
// route's anchors, draws in (on load or with scroll), then breathes slowly with a glint gliding along.

type Pt = [number, number]
type Seg = [Pt, Pt, Pt, Pt]
type Box = { top: number; left: number; right: number; bottom: number }
type Route = { pts: Pt[]; dots: [number, number][] } // dots: [segment index, t along it]

const INTRO_DELAY = 1.1
const INTRO_TIME = 2.4
const BREATH_PERIOD = 9 // seconds per slow undulation
const GLINT_PERIOD = 7 // seconds between glints
const GLINT_TRAVEL = 3.2 // seconds a glint takes to cross

// Layout-space box of `el` inside `root` (offsets ignore transforms, so parallax can't skew it).
function boxWithin(el: HTMLElement, root: HTMLElement): Box {
  let top = 0
  let left = 0
  let n: HTMLElement | null = el
  while (n && n !== root) {
    top += n.offsetTop
    left += n.offsetLeft
    n = n.offsetParent as HTMLElement | null
  }
  return { top, left, right: left + el.offsetWidth, bottom: top + el.offsetHeight }
}

// Catmull-Rom through the anchors, as cubic Bézier segments.
function segments(p: Pt[]): Seg[] {
  const out: Seg[] = []
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]
    const p1 = p[i]
    const p2 = p[i + 1]
    const p3 = p[i + 2] ?? p2
    out.push([
      p1,
      [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
      [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
      p2,
    ])
  }
  return out
}

const f = (n: number) => n.toFixed(1)
const toD = (s: Seg[]) => `M${f(s[0][0][0])},${f(s[0][0][1])}` + s.map(([, a, b, c]) => ` C${f(a[0])},${f(a[1])} ${f(b[0])},${f(b[1])} ${f(c[0])},${f(c[1])}`).join('')

function at([a, b, c, d]: Seg, t: number): Pt {
  const u = 1 - t
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t]
  return [k[0] * a[0] + k[1] * b[0] + k[2] * c[0] + k[3] * d[0], k[0] * a[1] + k[1] * b[1] + k[2] * c[1] + k[3] * d[1]]
}

// Fraction of the whole curve's length at which each dot sits, so it can appear as the stroke reaches it.
function dotFractions(segs: Seg[], dots: [number, number][]) {
  const N = 24
  const lens = segs.map((s) => {
    let len = 0
    let prev = s[0]
    for (let i = 1; i <= N; i++) {
      const p = at(s, i / N)
      len += Math.hypot(p[0] - prev[0], p[1] - prev[1])
      prev = p
    }
    return len
  })
  const total = lens.reduce((a, b) => a + b, 0) || 1
  return dots.map(([i, t]) => (lens.slice(0, i).reduce((a, b) => a + b, 0) + lens[i] * t) / total)
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

function LucidPath({ route, observe, progress }: {
  route: (w: number, h: number, host: HTMLElement) => Route | null
  observe?: RefObject<HTMLElement | null>[]
  progress: MotionValue<number>
}) {
  const reduce = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const glintRef = useRef<SVGPathElement>(null)
  const haloRef = useRef<SVGPathElement>(null)
  const shadeRef = useRef<SVGPathElement>(null)
  const dotRefs = useRef<(SVGCircleElement | null)[]>([])

  useEffect(() => {
    const svg = svgRef.current
    const host = svg?.parentElement
    if (!svg || !host) return
    let base: Route | null = null
    let fracs: number[] = []
    let len = 1 // curve length in px (dashes are in px, not pathLength, for identical results in every browser)
    let amp = 0
    let visible = false
    let raf = 0
    let drawnAt: number | null = null

    const render = (time: number) => {
      if (!base) return
      const s = time / 1000
      const pts = reduce ? base.pts : base.pts.map(([x, y], i): Pt => [x, y + amp * Math.sin((s / BREATH_PERIOD) * Math.PI * 2 + i * 1.3)])
      const segs = segments(pts)
      const d = toD(segs)
      const p = reduce ? 1 : clamp01(progress.get())

      const dash = p >= 0.999 ? 'none' : `${(p * len).toFixed(1)} ${(len * 2).toFixed(0)}`
      for (const el of [lineRef.current, shadeRef.current]) {
        if (!el) continue
        el.setAttribute('d', d)
        el.style.visibility = p < 0.002 ? 'hidden' : 'visible'
        el.style.strokeDasharray = dash
      }
      dotRefs.current.forEach((dot, k) => {
        if (!dot) return
        const spot = base!.dots[k]
        if (!spot) { dot.style.opacity = '0'; return }
        const [x, y] = at(segs[spot[0]], spot[1])
        const a = clamp01((p - fracs[k]) / 0.03)
        dot.setAttribute('transform', `translate(${f(x)} ${f(y)}) scale(${(0.3 + 0.7 * a).toFixed(3)})`)
        dot.style.opacity = String(a)
      })

      // Glint: a short bright dash (with a soft halo) gliding along the line, once per period,
      // once it's fully drawn. Plain strokes, no filters, so it costs almost nothing to paint.
      if (p < 0.999) drawnAt = null
      else if (drawnAt === null) drawnAt = s
      const phase = drawnAt === null || reduce ? 2 : ((s - drawnAt) % GLINT_PERIOD) / GLINT_TRAVEL
      const glint = Math.min(90, len * 0.08)
      for (const el of [glintRef.current, haloRef.current]) {
        if (!el) continue
        if (phase > 1) { if (el.style.opacity !== '0') el.style.opacity = '0'; continue }
        el.setAttribute('d', d)
        el.style.opacity = String(Math.sin(phase * Math.PI))
        el.style.strokeDasharray = `${glint.toFixed(1)} ${(len * 2).toFixed(0)}`
        el.style.strokeDashoffset = (glint - easeInOut(phase) * (len + glint)).toFixed(1)
      }
    }

    const measure = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      svg.setAttribute('width', String(w))
      svg.setAttribute('height', String(h))
      base = w && h ? route(w, h, host) : null
      if (!base) return
      fracs = dotFractions(segments(base.pts), base.dots)
      const line = lineRef.current
      if (line) { line.setAttribute('d', toD(segments(base.pts))); len = line.getTotalLength() || 1 }
      const ys = base.pts.map((q) => q[1])
      amp = Math.min(10, Math.max(3, (Math.max(...ys) - Math.min(...ys)) * 0.05))
      render(performance.now())
    }

    const loop = (t: number) => {
      render(t)
      raf = visible ? requestAnimationFrame(loop) : 0
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    observe?.forEach((r) => r.current && ro.observe(r.current))
    // Only animate while on screen; reduced motion renders a still, fully drawn line.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf && !reduce) raf = requestAnimationFrame(loop)
    })
    io.observe(host)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [route, observe, progress, reduce])

  return (
    // No CSS filters here: a filter re-rasterises the whole SVG every frame. A faint navy underlay
    // stroke gives the same lift on bright photos for a fraction of the cost.
    <svg ref={svgRef} aria-hidden className="lucid-line pointer-events-none absolute left-0 top-0 overflow-visible">
      <path ref={shadeRef} fill="none" stroke="rgb(11 9 69)" strokeOpacity={0.16} strokeWidth={4} style={{ visibility: 'hidden' }} />
      <path ref={lineRef} fill="none" stroke="white" strokeOpacity={0.9} strokeWidth={1.25} style={{ visibility: 'hidden' }} />
      <path ref={haloRef} fill="none" stroke="white" strokeOpacity={0.22} strokeWidth={7} strokeLinecap="round" style={{ opacity: 0 }} />
      <path ref={glintRef} fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" style={{ opacity: 0 }} />
      {[0, 1, 2].map((k) => (
        <circle key={k} ref={(el) => { dotRefs.current[k] = el }} r={3.4} fill="white" style={{ opacity: 0 }} />
      ))}
    </svg>
  )
}

// Draws in once, when `start` turns true (after the page's intro by default).
function useIntroProgress(delay = INTRO_DELAY, start = true) {
  const p = useMotionValue(0)
  useEffect(() => {
    if (!start) return
    const c = animate(p, 1, { duration: INTRO_TIME, delay, ease: [0.65, 0, 0.35, 1] })
    return () => c.stop()
  }, [p, delay, start])
  return p
}

// Hero line: routed from the measured headline and card, so it always runs through the clear
// space between them and never crosses text.
function heroRoute(headline: RefObject<HTMLElement | null>, card: RefObject<HTMLElement | null>) {
  return (w: number, h: number, host: HTMLElement): Route | null => {
    const root = host.closest('section') as HTMLElement | null
    if (!root || !headline.current || !card.current) return null
    const text = boxWithin(headline.current, root)
    const c = boxWithin(card.current, root)
    const gap = Math.max(20, h * 0.04)
    const T = text.bottom + gap
    const B = Math.max(T + 40, c.top - gap)
    const band = B - T
    // Wide screens have room right of the headline: dip just past the card, then rise into a crest
    // there, like the creatives. The dip stays above the bottom controls.
    if (w - text.right > w * 0.2) {
      const floor = h - Math.max(130, h * 0.2)
      const troughX = Math.max(0.28 * w, c.right + 0.06 * w)
      const troughY = Math.min(floor, T + Math.max(60, (floor - T) * 0.5))
      const crestX = Math.min(w * 0.9, text.right + (w - text.right) * 0.55)
      const crestY = Math.max(text.top + (text.bottom - text.top) * 0.3, h * 0.2)
      const pts: Pt[] = [[-0.04 * w, Math.max(T + 10, Math.min(B, troughY) - band * 0.3)], [troughX, troughY], [text.right + 0.02 * w, T + (troughY - T) * 0.25], [crestX, crestY], [1.05 * w, crestY + h * 0.1]]
      // First dot on the entry stroke when it's clear of the card, else on the rising stroke.
      const entry = at(segments(pts)[0], 0.55)
      const clear = entry[0] > c.right || entry[1] < c.top - 12
      return { pts, dots: [clear ? [0, 0.55] : [1, 0.3], [2, 0.45]] }
    }
    // Narrow screens: a gentle S inside the band between headline and card.
    return {
      pts: [[-0.06 * w, T + band * 0.3], [0.28 * w, B], [0.74 * w, T], [1.06 * w, T + band * 0.35]],
      dots: [[0, 0.6], [1, 0.7]],
    }
  }
}

export default function LucidLine({ headline, card }: { headline: RefObject<HTMLElement | null>; card: RefObject<HTMLElement | null> }) {
  const progress = useIntroProgress()
  const [observe] = useState(() => [headline, card])
  const [route] = useState(() => heroRoute(headline, card))
  return (
    <div className="absolute inset-0">
      <LucidPath route={route} observe={observe} progress={progress} />
    </div>
  )
}

// Ready-made wave shapes, as fractions of the wave's box. Each enters and exits past the edges.
const waves = {
  // dips on the left, rises to a crest on the right (the creatives' signature S)
  rise: { pts: [[-0.05, 0.4], [0.3, 0.82], [0.72, 0.22], [1.05, 0.42]], dots: [[0, 0.6], [1, 0.62]] },
  // crest on the left, dip on the right
  fall: { pts: [[-0.05, 0.55], [0.26, 0.2], [0.68, 0.8], [1.05, 0.5]], dots: [[0, 0.7], [2, 0.35]] },
  // a long low swell with a single lift
  swell: { pts: [[-0.05, 0.72], [0.45, 0.66], [0.8, 0.22], [1.05, 0.3]], dots: [[1, 0.2], [2, 0.3]] },
  // low along the left, lifting away on the right (for photos with a card on the left)
  lift: { pts: [[-0.05, 0.9], [0.55, 0.86], [0.82, 0.45], [1.05, 0.2]], dots: [[1, 0.55], [2, 0.4]] },
} satisfies Record<string, { pts: Pt[]; dots: [number, number][] }>

// A Lucid Line in its own box (positioned by `className`), meant to sit behind the surrounding
// content. `draw`: 'scroll' (default) draws it in as it scrolls into view and back out when scrolling
// up; 'view' draws it once on first sight (for spots the page may not scroll past); 'intro' on load.
export function LucidWave({ shape = 'rise', mirror = false, draw = 'scroll', className = '' }: {
  shape?: keyof typeof waves
  mirror?: boolean
  draw?: 'scroll' | 'view' | 'intro'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 0.45'] })
  const scrolled = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.0005 })
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const intro = useIntroProgress(draw === 'view' ? 0.2 : 0.6, draw !== 'view' || seen)
  const [route] = useState(() => (w: number, h: number): Route => {
    const { pts, dots } = waves[shape]
    return { pts: pts.map(([x, y]): Pt => [(mirror ? 1 - x : x) * w, y * h]), dots: dots as [number, number][] }
  })
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none ${className}`}>
      <LucidPath route={route} progress={draw === 'scroll' ? scrolled : intro} />
    </div>
  )
}

// The small arc-and-dot sign-off from the creatives' bottom-left corner; draws itself in on view.
export function LucidCorner({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const view = { once: true, margin: '0px 0px -5% 0px' } as const
  return (
    <svg aria-hidden width="104" height="112" viewBox="0 0 104 112" className={`pointer-events-none overflow-visible ${className}`}>
      <motion.path
        d="M-2,12 A96,96 0 0 1 90,112"
        fill="none"
        stroke="white"
        strokeOpacity={0.85}
        strokeWidth={1.25}
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={view}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.circle
        cx={62}
        cy={40}
        r={3.4}
        fill="white"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={view}
        transition={{ duration: 0.6, delay: 0.7, ease }}
      />
    </svg>
  )
}
