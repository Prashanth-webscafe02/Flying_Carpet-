import { motion } from 'framer-motion'
import { hosts } from '../content'
import { Eyebrow, Reveal, SplitHeading, Tilt, ease } from '../effects/motion'

export default function Hosts() {
  return (
    <section id="guides" className="relative px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><Eyebrow>Local hosts</Eyebrow></Reveal>
          <SplitHeading
            text="The faces behind the hidden path"
            className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.05em]"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Trusted local hosts who know the quieter trail, the family kitchen, and the cove that never appears on the obvious map.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {hosts.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, delay: i * 0.1, ease }}
              className={i % 2 ? 'lg:mt-16' : ''}
            >
              <Tilt className="rounded-[2rem]" max={12}>
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-[2rem]">
                  <img src={h.img} alt={`${h.name}, ${h.role}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                  <figcaption className="glass-strong absolute inset-x-3 bottom-3 rounded-2xl px-4 py-3 transition-transform duration-500 group-hover:-translate-y-1">
                    <p className="font-semibold tracking-tight">{h.name}</p>
                    <p className="text-sm text-white/70">{h.role}</p>
                  </figcaption>
                </figure>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
