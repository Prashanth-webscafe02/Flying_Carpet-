import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Clock, Languages, Link2, MapPin, MessageCircle, Smartphone, X, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { LucidCorner } from '../effects/LucidLine'
import { ease } from '../effects/motion'
import ChatFab from './ChatFab'
import Gallery from './Gallery'
import { bigPhoto, countryName, whatsapp, type Destination } from './data'
import { details, images, type Experience } from './details'
import { defaultLanguages, defaultTicket, experienceImage, experienceInfo } from './experienceDetails'
import { linkTo, slug } from './navigate'

// An experience's own page (the reference site's experience detail, minus price, availability,
// additional info, cancellation policy, confirmation note and pre-booking guidelines):
// title, location, gallery, key info strip, overview, included / excluded, itinerary.
export default function ExperienceDetail({ d, experience: e }: { d: Destination; experience: Experience }) {
  const info = details[d.id]
  const index = info.experiences.indexOf(e)
  const content = experienceInfo[e.title]
  const country = countryName(d.country)
  const location = d.city === country ? country : `${d.city} – ${country}`
  const hero = experienceImage(d, e, index)
  const photos = [...new Set([hero, d.img, images.experiences, images.outdoors, images.wing])].map(bigPhoto)
  const [copied, setCopied] = useState(false)
  const enquire = whatsapp(`Hi! I'd like rates and availability for ${e.title} (${d.city}) for my clients.`)
  const back = `/destinations/${d.id}/experiences`
  const others = info.experiences.filter((x) => x !== e).slice(0, 3)
  const highlights = content?.stops.map(([name]) => name) ?? []
  const overviewDetail = highlights.length
    ? `With a listed duration of ${e.duration.toLowerCase()}, the experience centres on ${new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(highlights)}. It gives your clients a dedicated part of their ${d.city} journey to enjoy these highlights, with time around the activity to shape the rest of their day. Explore the itinerary below for a closer look at each stop and what the visit involves.`
    : `With a listed duration of ${e.duration.toLowerCase()}, this experience adds a focused visit to ${e.place} to your clients’ time in ${d.city}. Build it into their itinerary alongside time to explore and unwind, choosing a pace that reflects their interests. Our team can help you understand the available options and how the activity fits into their wider journey.`

  useEffect(() => { document.title = `${e.title} · ${d.city} — Flying Carpet` }, [e.title, d.city])

  const keyInfo: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Clock, label: 'Duration', value: /hour/i.test(e.duration) ? `${e.duration} (approx.)` : e.duration },
    { icon: Smartphone, label: 'Ticket accepted', value: content?.ticket ?? defaultTicket },
    { icon: Languages, label: 'Languages offered', value: content?.languages ?? defaultLanguages },
  ]

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: e.title, url })
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) }
    } catch { /* dismissed */ }
  }

  return (
    <>
      <main className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:pt-32 md:px-8">
          {/* Back + actions */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <a href={back} onClick={linkTo(back)} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white">
              <ArrowLeft className="size-4" /> Experiences in {d.city}
            </a>
            <div className="flex items-center gap-2">
              <button type="button" onClick={share} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/15">
                <Link2 className="size-4" /> {copied ? 'Link copied' : 'Share'}
              </button>
              <a href={enquire} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-bold text-ink transition-transform duration-300 hover:scale-[1.03]">
                <MessageCircle className="size-4 text-accent" /> Enquire
              </a>
            </div>
          </div>

          {/* 1–2. Experience title, city and country underneath */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <h1 className="text-[clamp(2rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em]">{e.title}</h1>
            <p className="mt-2 inline-flex items-center gap-1.5 text-white/70">
              <MapPin className="size-4 shrink-0 text-accent" /> {location}
            </p>
          </motion.div>

          {/* 3. Gallery: hero + two thumbnails + "All photos" */}
          <Gallery photos={photos} name={e.title} />

          <div className="mt-6 max-w-4xl space-y-12">
            {/* 4. Key info: duration, ticket type, languages */}
            <ul className="glass grid gap-4 rounded-[1.5rem] p-5 sm:grid-cols-3">
              {keyInfo.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-accent ring-1 ring-white/15">
                    <Icon className="size-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className="block text-sm text-white/65">{value}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* 5. Overview */}
            <section id="overview">
              <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">Overview</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-white/80">
                <p>{content?.overview ?? `Discover ${e.title} in ${e.place}, ${d.city}, and make it part of a journey shaped around your clients’ interests.`}</p>
                <p>{overviewDetail}</p>
              </div>
            </section>

            {/* 6. Included / Excluded */}
            {content && (
              <section id="included">
                <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">Included / Excluded</h2>
                <div className="glass mt-5 grid gap-6 rounded-[1.5rem] p-6 sm:grid-cols-2">
                  <IncludeList items={content.included} included />
                  <IncludeList items={content.excluded} />
                </div>
              </section>
            )}

            {/* 7. Itinerary: visible stops in journey order */}
            {content && content.stops.length > 0 && (
              <section id="itinerary" aria-labelledby="itinerary-heading">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 id="itinerary-heading" className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">Itinerary</h2>
                    <p className="mt-2 text-white/65">A closer look at what you will experience along the way.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
                    <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5"><Clock aria-hidden="true" className="size-4 text-accent" />{e.duration} total</span>
                    <span>{content.stops.length} {content.stops.length === 1 ? 'stop' : 'stops'}</span>
                  </div>
                </div>
                <ol className="mt-6">
                  {content.stops.map(([name, text], i) => <Stop key={name} n={i + 1} name={name} text={text} />)}
                </ol>
              </section>
            )}
          </div>

          {/* Enquiry prompt */}
          <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1d1a63] to-brand p-8 ring-1 ring-white/15 md:p-10">
            <LucidCorner className="absolute bottom-0 left-0" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Special agent rates</p>
                <h2 className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.04em]">Add {e.title} to your client’s trip</h2>
                <p className="mt-2 text-white/70">Our specialists will confirm dates, availability and rates, and can combine it with flights, hotels, transfers and car rentals.</p>
              </div>
              <a href={enquire} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-cream py-1.5 pl-5 pr-1.5 font-bold tracking-tight text-ink shadow-[0_10px_40px_-8px_rgb(232_101_37/0.7)] transition-transform duration-500 hover:scale-[1.04] md:self-auto">
                Chat on WhatsApp
                <span className="grid size-8 place-items-center rounded-full bg-accent text-white"><MessageCircle className="size-4" /></span>
              </a>
            </div>
          </div>

          {/* More experiences */}
          {others.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-semibold tracking-tight">More experiences in {d.city}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((x) => {
                  const url = `/destinations/${d.id}/experiences/${slug(x.title)}`
                  return (
                    <a key={x.title} href={url} onClick={linkTo(url)} className="group glass-solid flex items-center gap-4 overflow-hidden rounded-[1.25rem] p-3 pr-4">
                      <img src={experienceImage(d, x, info.experiences.indexOf(x))} alt="" loading="lazy" decoding="async" className="size-20 shrink-0 rounded-xl object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold tracking-tight">{x.title}</span>
                        <span className="block truncate text-sm text-white/55">{x.place} · {x.duration}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <ChatFab text={`Hi! I have a question about ${e.title} in ${d.city}.`} />
    </>
  )
}

function IncludeList({ items, included = false }: { items: string[]; included?: boolean }) {
  return (
    <div>
      <p className="font-semibold tracking-tight">{included ? 'Included' : 'Excluded'}</p>
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

function Stop({ n, name, text }: { n: number; name: string; text: string }) {
  return (
    <li className="group relative flex gap-4 pb-5 last:pb-0 sm:gap-5">
      <div aria-hidden="true" className="relative flex w-10 shrink-0 justify-center sm:w-12">
        <span className="absolute bottom-0 left-1/2 top-10 w-px bg-gradient-to-b from-accent/50 to-white/15 group-last:hidden sm:top-12" />
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
