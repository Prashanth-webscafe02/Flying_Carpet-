import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronDown, MapPin, Plane, Quote, Star } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { testimonialStats, testimonials } from '../content'
import { Eyebrow, Reveal, SplitHeading, ease } from '../effects/motion'

const AUTOPLAY_MS = 7000

// Customer testimonial carousel: destination photo + review, with swipe, arrows and avatar tabs.
export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const paused = hovered || expanded
  const t = testimonials[index]
  // Collapsed view shows the opening sentence; "Read more" reveals the rest.
  const [lead, rest] = splitQuote(t.quote)

  const go = (next: number, d = next > index ? 1 : -1) => {
    setExpanded(false)
    setState([(next + testimonials.length) % testimonials.length, d])
  }
  const step = (d: number) => go(index + d, d)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => step(1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  })

  return (
    <section id="testimonials" className="relative px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Reveal><Eyebrow>Testimonials</Eyebrow></Reveal>
            <SplitHeading
              text="Loved by agents, remembered by travellers"
              className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.05em]"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                Travel partners around the world use Flying Carpet to design journeys their clients never stop talking about.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="hidden gap-3 md:flex">
            <NavButton label="Previous testimonial" onClick={() => step(-1)}><ArrowLeft className="size-5" /></NavButton>
            <NavButton label="Next testimonial" onClick={() => step(1)}><ArrowRight className="size-5" /></NavButton>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div
            className="glass-strong relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
          >
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.article
                key={t.name}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 80 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -80 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) step(1)
                  else if (info.offset.x > 60) step(-1)
                }}
                className="grid cursor-grab touch-pan-y active:cursor-grabbing md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${testimonials.length}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[520px]">
                  <motion.img
                    src={t.tripImg}
                    alt={`${t.trip} trip`}
                    draggable={false}
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/10 to-transparent" />
                  <span className="glass absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold">
                    <Plane className="size-3.5 text-accent" /> Trip to {t.trip}
                  </span>
                  <p className="absolute bottom-3 left-5 text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.06em] text-white/90">
                    {t.trip}
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-8 p-6 md:gap-10 md:p-12 lg:p-14">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} className={`size-5 ${i < t.rating ? 'fill-accent text-accent' : 'text-white/30'}`} strokeWidth={1.5} />
                        ))}
                      </div>
                      <Quote className="size-10 fill-white/15 text-white/15 md:size-14" strokeWidth={0} />
                    </div>
                    <blockquote className="mt-6 text-[clamp(1.1rem,2vw,1.6rem)] font-medium leading-snug tracking-[-0.02em] text-white/90">
                      <p>“{lead}{rest && !expanded ? '…' : '”'}</p>
                      <AnimatePresence initial={false}>
                        {rest && expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, filter: 'blur(8px)' }}
                            animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                            exit={{ height: 0, opacity: 0, filter: 'blur(8px)' }}
                            transition={{ duration: 0.6, ease }}
                            className="overflow-hidden"
                          >
                            <p className="pt-3 text-white/75">{rest}”</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </blockquote>
                    {rest && (
                      <button
                        onClick={() => setExpanded((e) => !e)}
                        aria-expanded={expanded}
                        className="group mt-5 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-accent transition-colors hover:text-orange-300"
                      >
                        {expanded ? 'Show less' : 'Read more'}
                        <ChevronDown className={`size-4 transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/15 pt-6">
                    <img src={t.avatar} alt="" draggable={false} className="size-14 shrink-0 rounded-full object-cover ring-2 ring-accent/70" />
                    <div className="min-w-0">
                      <p className="text-lg font-semibold tracking-tight md:text-xl">{t.name}</p>
                      <p className="text-white/70">{t.role}</p>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-white/55">
                        <MapPin className="size-3.5" /> {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Avatar tabs double as pagination; the bar under the active one tracks autoplay. */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex gap-2 sm:gap-3" role="tablist" aria-label="Choose a testimonial">
            {testimonials.map((x, i) => (
              <button
                key={x.name}
                role="tab"
                aria-selected={i === index}
                aria-label={x.name}
                onClick={() => go(i)}
                className={`glass relative flex items-center gap-2 overflow-hidden rounded-full p-1 transition-all duration-500 ${i === index ? 'ring-2 ring-accent sm:pr-4' : 'opacity-60 hover:opacity-100'}`}
              >
                <img src={x.avatar} alt="" className="size-9 rounded-full object-cover sm:size-10" />
                {i === index && (
                  <>
                    <span className="hidden whitespace-nowrap text-sm font-semibold sm:inline">{x.name.split(' ')[0]}</span>
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  </>
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-2 md:hidden">
            <NavButton label="Previous testimonial" onClick={() => step(-1)}><ArrowLeft className="size-4" /></NavButton>
            <NavButton label="Next testimonial" onClick={() => step(1)}><ArrowRight className="size-4" /></NavButton>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3 md:gap-6">
          {testimonialStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="glass rounded-[1.75rem] px-6 py-6 md:px-8 md:py-8">
              <p className="text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.05em]">
                {s.value}<span className="text-accent">{s.suffix}</span>
              </p>
              <p className="mt-2 text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function splitQuote(quote: string): [string, string] {
  const m = quote.match(/^.+?[.!?](?=\s)/)
  return m ? [m[0], quote.slice(m[0].length).trim()] : [quote, '']
}

function NavButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="glass grid size-11 place-items-center rounded-full transition-all duration-300 hover:scale-105 hover:bg-accent md:size-14"
    >
      {children}
    </button>
  )
}
