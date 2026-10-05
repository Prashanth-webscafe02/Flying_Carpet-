import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { REGISTER_URL } from '../config'
import { PillButton, ease } from '../effects/motion'
import { words } from '../market'

// Portrait phones get the tall cut-out; everything else (incl. landscape phones) the wide one.
const MOBILE_MQ = '(max-width: 767px) and (orientation: portrait)'

// Foreground cut-out geometry: aspect ratio, and the highest point of its ridge under the headline
// (as a fraction of the image height, measured from the alpha channel), plus how far (em) the bottom
// of the headline may sink below that ridge: desktop tucks the letter bottoms into the hill, phones
// keep the whole headline clear of it (a negative tuck leaves a small gap).
const FG = {
  desktop: { aspect: 1350 / 2899, ridge: 0.23, tuck: 0.3 },
  mobile: { aspect: 1026 / 750, ridge: 0.08, tuck: -0.06 },
}
const FG_BLEED = 1.06 // foreground is inset -3% on each side
const MIN_FONT = 36
// The headline (H2) is two lines: "For everything" / "last minute."
const LINES = ['For everything', 'last minute.']
const LEADING = 0.95

// Fit the headline into the sky above the ridge: first sink the foreground (up to 40% of its height),
// then shrink the headline, so wide but short screens never hide it behind the hills.
function useHeroFit(ref: RefObject<HTMLElement | null>) {
  const [fit, setFit] = useState({ font: 0, top: 0, drop: 0 })
  useLayoutEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ)
    const measure = () => {
      const el = ref.current
      if (!el) return
      const { width: w, height: h } = el.getBoundingClientRect()
      const fg = mq.matches ? FG.mobile : FG.desktop
      const fgH = w * FG_BLEED * fg.aspect
      const ridgeY = h - fgH * (1 - fg.ridge)
      // Position comes only from measured sizes (not font metrics or viewport units), so every browser
      // places it identically; it also always clears the fixed header.
      const headerH = document.querySelector('header')?.offsetHeight ?? 0
      const top = Math.max(h * (w < 768 ? 0.3 : 0.25), headerH + 90)
      const ideal = Math.min(w * 0.105, h * 0.15, 150)
      const above = LINES.length * LEADING - fg.tuck // em of headline that must sit above the ridge
      const drop = Math.min(Math.max(0, top + ideal * above - ridgeY), fgH * 0.4)
      const font = Math.max(MIN_FONT, Math.min(ideal, (ridgeY + drop - top) / above))
      setFit({ font, top, drop })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(ref.current!)
    mq.addEventListener('change', measure)
    return () => { ro.disconnect(); mq.removeEventListener('change', measure) }
  }, [ref])
  return fit
}

// Layered hero, like the original: sky layer, then the headline, then the foreground landscape cut-out.
// Each layer moves at its own depth on scroll and pointer for a parallax, "window" feel.
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const fit = useHeroFit(ref)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 20 })
  const smy = useSpring(my, { stiffness: 60, damping: 20 })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '90%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  const bgX = useTransform(smx, (v) => v * -12)
  const bgMY = useTransform(smy, (v) => v * -8)
  const textX = useTransform(smx, (v) => v * 18)
  const fgX = useTransform(smx, (v) => v * 30)

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5)
        my.set(e.clientY / window.innerHeight - 0.5)
      }}
      className="relative h-svh min-h-160 overflow-hidden"
    >
      {/* Sky */}
      <motion.div style={{ y: bgY, scale: bgScale, x: bgX, translateY: bgMY }} className="absolute inset-0">
        <picture>
          <source media={MOBILE_MQ} srcSet="/banner-bottom-mobile.webp" />
          <motion.img
            src="/banner-bottom.webp"
            alt=""
            initial={{ scale: 1.2, filter: 'blur(20px)' }}
            animate={{ scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
            transition={{ duration: 2, ease }}
            className="h-full w-full object-cover"
          />
        </picture>
      </motion.div>

      {/* Headline sits between sky and foreground; the small line floats just above it */}
      <motion.div style={{ y: textY, opacity: textOpacity, x: textX, top: fit.top }} className="absolute inset-x-0 z-2 flex justify-center px-4">
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="absolute bottom-full left-0 right-0 mb-3 text-center text-[clamp(0.7rem,1.1vw,0.9rem)] font-bold uppercase tracking-[0.2em] text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
          >
            The booking platform for {words.travelAgents}
          </motion.p>
          <h1
            style={{ fontSize: fit.font || undefined, lineHeight: LEADING }}
            className="text-center text-[clamp(2.5rem,min(10.5vw,15vh),9.5rem)] font-bold tracking-[-0.045em] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.28)]"
          >
            {LINES.map((line, l) => (
              <span key={line} className="block overflow-hidden whitespace-nowrap pb-[0.06em]">
                {line.split(' ').map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 + (l * 2 + i) * 0.09, ease }}
                    className="inline-block"
                  >
                    {i > 0 && '\u00a0'}
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </div>
      </motion.div>

      {/* Foreground landscape */}
      <motion.div style={{ y: fgY, x: fgX, bottom: -fit.drop }} className="pointer-events-none absolute inset-x-[-3%] bottom-0 z-3">
        <picture>
          <source media={MOBILE_MQ} srcSet="/banner-top-mobile.webp" />
          <motion.img
            src="/banner-top.webp"
            alt="Yurt camp on golden grassland with a horse grazing, snow mountains beyond"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease }}
            className="w-full object-cover object-bottom"
          />
        </picture>
      </motion.div>

      {/* Bottom fade into the fluid page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-4 h-40 bg-linear-to-t from-brand/80 to-transparent" />

      {/* Glass info card */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
        transition={{ duration: 1.2, delay: 1, ease }}
        className="glass-orange absolute bottom-8 left-4 right-4 z-5 rounded-4xl p-6 md:bottom-14 md:left-10 md:right-auto md:max-w-lg md:p-7"
      >
        <p className="mb-5 text-[clamp(1.05rem,1.4vw,1.35rem)] font-bold leading-[1.35] tracking-[-0.02em]">
          When your client needs to travel soon, have the answer now. 400+ airlines, 300,000+ hotels and 400,000+ experiences on one login, with 24/7 help.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <PillButton href={REGISTER_URL} target="_blank">Register free</PillButton>
          <PillButton href="/get-started" variant="glass">Explore destinations</PillButton>
        </div>
        <p className="mt-4 text-sm font-semibold text-white/85">Free to register. No fees, no minimum.</p>
      </motion.div>
    </section>
  )
}
