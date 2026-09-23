import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode, type PointerEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

export const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, delay = 0, y = 40, ...rest }: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Word-by-word rise, echoing the original's per-letter heading reveal.
export function SplitHeading({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ staggerChildren: 0.05 }}
      aria-label={text}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%', rotate: 6 }, show: { y: '0%', rotate: 0 } }}
            transition={{ duration: 0.9, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold tracking-tight text-white/90">
      <span className="text-accent">✳</span> {children}
    </p>
  )
}

// 3D tilt with a glare spot that follows the pointer.
export function Tilt({ children, className = '', max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 15 })
  const glare = useTransform(() => `radial-gradient(circle at ${px.get() * 100}% ${py.get() * 100}%, rgb(255 255 255 / 0.28), transparent 55%)`)

  const onMove = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { px.set(0.5); py.set(0.5) }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-overlay" />
    </motion.div>
  )
}

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 14 })
  const y = useSpring(0, { stiffness: 200, damping: 14 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

// Pill CTA from the original (label + round arrow chip), rendered as liquid glass or solid cream.
export function PillButton({ href, children, variant = 'cream' }: { href: string; children: ReactNode; variant?: 'cream' | 'glass' }) {
  const base = 'group inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[0.95rem] font-bold tracking-tight whitespace-nowrap transition-transform duration-500 hover:scale-[1.04]'
  const skin = variant === 'cream'
    ? 'bg-cream text-ink shadow-[0_10px_40px_-8px_rgb(232_101_37/0.7)]'
    : 'glass-strong sheen text-white'
  return (
    <Magnetic>
      <a href={href} className={`${base} ${skin}`}>
        <span className="relative z-[2]">{children}</span>
        <span className="relative z-[2] grid size-8 place-items-center rounded-full bg-accent text-white transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="size-4" strokeWidth={2.4} />
        </span>
      </a>
    </Magnetic>
  )
}
