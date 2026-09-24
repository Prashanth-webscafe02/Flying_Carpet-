import { MapPin, Plane, Quote, Star } from 'lucide-react'
import { useState } from 'react'
import { testimonialStats, testimonials } from '../content'
import { Eyebrow, Reveal, SplitHeading } from '../effects/motion'

type T = (typeof testimonials)[number]

// Static staggered wall of testimonial cards; hovering (or tapping) a card reveals its review.
export default function Testimonials() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="testimonials" className="relative px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Reveal><Eyebrow>Testimonials</Eyebrow></Reveal>
            <SplitHeading
              text="Loved by agents, remembered by travellers"
              className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.05em]"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-white/75 md:ml-auto">
              Travel partners around the world use Flying Carpet to design journeys their clients never stop talking about. Hover a card to read their story.
            </p>
          </Reveal>
        </div>

        {/* CSS columns give a masonry layout (filled top-to-bottom); the tall/wide pattern gives each
            desktop column one of each, so the columns end level. */}
        <div className="mt-14 columns-1 gap-4 md:columns-2 md:gap-6 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.1} className="mb-4 break-inside-avoid md:mb-6">
              <Card
                t={t}
                tall={i % 4 === 0 || i % 4 === 3}
                open={open === t.name}
                onToggle={() => setOpen(open === t.name ? null : t.name)}
              />
            </Reveal>
          ))}
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

function Card({ t, tall, open, onToggle }: { t: T; tall: boolean; open: boolean; onToggle: () => void }) {
  return (
    <article
      tabIndex={0}
      onClick={onToggle}
      className={`group relative cursor-pointer overflow-hidden rounded-[2rem] ring-1 ring-white/15 outline-none focus-visible:ring-2 focus-visible:ring-accent ${tall ? 'aspect-[4/5]' : 'aspect-[5/4]'}`}
    >
      <img
        src={t.tripImg}
        alt=""
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/20 to-transparent" />

      <span className="glass absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold">
        <Plane className="size-3.5 text-accent" /> {t.trip}
      </span>

      {/* Resting state: who wrote it */}
      <div className={`absolute inset-x-0 bottom-0 p-5 transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-0 group-focus-visible:opacity-0 ${open ? 'translate-y-4 opacity-0' : ''}`}>
        <Stars rating={t.rating} />
        <div className="mt-3 flex items-center gap-3">
          <img src={t.avatar} alt="" className="size-11 shrink-0 rounded-full object-cover ring-2 ring-accent/70" />
          <div className="min-w-0">
            <p className="truncate font-semibold tracking-tight">{t.name}</p>
            <p className="truncate text-sm text-white/70">{t.role}</p>
          </div>
        </div>
      </div>

      {/* Revealed on hover / keyboard focus / tap: the review */}
      <div
        className={`glass-strong absolute inset-2 flex flex-col justify-between rounded-[1.6rem] p-5 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:p-6 ${open ? 'translate-y-0 opacity-100' : 'translate-y-[105%] opacity-0'}`}
      >
        <div className="min-h-0 overflow-y-auto">
          <Quote className="size-8 fill-accent text-accent" strokeWidth={0} />
          <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-white/90 md:text-base">“{t.quote}”</blockquote>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-white/15 pt-4">
          <img src={t.avatar} alt="" className="size-10 shrink-0 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate font-semibold tracking-tight">{t.name}</p>
            <p className="inline-flex items-center gap-1 truncate text-sm text-white/60"><MapPin className="size-3.5 shrink-0" /> {t.location}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? 'fill-accent text-accent' : 'text-white/30'}`} strokeWidth={1.5} />
      ))}
    </div>
  )
}
