import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Bus, Check, ChevronRight, Clock, Flag, Languages, Link2, MapPin, MessageCircle, Smartphone, Ticket, Users, X, type LucideIcon,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { LucidCorner } from '../effects/LucidLine'
import { Reveal, ease } from '../effects/motion'
import { RatesBar, RatesPanel, SectionTabs, SectionTitle } from './AgentRates'
import Gallery from './Gallery'
import { bigPhoto, countryName, whatsapp, type Destination } from './data'
import { details, images, type Experience } from './details'
import { defaultLanguages, defaultTicket, experienceImage, experienceInfo } from './experienceDetails'
import { linkTo, slug } from './navigate'

// An experience's own page, laid out like a tour booking page (Viator-style, without live prices or
// booking): gallery mosaic, section tabs and a sticky agent-rates panel (a bottom bar on phones)
// beside overview, what's included, what to expect, meeting and pickup, and good to know.
export default function ExperienceDetail({ d, experience: e }: { d: Destination; experience: Experience }) {
  const info = details[d.id]
  const index = info.experiences.indexOf(e)
  const content = experienceInfo[e.title]
  const country = countryName(d.country)
  const location = d.city === country ? country : `${d.city}, ${country}`
  const hero = experienceImage(d, e, index)
  const photos = [...new Set([hero, d.img, images.experiences, images.outdoors, images.wing])].map(bigPhoto)
  const [copied, setCopied] = useState(false)
  const enquire = whatsapp(`Hi! I'd like rates and availability for ${e.title} (${d.city}) for my clients.`)
  const back = `/destinations/${d.id}/experiences`
  const others = info.experiences.filter((x) => x !== e).slice(0, 3)
  const stops = content?.stops ?? []
  const highlights = stops.map(([name]) => name)
  const pickup = content?.included.some((i) => /pick-?up/i.test(i)) ?? false
  const ticket = content?.ticket ?? defaultTicket
  const languages = content?.languages ?? defaultLanguages
  const duration = /hour/i.test(e.duration) ? `${e.duration} (approx.)` : e.duration
  const overviewDetail = highlights.length
    ? `With a listed duration of ${e.duration.toLowerCase()}, the experience centres on ${new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(highlights)}. It gives your clients a dedicated part of their ${d.city} journey to enjoy these highlights, with time around the activity to shape the rest of their day.`
    : `With a listed duration of ${e.duration.toLowerCase()}, this experience adds a focused visit to ${e.place} to your clients’ time in ${d.city}. Build it into their itinerary alongside time to explore and unwind, choosing a pace that reflects their interests.`

  useEffect(() => { document.title = `${e.title} · ${d.city} — Flying Carpet` }, [e.title, d.city])

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Clock, label: 'Duration', value: duration },
    { icon: pickup ? Bus : MapPin, label: pickup ? 'Pickup' : 'Meeting point', value: pickup ? 'Hotel pickup included' : 'Meet on site' },
    { icon: Smartphone, label: 'Ticket', value: ticket },
    { icon: Languages, label: 'Offered in', value: languages },
  ]
  const sections = [
    { id: 'overview', label: 'Overview' },
    ...(content ? [{ id: 'included', label: 'What’s included' }] : []),
    ...(stops.length ? [{ id: 'expect', label: 'What to expect' }] : []),
    { id: 'meeting', label: 'Meeting & pickup' },
    { id: 'good-to-know', label: 'Good to know' },
  ]
  const meetAt = stops[0]?.[0] ?? e.place
  const mapQuery = encodeURIComponent(`${pickup ? e.place : meetAt}, ${d.city}, ${country}`)
  const goodToKnow = [
    'Confirmation is received with your booking',
    ticket,
    `Offered in ${languages}`,
    'Accessibility and suitability for young children confirmed on request',
    'Cancellation terms confirmed with your quote',
  ]

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: e.title, url })
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) }
    } catch { /* dismissed */ }
  }

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:pt-32 md:px-8 lg:pb-24">
        {/* Breadcrumb + share */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm text-white/60">
            <a href={back} onClick={linkTo(back)} className="-my-2 inline-flex shrink-0 items-center gap-2 py-2 font-medium text-white/75 transition-colors hover:text-white">
              <ArrowLeft className="size-4" /> <span className="sm:hidden">Experiences</span><span className="hidden sm:inline">Experiences in {d.city}</span>
            </a>
            <ChevronRight className="hidden size-3.5 shrink-0 text-white/35 sm:block" />
            <span className="hidden truncate sm:block">{e.title}</span>
          </nav>
          <button type="button" onClick={share} className="glass inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/15">
            <Link2 className="size-4" /> {copied ? 'Link copied' : 'Share'}
          </button>
        </div>

        {/* Title block */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          {e.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {e.tags.map((t, i) => (
                <span key={t} className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${i === 0 ? 'bg-accent font-bold' : 'bg-white/10 text-white/80'}`}>{t}</span>
              ))}
            </div>
          )}
          <h1 className="text-[clamp(2.1rem,4.6vw,3.9rem)] font-bold leading-[1.02] tracking-[-0.045em]">{e.title}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-white/70">
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-4 shrink-0 text-accent" /> {e.place}, {location}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="size-4 shrink-0 text-accent" /> {duration}</span>
          </p>
        </motion.div>

        <Gallery photos={photos} name={e.title} variant="mosaic" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
          <div className="min-w-0">
            <SectionTabs sections={sections} />

            {/* Overview */}
            <section id="overview" className="scroll-mt-24 pt-10">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {facts.map((f) => (
                  <li key={f.label} className="glass rounded-[1.25rem] p-4">
                    <f.icon className="size-5 text-accent" />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">{f.label}</p>
                    <p className="mt-0.5 font-semibold leading-snug tracking-tight">{f.value}</p>
                  </li>
                ))}
              </ul>

              <SectionTitle className="mt-10">Overview</SectionTitle>
              <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-white/80">
                <p>{content?.overview ?? `Discover ${e.title} in ${e.place}, ${d.city}, and make it part of a journey shaped around your clients’ interests.`}</p>
                <p>{overviewDetail}</p>
              </div>

              {highlights.length > 0 && (
                <>
                  <h3 className="mt-10 text-lg font-semibold tracking-tight">Highlights</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-[0.95rem] text-white/85">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10"><Flag className="size-4 text-accent" /></span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            {/* What's included */}
            {content && (
              <section id="included" className="scroll-mt-24 pt-14">
                <SectionTitle>What’s included</SectionTitle>
                <div className="glass mt-5 grid gap-6 rounded-[1.75rem] p-6 sm:grid-cols-2 md:p-8">
                  <IncludeList items={content.included} included />
                  <IncludeList items={content.excluded} />
                </div>
              </section>
            )}

            {/* What to expect: stops in journey order */}
            {stops.length > 0 && (
              <section id="expect" className="scroll-mt-24 pt-14">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <SectionTitle>What to expect</SectionTitle>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
                    <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5"><Clock aria-hidden="true" className="size-4 text-accent" />{e.duration} total</span>
                    <span>{stops.length} {stops.length === 1 ? 'stop' : 'stops'}</span>
                  </div>
                </div>
                <ol className="mt-6">
                  <Marker icon={pickup ? Bus : MapPin} label={pickup ? 'Pickup from your client’s hotel' : `Meet at ${meetAt}`} />
                  {stops.map(([name, text], i) => <Stop key={name} n={i + 1} name={name} text={text} />)}
                  <Marker icon={Flag} label={pickup ? 'Drop-off back at the hotel' : 'The experience ends here'} last />
                </ol>
              </section>
            )}

            {/* Meeting and pickup */}
            <section id="meeting" className="scroll-mt-24 pt-14">
              <SectionTitle>Meeting &amp; pickup</SectionTitle>
              <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                <div className="glass space-y-5 rounded-[1.75rem] p-5">
                  <Point icon={pickup ? Bus : MapPin} title={pickup ? 'Hotel pickup' : 'Meeting point'}>
                    {pickup ? `Pickup from hotels in ${d.city} is included. The pickup time is confirmed with your booking.` : `${meetAt}, ${d.city}. The exact meeting time is confirmed with your booking.`}
                  </Point>
                  <Point icon={Flag} title="End point">{pickup ? 'Returns to the pickup point.' : `Ends at ${stops.at(-1)?.[0] ?? e.place}.`}</Point>
                  <Point icon={Users} title="Group size">Private and group options confirmed with your quote.</Point>
                </div>
                <div className="relative h-72 overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 md:h-full md:min-h-72">
                  <iframe
                    title={`Map of ${e.place}`}
                    src={`https://maps.google.com/maps?q=${mapQuery}&z=13&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full [filter:invert(90%)_hue-rotate(180deg)_saturate(0.7)_brightness(0.95)]"
                  />
                </div>
              </div>
            </section>

            {/* Good to know */}
            <section id="good-to-know" className="scroll-mt-24 pt-14">
              <SectionTitle>Good to know</SectionTitle>
              <ul className="glass mt-5 grid gap-x-8 gap-y-3 rounded-[1.75rem] p-6 sm:grid-cols-2 md:p-8">
                {goodToKnow.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[0.95rem] text-white/80"><Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} /> {t}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Agent rates panel (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <RatesPanel
                intro="Tell us your client’s dates and group size, and our specialists will come back with rates and availability."
                points={['Special agent rates', 'Dates and availability confirmed for your clients', 'Add hotels, transfers and flights']}
                kind="experience"
                request={`rates and availability for ${e.title} (${d.city})`}
                footer={<>
                  <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5 text-accent" /> {e.duration}</span>
                  <span className="inline-flex items-center gap-1.5"><Ticket className="size-3.5 text-accent" /> Experience</span>
                </>}
              />
            </div>
          </aside>
        </div>

        {/* Enquiry banner */}
        <Reveal className="relative mt-20 overflow-hidden rounded-[2rem] ring-1 ring-white/15">
          <img src={photos[1] ?? photos[0]} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/85 to-brand/40" />
          <LucidCorner className="absolute bottom-0 left-0" />
          <div className="relative flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Special agent rates</p>
              <h2 className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.04em]">Add {e.title} to your client’s trip</h2>
              <p className="mt-2 text-white/75">Our specialists will confirm dates, availability and rates, and can combine it with flights, hotels, transfers and car rentals.</p>
            </div>
            <a href={enquire} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-cream py-1.5 pl-5 pr-1.5 font-bold tracking-tight text-ink shadow-[0_10px_40px_-8px_rgb(232_101_37/0.7)] transition-transform duration-500 hover:scale-[1.04] md:self-auto">
              Chat on WhatsApp
              <span className="grid size-8 place-items-center rounded-full bg-accent text-white"><MessageCircle className="size-4" /></span>
            </a>
          </div>
        </Reveal>

        {/* Similar experiences */}
        {others.length > 0 && (
          <section className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <SectionTitle>More experiences in {d.city}</SectionTitle>
              <a href={back} onClick={linkTo(back)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">View all <ArrowRight className="size-4" /></a>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((x) => {
                const url = `/destinations/${d.id}/experiences/${slug(x.title)}`
                return (
                  <a key={x.title} href={url} onClick={linkTo(url)} className="group glass-solid flex flex-col overflow-hidden rounded-[1.5rem] ring-white/25 transition-shadow hover:ring-1">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={experienceImage(d, x, info.experiences.indexOf(x))} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                      {x.tags[0] && <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em]">{x.tags[0]}</span>}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-lg font-semibold tracking-tight">{x.title}</span>
                      <span className="mt-0.5 text-sm text-white/55">{x.place} · {x.duration}</span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        View experience <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        )}
      </div>

      <RatesBar name={e.title} enquire={enquire} />
    </main>
  )
}

function IncludeList({ items, included = false }: { items: string[]; included?: boolean }) {
  return (
    <div>
      <p className="font-semibold tracking-tight">{included ? 'Included' : 'Not included'}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-white/80">
            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${included ? 'bg-emerald-400/20 text-emerald-300' : 'bg-rose-400/15 text-rose-300'}`}>
              {included ? <Check className="size-3.5" strokeWidth={2.5} /> : <X className="size-3.5" strokeWidth={2.5} />}
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Point({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10"><Icon className="size-4 text-accent" /></span>
      <div className="min-w-0 text-sm text-white/70">
        <p className="mb-0.5 font-semibold text-white">{title}</p>
        {children}
      </div>
    </div>
  )
}

// Start / end of the "What to expect" timeline.
function Marker({ icon: Icon, label, last = false }: { icon: LucideIcon; label: string; last?: boolean }) {
  return (
    <li className={`group relative flex items-center gap-4 sm:gap-5 ${last ? '' : 'pb-5'}`}>
      <div aria-hidden="true" className="relative flex w-10 shrink-0 justify-center self-stretch sm:w-12">
        {!last && <span className="absolute bottom-0 left-1/2 top-10 w-px bg-gradient-to-b from-accent/50 to-white/15 sm:top-12" />}
        <span className="relative grid size-10 place-items-center rounded-full bg-accent text-white sm:size-12"><Icon className="size-4.5" /></span>
      </div>
      <p className="font-semibold tracking-tight text-white/90">{label}</p>
    </li>
  )
}

function Stop({ n, name, text }: { n: number; name: string; text: string }) {
  return (
    <li className="relative flex gap-4 pb-5 sm:gap-5">
      <div aria-hidden="true" className="relative flex w-10 shrink-0 justify-center sm:w-12">
        <span className="absolute bottom-0 left-1/2 top-10 w-px bg-gradient-to-b from-accent/50 to-white/15 sm:top-12" />
        <span className="relative grid size-10 place-items-center rounded-full border border-accent/40 bg-brand text-sm font-bold tabular-nums text-accent sm:size-12">
          {String(n).padStart(2, '0')}
        </span>
      </div>
      <div className="glass min-w-0 flex-1 rounded-[1.25rem] p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight">{name}</h3>
        <p className="mt-2 leading-relaxed text-white/75">{text}</p>
      </div>
    </li>
  )
}
