import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { destinations } from '../content'
import { Eyebrow, PillButton, Reveal, SplitHeading } from '../effects/motion'

type D = (typeof destinations)[number]

// Sticky stacking cards: each destination pins, then shrinks and dims as the next one slides over it.
function Card({ d, i, total, progress }: { d: D; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.035])
  const dim = useTransform(progress, [start, start + 1 / total], [0, i === total - 1 ? 0 : 0.45])

  // Every card gets a fixed, viewport-bound height so the next card never slides over unread content.
  const top = `calc(5.5rem + ${i * 14}px)`

  return (
    <div className="sticky top-0 flex h-[100svh] items-start justify-center px-4 md:px-8" style={{ paddingTop: top }}>
      <motion.article
        style={{ scale, height: `min(calc(100svh - ${top} - 1.5rem), 640px)` }}
        className="glass-strong relative grid w-full max-w-6xl origin-top grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[2rem] md:grid-cols-2 md:grid-rows-1 md:rounded-[2.5rem]"
      >
        <div className="relative z-[1] flex min-h-0 flex-col justify-between gap-5 p-6 md:gap-6 md:p-12">
          <div className="min-h-0">
            <p className="mb-2 text-sm font-semibold text-accent md:mb-3">0{i + 1} / 0{total}</p>
            <h3 className="text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.06em]">{d.name}</h3>
            <p className="mt-4 line-clamp-4 text-[0.95rem] leading-relaxed text-white/75 md:mt-5 md:line-clamp-6 md:text-base lg:line-clamp-none">{d.text}</p>
          </div>
          <div><PillButton href="#journeys">Get Agency Access</PillButton></div>
        </div>
        <div className="relative min-h-0 overflow-hidden">
          <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/40 to-transparent md:from-brand/30" />
        </div>
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-[3] bg-brand" />
      </motion.article>
    </div>
  )
}

export default function Destinations() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="destinations" className="relative">
      <div className="mx-auto max-w-7xl px-4 pt-28 md:px-8 md:pt-40">
        <Reveal><Eyebrow>Destinations</Eyebrow></Reveal>
        <div className="grid items-end gap-6 md:grid-cols-2">
          <SplitHeading text="All Curated" className="text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.06em]" />
          <Reveal delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-white/75">
              Unlock elite destinations, seamless client experiences, and premier supplier networks designed to elevate your agency and inspire your travelers.
            </p>
          </Reveal>
        </div>
      </div>

      <div ref={ref} className="relative mt-8">
        {destinations.map((d, i) => (
          <Card key={d.name} d={d} i={i} total={destinations.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
