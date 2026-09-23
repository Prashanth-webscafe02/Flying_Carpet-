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

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center px-4 md:px-8" style={{ paddingTop: `calc(5.5rem + ${i * 14}px)` }}>
      <motion.article
        style={{ scale }}
        className="glass-strong relative grid w-full max-w-6xl origin-top overflow-hidden rounded-[2.5rem] md:grid-cols-2"
      >
        <div className="relative z-[1] flex flex-col justify-between gap-6 p-7 md:p-12">
          <div>
            <p className="mb-3 text-sm font-semibold text-accent">0{i + 1} / 0{total}</p>
            <h3 className="text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.06em]">{d.name}</h3>
            <p className="mt-5 line-clamp-5 text-[0.95rem] leading-relaxed text-white/75 md:line-clamp-none md:text-base">{d.text}</p>
          </div>
          <div><PillButton href="#journeys">Get Agency Access</PillButton></div>
        </div>
        <div className="relative h-56 overflow-hidden md:h-auto md:min-h-[520px]">
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
