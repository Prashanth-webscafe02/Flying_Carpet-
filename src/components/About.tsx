import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { stats } from '../content'
import { Eyebrow, Reveal, SplitHeading } from '../effects/motion'

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(Math.round(n)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const clip = useTransform(scrollYProgress, [0, 0.35], ['inset(18% 12% 18% 12% round 3rem)', 'inset(0% 0% 0% 0% round 2.5rem)'])

  return (
    <section id="about" ref={ref} className="relative px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div style={{ clipPath: clip }} className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
          <motion.img
            style={{ y: imgY, scale: 1.25 }}
            src="/images/global.jpg"
            alt="Lantern-lit lanes in a Moroccan medina at dusk"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* floating liquid orbs over the image */}
          <div className="blob absolute -left-10 top-10 size-40 bg-accent/40 blur-2xl" />
          <div className="blob absolute bottom-10 right-0 size-52 bg-violet-500/30 blur-3xl [animation-delay:-6s]" />
        </motion.div>

        <div className="glass-strong relative rounded-[2.5rem] p-7 md:p-12 lg:-ml-32">
          <Eyebrow>About us</Eyebrow>
          <SplitHeading
            text="Flying Carpet brings global distribution into one login"
            className="text-[clamp(2rem,4.2vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.05em]"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              We combine global procurement power with elite technology and live 24/7 backend support across North America, India, and Zambia—ensuring your agency stays moving, no matter the timezone.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.3 + i * 0.1} className="glass rounded-3xl p-5">
                <p className="text-gradient text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.06em]">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
