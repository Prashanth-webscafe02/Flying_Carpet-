import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { categories } from '../categories'
import { platformImages } from '../content'
import type { ProductId } from '../destinations/data'
import { Eyebrow, Reveal, SplitHeading, ease } from '../effects/motion'
import { LucidWave } from '../effects/LucidLine'
import { OPEN_EVENT } from './platformEvents'

// How many points each panel shows before "See all features" (H7).
const FIRST_POINTS = 3

// Liquid accordion: the hovered/tapped panel expands fluidly and the others compress.
// Each panel carries the client's category description (Appendix C) word for word.
export default function Platform() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const open = (i: number) => {
    if (i !== active) setExpanded(false)
    setActive(i)
  }

  useEffect(() => {
    const onOpen = (e: Event) => {
      const i = categories.findIndex((c) => c.id === (e as CustomEvent<ProductId>).detail)
      if (i >= 0) {
        setActive(i)
        setExpanded(false)
      }
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  return (
    <section id="products" className="relative px-4 py-28 md:px-8 md:py-40">
      {/* Lucid Line in the gap after the destination cards, above the eyebrow */}
      <LucidWave shape="swell" mirror className="absolute inset-x-0 -top-10 -z-1 h-38 md:h-50" />
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow>The platform</Eyebrow></Reveal>
        <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <SplitHeading
            text="Flights, hotels, experiences, transfers and car rentals"
            className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-tighter"
          />
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-white/75">
              Five categories on one login, each with clear prices and terms, so you can answer your client fast, even at the last minute.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-3 md:h-140 md:flex-row">
          {categories.map((c, i) => {
            const on = i === active
            const points = on && expanded ? c.points : c.points.slice(0, FIRST_POINTS)
            const more = c.points.length > FIRST_POINTS || !!c.note
            return (
              <motion.div
                key={c.id}
                layout
                role="button"
                tabIndex={0}
                aria-expanded={on}
                onPointerEnter={(e) => e.pointerType === 'mouse' && open(i)}
                onFocus={() => open(i)}
                onClick={() => open(i)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open(i)}
                transition={{ layout: { duration: 0.8, ease } }}
                className={`group relative cursor-pointer overflow-hidden rounded-4xl text-left outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  on ? 'min-h-105 md:h-auto md:min-h-0 md:flex-4' : 'h-24 md:h-auto md:flex-1'
                }`}
              >
                <motion.img
                  layout
                  src={platformImages[c.id]}
                  alt={c.title}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${on ? 'scale-100' : 'scale-125 saturate-50'}`}
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${on ? 'bg-brand/10' : 'bg-brand/55'}`} />

                <span className="glass absolute left-4 top-4 z-2 rounded-full px-3 py-1 text-xs font-bold">0{i + 1}</span>

                {!on && (
                  <span className="absolute bottom-6 left-1/2 z-2 hidden -translate-x-1/2 whitespace-nowrap text-lg font-semibold [writing-mode:vertical-rl] rotate-180 md:block">
                    {c.title}
                  </span>
                )}
                {!on && <span className="absolute left-16 top-5 z-2 text-lg font-semibold md:hidden">{c.title}</span>}

                <AnimatePresence>
                  {on && (
                    <motion.div
                      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
                      exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                      transition={{ duration: 0.6, delay: 0.25, ease }}
                      className="glass-strong relative z-2 mx-4 mb-4 mt-16 max-h-[calc(100%-5rem)] overflow-y-auto rounded-3xl p-5 md:absolute md:inset-x-6 md:bottom-6 md:m-0 md:max-w-lg md:p-6"
                    >
                      <h3 className="text-3xl font-semibold tracking-[-0.04em]">{c.title}</h3>
                      <p className="mt-2 text-white/85">{c.intro}</p>
                      <ul className="mt-4 space-y-2.5">
                        {points.map((p) => (
                          <li key={p.title} className="text-[0.95rem] leading-snug text-white/75">
                            <span className="font-semibold text-white">{p.title}:</span> {p.text}
                          </li>
                        ))}
                      </ul>
                      {expanded && c.note && <p className="mt-3 text-sm text-white/60">{c.note}</p>}
                      {more && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpanded((x) => !x)
                          }}
                          className="mt-4 text-sm font-semibold text-accent transition-colors hover:text-white"
                        >
                          {expanded ? 'Show fewer' : 'See all features'}
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
