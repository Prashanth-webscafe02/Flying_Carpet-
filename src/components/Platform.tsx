import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { platform } from '../content'
import { Eyebrow, Reveal, SplitHeading, ease } from '../effects/motion'

// Liquid accordion: the hovered/tapped panel expands fluidly and the others compress.
export default function Platform() {
  const [active, setActive] = useState(0)

  return (
    <section id="products" className="relative px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow>The platform</Eyebrow></Reveal>
        <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <SplitHeading
            text="Flights, hotels, experiences, and transfers"
            className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.05em]"
          />
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-white/75">
              One catalogue for agents and travelers. Magic at the top — clarity in every booking detail.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-3 md:h-[560px] md:flex-row">
          {platform.map((p, i) => {
            const on = i === active
            return (
              <motion.button
                key={p.title}
                layout
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                transition={{ layout: { duration: 0.8, ease } }}
                className={`group relative overflow-hidden rounded-[2rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  on ? 'h-[420px] md:h-auto md:flex-[4]' : 'h-24 md:h-auto md:flex-[1]'
                }`}
              >
                <motion.img
                  layout
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${on ? 'scale-100' : 'scale-125 saturate-50'}`}
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${on ? 'bg-brand/10' : 'bg-brand/55'}`} />

                <span className="glass absolute left-4 top-4 z-[2] rounded-full px-3 py-1 text-xs font-bold">{p.n}</span>

                {!on && (
                  <span className="absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 whitespace-nowrap text-lg font-semibold [writing-mode:vertical-rl] rotate-180 md:block">
                    {p.title}
                  </span>
                )}
                {!on && <span className="absolute left-16 top-5 z-[2] text-lg font-semibold md:hidden">{p.title}</span>}

                <AnimatePresence>
                  {on && (
                    <motion.div
                      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                      transition={{ duration: 0.6, delay: 0.25, ease }}
                      className="glass-strong absolute inset-x-4 bottom-4 z-[2] rounded-3xl p-5 md:inset-x-6 md:bottom-6 md:max-w-md md:p-6"
                    >
                      <h3 className="text-3xl font-semibold tracking-[-0.04em]">{p.title}</h3>
                      <p className="mt-2 text-white/80">{p.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
