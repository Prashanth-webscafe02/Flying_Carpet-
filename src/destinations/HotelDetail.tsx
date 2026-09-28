import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Baby, Briefcase, Building2, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, ConciergeBell, Dumbbell, Eye, Images, Landmark,
  Link2, MapPin, MessageCircle, Mountain, Sparkles, Star, TrainFront, Umbrella, Users, UtensilsCrossed, Waves, Wifi, X, type LucideIcon,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { LucidCorner } from '../effects/LucidLine'
import { ease } from '../effects/motion'
import ChatFab from './ChatFab'
import { whatsapp, type Destination } from './data'
import { categoryLabel, details, hotelImages, images, type Hotel } from './details'
import { linkTo, slug } from './navigate'
import { isOpen } from './tabs'

const countryNames: Record<string, string> = { UAE: 'United Arab Emirates', USA: 'United States' }
const big = (src: string) => src.replace(/w=\d+/, 'w=1600')

// Facility → icon for the key info strip.
const facilityIcon = (label: string): LucideIcon => {
  const l = label.toLowerCase()
  const rules: [RegExp, LucideIcon][] = [
    [/pool|water|diving|snorkel|surf/, Waves], [/spa|yoga|hammam|wellness/, Sparkles], [/wi-?fi/, Wifi], [/beach/, Umbrella],
    [/dining|restaurant|breakfast|tea|bar|inclusive/, UtensilsCrossed], [/kids|family/, Baby], [/gym|fitness/, Dumbbell], [/business/, Briefcase],
    [/view/, Eye], [/heritage|palace/, Landmark], [/butler|riad/, ConciergeBell], [/metro|skytrain|shuttle/, TrainFront], [/rooftop|design|art/, Building2],
    [/garden|desert|ski|nature|mountain/, Mountain], [/group/, Users], [/reception|central/, Clock],
  ]
  return rules.find(([re]) => re.test(l))?.[1] ?? Check
}

const categoryBlurb: Record<Hotel['category'], string> = {
  luxury: 'A top choice for high-value travellers, honeymooners and special occasions.',
  upscale: 'Great for families, couples and business travellers who want quality and comfort.',
  midscale: 'A reliable, great-value choice that suits a wide range of travellers.',
  boutique: 'A one-of-a-kind stay with character, ideal for clients who want something different.',
  budget: 'A smart, comfortable option for value-conscious travellers, groups and longer stays.',
}

// A hotel's own page (the reference site's hotel detail, minus prices and booking):
// title, location, gallery, facility strip, overview, what's included, and nearby highlights.
export default function HotelDetail({ d, hotel }: { d: Destination; hotel: Hotel }) {
  const info = details[d.id]
  const index = info.hotels.indexOf(hotel)
  const country = countryNames[d.country] ?? d.country
  const place = d.city === country ? `${hotel.area} – ${country}` : `${hotel.area}, ${d.city} – ${country}`
  const photos = [...hotelImages.slice(index % hotelImages.length), ...hotelImages.slice(0, index % hotelImages.length), images.hotels, d.img].map(big)
  const [viewer, setViewer] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const enquire = whatsapp(`Hi! I'd like rates and availability for ${hotel.name} (${d.city}) for my clients.`)
  const back = `/destinations/${d.id}/hotels`

  useEffect(() => { document.title = `${hotel.name} · ${d.city} — Flying Carpet` }, [hotel.name, d.city])

  const facilities = [...hotel.amenities, ...['Free Wi-Fi', '24-hour reception'].filter((f) => !hotel.amenities.some((a) => a.toLowerCase().includes(f.split(' ').pop()!.toLowerCase())))].slice(0, 6)
  const overview = `${hotel.text} Set in ${hotel.area === d.city ? d.city : `${hotel.area}, ${d.city}`}, it makes an easy base for ${info.experiences.slice(0, 2).map((e) => e.title).join(' and ')}. ${categoryBlurb[hotel.category]}`
  const included = ['Accommodation for the selected nights', 'Room taxes and service charges, as quoted', ...hotel.amenities.slice(0, 2).map((a) => `Access to ${a.toLowerCase()}`)]
  const excluded = ['Flights to ' + d.city, 'Airport transfers (can be added)', 'Local city or tourism tax, if payable at the hotel', 'Personal expenses and extras']
  const others = info.hotels.filter((h) => h !== hotel).slice(0, 3)

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: hotel.name, url })
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
              <ArrowLeft className="size-4" /> Hotels in {d.city}
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

          {/* 1–2. Title and location */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="text-[clamp(2rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em]">{hotel.name}</h1>
              <span className="flex gap-0.5" aria-label={`${hotel.stars} star hotel`}>
                {Array.from({ length: hotel.stars }, (_, i) => <Star key={i} className="size-4.5 fill-accent text-accent" />)}
              </span>
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 text-white/70">
              <MapPin className="size-4 text-accent" /> {place}
              <span className="ml-2 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80">{categoryLabel[hotel.category]}</span>
            </p>
          </motion.div>

          {/* 3. Gallery: hero + two thumbnails + "All photos" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mt-6 grid h-[clamp(16rem,48vw,32rem)] gap-3 md:grid-cols-[2fr_1fr] md:grid-rows-2"
          >
            <GalleryTile src={photos[0]} alt={hotel.name} onClick={() => setViewer(0)} className="md:row-span-2" eager>
              <AllPhotos count={photos.length} onClick={() => setViewer(0)} className="md:hidden" />
            </GalleryTile>
            <GalleryTile src={photos[1]} alt="" onClick={() => setViewer(1)} className="hidden md:block" />
            <GalleryTile src={photos[2]} alt="" onClick={() => setViewer(2)} className="hidden md:block">
              <AllPhotos count={photos.length} onClick={() => setViewer(0)} />
            </GalleryTile>
          </motion.div>

          {/* 4. Key info strip */}
          <ul className="glass mt-4 flex flex-wrap gap-x-6 gap-y-3 rounded-[1.5rem] px-5 py-4">
            {facilities.map((f) => {
              const Icon = facilityIcon(f)
              return (
                <li key={f} className="inline-flex items-center gap-2 text-sm font-medium text-white/85">
                  <Icon className="size-4 text-accent" /> {f}
                </li>
              )
            })}
          </ul>

          {/* Jump to section */}
          <nav aria-label="Jump to section" className="mt-10 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[['overview', 'Overview'], ['included', 'What’s included'], ['nearby', 'Nearby highlights']].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="glass shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/15 hover:text-white">{label}</a>
            ))}
          </nav>

          {/* 5. Overview */}
          <section id="overview" className="mt-8 grid scroll-mt-28 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div>
              <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">Overview</h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">{overview}</p>
            </div>
            <dl className="glass h-fit rounded-[1.5rem] p-5 text-sm">
              {[
                ['Category', categoryLabel[hotel.category]],
                ['Star rating', `${hotel.stars} star`],
                ['Area', hotel.area],
                ['Nearest airport', `${info.airport} · ${info.airportName}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-white/10 py-2.5 last:border-0">
                  <dt className="text-white/55">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* 6. Included / Excluded */}
          <section id="included" className="mt-14 scroll-mt-28">
            <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">What’s included</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <List title="Included" items={included} icon={Check} tone="in" />
              <List title="Not included" items={excluded} icon={X} tone="out" />
            </div>
            <p className="mt-3 text-sm text-white/50">Final inclusions are confirmed with your quote.</p>
          </section>

          {/* 7. Nearby highlights (numbered, expandable) */}
          <section id="nearby" className="mt-14 scroll-mt-28">
            <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">Nearby highlights</h2>
            <p className="mt-1 text-white/60">Experiences your clients can add to their stay.</p>
            <ol className="mt-5 space-y-3">
              {info.experiences.map((e, i) => <Stop key={e.title} n={i + 1} title={e.title} place={e.place} duration={e.duration} tags={e.tags} href={`/destinations/${d.id}/experiences`} defaultOpen={i === 0} />)}
            </ol>
          </section>

          {/* Enquiry prompt */}
          <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1d1a63] to-brand p-8 ring-1 ring-white/15 md:p-10">
            <LucidCorner className="absolute bottom-0 left-0" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Special agent rates</p>
                <h2 className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.04em]">Want {hotel.name} for your client?</h2>
                <p className="mt-2 text-white/70">Our specialists will confirm rates, rooms and availability, and can add flights, transfers and experiences.</p>
              </div>
              <a href={enquire} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-cream py-1.5 pl-5 pr-1.5 font-bold tracking-tight text-ink shadow-[0_10px_40px_-8px_rgb(232_101_37/0.7)] transition-transform duration-500 hover:scale-[1.04] md:self-auto">
                Chat on WhatsApp
                <span className="grid size-8 place-items-center rounded-full bg-accent text-white"><MessageCircle className="size-4" /></span>
              </a>
            </div>
          </div>

          {/* More hotels */}
          {others.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-semibold tracking-tight">More hotels in {d.city}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((h) => {
                  const url = `/destinations/${d.id}/hotels/${slug(h.name)}`
                  return (
                    <a key={h.name} href={url} onClick={linkTo(url)} className="group glass-solid flex items-center gap-4 overflow-hidden rounded-[1.25rem] p-3 pr-4">
                      <img src={hotelImages[info.hotels.indexOf(h) % hotelImages.length]} alt="" loading="lazy" decoding="async" className="size-20 shrink-0 rounded-xl object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold tracking-tight">{h.name}</span>
                        <span className="block truncate text-sm text-white/55">{h.area} · {categoryLabel[h.category]}</span>
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

      <AnimatePresence>{viewer !== null && <Viewer photos={photos} start={viewer} name={hotel.name} onClose={() => setViewer(null)} />}</AnimatePresence>
      <ChatFab text={`Hi! I have a question about ${hotel.name} in ${d.city}.`} />
    </>
  )
}

function GalleryTile({ src, alt, onClick, className = '', eager = false, children }: { src: string; alt: string; onClick: () => void; className?: string; eager?: boolean; children?: ReactNode }) {
  return (
    <div className={`group relative min-h-0 overflow-hidden rounded-[1.5rem] ring-1 ring-white/10 ${className}`}>
      <button type="button" onClick={onClick} aria-label="Open photo" className="absolute inset-0">
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
      </button>
      {children}
    </div>
  )
}

function AllPhotos({ count, onClick, className = '' }: { count: number; onClick: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`glass absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/20 ${className}`}>
      <Images className="size-4" /> All {count} photos
    </button>
  )
}

function List({ title, items, icon: Icon, tone }: { title: string; items: string[]; icon: LucideIcon; tone: 'in' | 'out' }) {
  return (
    <div className="glass rounded-[1.5rem] p-6">
      <p className="font-semibold tracking-tight">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-white/80">
            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${tone === 'in' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/10 text-white/55'}`}>
              <Icon className="size-3.5" strokeWidth={2.5} />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Stop({ n, title, place, duration, tags, href, defaultOpen }: { n: number; title: string; place: string; duration: string; tags: string[]; href: string; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <li className="glass overflow-hidden rounded-[1.25rem]">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-4 px-5 py-4 text-left">
        <span className="text-lg font-bold tabular-nums text-accent">{String(n).padStart(2, '0')}</span>
        <span className="flex-1 font-semibold tracking-tight">{title}</span>
        <ChevronDown className={`size-5 shrink-0 text-white/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
            <div className="border-t border-white/10 px-5 pb-5 pl-14 pt-4">
              <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/65">
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" /> {place}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> {duration}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((t) => <span key={t} className="rounded-full bg-white/[0.07] px-2.5 py-1 text-xs font-medium text-white/70">{t}</span>)}
              </div>
              {isOpen('experiences') && (
                <a href={href} onClick={linkTo(href)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5">
                  See experiences <ArrowRight className="size-4" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

// Full-screen photo viewer: arrows / swipe-free buttons, Esc to close, thumbnails to jump.
function Viewer({ photos, start, name, onClose }: { photos: string[]; start: number; name: string; onClose: () => void }) {
  const [i, setI] = useState(start)
  const go = (n: number) => setI((n + photos.length) % photos.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setI((x) => (x + 1) % photos.length)
      if (e.key === 'ArrowLeft') setI((x) => (x - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); html.style.overflow = prev }
  }, [onClose, photos.length])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} photos`}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] flex flex-col bg-brand/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <p className="text-sm font-semibold text-white/80">{name} · {i + 1} / {photos.length}</p>
        <button type="button" onClick={onClose} aria-label="Close photos" className="glass grid size-11 place-items-center rounded-full hover:bg-white/15">
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
        <AnimatePresence mode="wait">
          <motion.img key={i} src={photos[i]} alt="" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="max-h-full max-w-full rounded-2xl object-contain" />
        </AnimatePresence>
        <button type="button" onClick={() => go(i - 1)} aria-label="Previous photo" className="glass absolute left-3 grid size-11 place-items-center rounded-full hover:bg-white/15 md:left-6"><ChevronLeft className="size-5" /></button>
        <button type="button" onClick={() => go(i + 1)} aria-label="Next photo" className="glass absolute right-3 grid size-11 place-items-center rounded-full hover:bg-white/15 md:right-6"><ChevronRight className="size-5" /></button>
      </div>
      <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
        {photos.map((p, k) => (
          <button key={p + k} type="button" onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} className={`size-14 shrink-0 overflow-hidden rounded-lg ring-2 transition ${k === i ? 'ring-accent' : 'opacity-60 ring-transparent hover:opacity-100'}`}>
            <img src={p.replace('w=1600', 'w=200')} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  )
}
