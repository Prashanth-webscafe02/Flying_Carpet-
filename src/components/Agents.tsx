import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { agentsImg } from '../content'
import { Eyebrow, PillButton, Reveal, SplitHeading } from '../effects/motion'

const regions = ['India', 'South Africa', 'North America', 'Flights', 'Hotels', 'Experiences', 'Transfers']

export default function Agents() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const radius = useTransform(scrollYProgress, [0, 0.4], ['6rem', '2.5rem'])
  const inset = useTransform(scrollYProgress, [0, 0.4], ['6%', '0%'])

  return (
    <section id="partners" ref={ref} className="relative px-4 py-16 md:px-8">
      <motion.div style={{ borderRadius: radius, marginInline: inset }} className="relative mx-auto max-w-7xl overflow-hidden">
        <motion.img
          style={{ y, scale: 1.3 }}
          src={agentsImg}
          alt="Open road through uncrowded high country at dusk"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/60 via-brand/20 to-accent/30" />

        <div className="relative grid min-h-[640px] items-center p-4 md:p-12">
          <div className="glass-strong max-w-2xl rounded-[2.5rem] p-7 md:p-12">
            <Eyebrow>For agents</Eyebrow>
            <SplitHeading
              text="Where agents access more value"
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 text-lg leading-relaxed text-white/80">
                Flying Carpet Travel is a destination-led catalogue — flights, hotels, experiences, and transfers — built so travel agents can educate, show, and convert with confidence. Your flying carpet is ready.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-8">
              <PillButton href="#contact">Become a partner</PillButton>
            </Reveal>
          </div>
        </div>

        {/* Glass marquee ribbon */}
        <div className="glass relative overflow-hidden border-x-0 py-4">
          <div className="marquee flex w-max gap-10 whitespace-nowrap text-xl font-semibold tracking-tight">
            {[...regions, ...regions, ...regions, ...regions].map((r, i) => (
              <span key={i} className="flex items-center gap-10">
                {r} <span className="text-accent">✳</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
