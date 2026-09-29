import { AnimatePresence, motion } from 'framer-motion'
import {
  Accessibility, ArrowLeft, ArrowRight, Baby, Bike, Briefcase, Leaf, SquareParking, Building2, Check, ChevronLeft, ChevronRight, Clock, Coffee, ConciergeBell, CreditCard, Dumbbell, Eye, Images, Info, Landmark,
  Languages, Link2, MapPin, MessageCircle, Mountain, Sparkles, Star, TrainFront, Umbrella, Users, UtensilsCrossed, Waves, Wifi, X, type LucideIcon,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { LucidCorner } from '../effects/LucidLine'
import { ease } from '../effects/motion'
import ChatFab from './ChatFab'
import { whatsapp, type Destination } from './data'
import { categoryLabel, details, hotelImages, images, type Detail, type Hotel } from './details'
import { hotelFacts, roomRows, sampleRoomFacts, useSampleRoomFacts } from './hotelFacts'
import { linkTo, slug } from './navigate'

const countryNames: Record<string, string> = { UAE: 'United Arab Emirates', USA: 'United States' }
const big = (src: string) => src.replace(/w=\d+/, 'w=1600')

// Facility → icon for the key info strip.
const facilityIcon = (label: string): LucideIcon => {
  const l = label.toLowerCase()
  const rules: [RegExp, LucideIcon][] = [
    [/pool|water|diving|snorkel|surf/, Waves], [/spa|yoga|hammam|wellness/, Sparkles], [/wi-?fi/, Wifi], [/beach/, Umbrella],
    [/dining|restaurant|breakfast|tea|bar|inclusive/, UtensilsCrossed], [/kids|family/, Baby], [/gym|fitness/, Dumbbell], [/business/, Briefcase],
    [/view/, Eye], [/heritage|palace/, Landmark], [/butler|riad/, ConciergeBell], [/metro|skytrain|shuttle/, TrainFront], [/rooftop|design|art/, Building2],
    [/garden|desert|ski|nature|mountain/, Mountain], [/group/, Users], [/reception|central/, Clock], [/multilingual|language/, Languages], [/wheelchair|accessib/, Accessibility], [/car park|parking/, SquareParking],
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

type Facility = { label: string; paid?: boolean }
type FacilityGroup = { title: string; icon: LucideIcon; items: Facility[] }

const groupIcons: Record<string, LucideIcon> = {
  'Amenities and Services': ConciergeBell, 'Restaurant Service': UtensilsCrossed, Meals: Coffee, Business: Briefcase,
  'Internet Access': Wifi, Entertainment: Waves, 'Health and Beauty': Sparkles, 'Sustainable Certification': Leaf,
  Activities: Bike, 'To take into account': Info, 'Cards Accepted': CreditCard,
}

// Grouped facilities, built from the hotel's own amenities (sorted into groups) plus standard
// services for its category. `paid` items are marked "$" on the page.
function facilityGroups(hotel: Hotel, info: Detail): FacilityGroup[] {
  const premium = hotel.category === 'luxury' || hotel.category === 'upscale' || hotel.category === 'boutique'
  const f = (label: string, paid = false): Facility => ({ label, paid })
  const groups: FacilityGroup[] = [
    { title: 'Amenities and Services', icon: ConciergeBell, items: [f('24-hour reception'), f('Multilingual staff'), ...(premium ? [f('Concierge')] : []), f('Luggage storage'), f('Laundry service', true), ...(info.transferMode !== 'sea' && hotel.category !== 'budget' ? [f('Car park')] : [])] },
    { title: 'Restaurant Service', icon: UtensilsCrossed, items: [f('Restaurant'), ...(hotel.category !== 'budget' ? [f('Bar')] : []), ...(premium ? [f('Room service', true)] : [])] },
    { title: 'Meals', icon: Coffee, items: [f('Breakfast buffet'), ...(premium ? [f('Lunch'), f('Dinner')] : [])] },
    { title: 'Business', icon: Briefcase, items: premium ? [f('Meeting rooms'), f('Business centre'), f('Printer', true)] : [] },
    { title: 'Internet Access', icon: Wifi, items: [f('Wi-Fi')] },
    { title: 'Entertainment', icon: Waves, items: [] },
    { title: 'Health and Beauty', icon: Sparkles, items: premium ? [f('Fitness centre')] : [] },
    { title: 'Activities', icon: Bike, items: [] },
    { title: 'To take into account', icon: Info, items: [f('Deposit may be required on arrival'), f('Photo ID required at check-in')] },
    { title: 'Cards Accepted', icon: CreditCard, items: [f('American Express'), f('MasterCard'), f('Visa')] },
  ]
  const group = (title: string) => groups.find((g) => g.title === title)!
  // Sort each of the hotel's own amenities into a group.
  const rules: [RegExp, string, boolean][] = [
    [/wi-?fi/i, 'Internet Access', false],
    [/dining|tea|breakfast|bar$|rooftop bar/i, 'Restaurant Service', false],
    [/inclusive/i, 'Meals', false],
    [/business/i, 'Business', false],
    [/spa|hammam/i, 'Health and Beauty', true],
    [/gym|fitness|yoga/i, 'Health and Beauty', false],
    [/diving|snorkel|surf|water sports|ski|desert/i, 'Activities', true],
    [/pool|beach|kids|family|garden|view|casino|art|design|rooftop/i, 'Entertainment', false],
  ]
  for (const a of hotel.amenities) {
    const [, title, paid] = rules.find(([re]) => re.test(a)) ?? [null, 'Amenities and Services', false]
    group(title).items.push(f(a, paid))
    if (/spa/i.test(a)) group('Health and Beauty').items.push(f('Massage', true))
  }
  // De-duplicate (e.g. "Wi-Fi" vs "Free Wi-Fi") and drop empty groups.
  for (const g of groups) {
    const seen = new Set<string>()
    g.items = g.items.filter((i) => {
      const key = i.label.toLowerCase().replace(/^free /, '')
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    if (g.title === 'Internet Access' && g.items.length > 1) g.items = g.items.filter((i) => i.label !== 'Wi-Fi')
    if (g.title === 'Health and Beauty' && g.items.some((i) => /gym|fitness/i.test(i.label) && i.label !== 'Fitness centre')) g.items = g.items.filter((i) => i.label !== 'Fitness centre')
  }
  return groups.filter((g) => g.items.length)
}

// A hotel's own page (the reference site's hotel detail, minus search, prices and booking):
// name + stars, street address, gallery, amenities strip, overview, property facts, facilities.
export default function HotelDetail({ d, hotel }: { d: Destination; hotel: Hotel }) {
  const info = details[d.id]
  const index = info.hotels.indexOf(hotel)
  const country = countryNames[d.country] ?? d.country
  const facts = hotelFacts[hotel.name] ?? {}
  // Year built + room counts: the shared sample while `useSampleRoomFacts` is on, else this hotel's own.
  const roomFacts = useSampleRoomFacts ? sampleRoomFacts : { opened: facts.opened, rooms: facts.rooms }
  const where = d.city === country ? country : `${d.city}, ${country}`
  const address = facts.address ? `${facts.address}, ${where}` : `${hotel.area}, ${where}`
  const photos = [...hotelImages.slice(index % hotelImages.length), ...hotelImages.slice(0, index % hotelImages.length), images.hotels, d.img].map(big)
  const [viewer, setViewer] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const enquire = whatsapp(`Hi! I'd like rates and availability for ${hotel.name} (${d.city}) for my clients.`)
  const back = `/destinations/${d.id}/hotels`

  useEffect(() => { document.title = `${hotel.name} · ${d.city} — Flying Carpet` }, [hotel.name, d.city])

  // Top amenities for the single-row strip: the hotel's own, then standard services.
  const strip = facts.strip ?? [...hotel.amenities, ...['Restaurant', 'Free Wi-Fi', '24-hour reception', 'Multilingual staff'].filter((f) => !hotel.amenities.some((a) => a.toLowerCase().includes(f.split(' ').pop()!.toLowerCase())))].slice(0, 7)
  const groups: FacilityGroup[] = facts.facilities
    ? facts.facilities.map((g) => ({ ...g, icon: groupIcons[g.title] ?? Check }))
    : facilityGroups(hotel, info)
  const listFormatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
  const location = hotel.area === d.city ? d.city : `${hotel.area}, ${d.city}`
  const overview = [
    `${hotel.text} Located in ${location}, ${hotel.name} is listed in our ${categoryLabel[hotel.category].toLowerCase()} collection. ${categoryBlurb[hotel.category]}`,
    ...(hotel.amenities.length ? [`The property's highlights include ${listFormatter.format(hotel.amenities)}. These features help shape the stay beyond the room itself, whether your clients want to spend time enjoying the hotel or balance their visit with days out in ${d.city}.`] : []),
  ]
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

          {/* 1–2. Name with star rating, full address underneath */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="text-[clamp(2rem,4.4vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em]">{hotel.name}</h1>
              <span className="flex gap-0.5" aria-label={`${hotel.stars} star hotel`}>
                {Array.from({ length: hotel.stars }, (_, i) => <Star key={i} className="size-4.5 fill-accent text-accent" />)}
              </span>
            </div>
            <p className="mt-2 flex items-start gap-1.5 text-white/70">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" />
              <span>
                {address}
                <span className="ml-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 align-middle text-xs font-semibold text-white/80">{categoryLabel[hotel.category]}</span>
              </span>
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

          {/* 4. Key amenities: icon + label, single row (scrolls sideways on small screens) */}
          <ul className="glass mt-4 flex gap-x-6 overflow-x-auto whitespace-nowrap rounded-[1.5rem] px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {strip.map((f) => {
              const Icon = facilityIcon(f)
              return (
                <li key={f} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-white/85">
                  <Icon className="size-4 text-accent" /> {f}
                </li>
              )
            })}
          </ul>

          {/* 5. Overview */}
          <section id="overview" className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div>
              <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">Overview</h2>
              <div className="mt-4 max-w-3xl space-y-4 text-lg leading-relaxed text-white/80">
                {overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            {/* 6. Property facts: year built, then room counts by type (same rows for every hotel) */}
            <div aria-label="Property facts" className="glass h-fit rounded-[1.5rem] p-5 text-sm">
              <dl>
                <FactRow label="Year built" value={roomFacts.opened} />
              </dl>
              <p className="mb-1 mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Room count by type</p>
              <dl>
                {roomRows.map(([key, label]) => <FactRow key={key} label={label} value={roomFacts.rooms?.[key]} />)}
              </dl>
              {(!roomFacts.opened || roomRows.some(([key]) => roomFacts.rooms?.[key] === undefined)) && (
                <p className="mt-3 text-xs text-white/45">— Confirmed on request</p>
              )}
            </div>
          </section>

          {/* 7. Facilities, grouped; "$" marks items with an extra charge */}
          <section id="facilities" className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">Facilities</h2>
              <p className="text-sm text-white/55"><span className="font-bold text-accent">$</span> Additional charge</p>
            </div>
            <div className="glass mt-5 grid gap-x-8 gap-y-8 rounded-[1.75rem] p-6 sm:grid-cols-2 lg:grid-cols-4 md:p-8">
              {groups.map((g) => <FacilityList key={g.title} group={g} />)}
            </div>
          </section>

          {/* Enquiry prompt */}
          <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1d1a63] to-brand p-8 ring-1 ring-white/15 md:p-10">
            <LucidCorner className="absolute bottom-0 left-0" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Special agent rates</p>
                <h2 className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.04em]">Want {hotel.name} for your client?</h2>
                <p className="mt-2 text-white/70">Our specialists will confirm rates, rooms and availability, and can add flights, experiences, transfers and car rentals.</p>
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

function FactRow({ label, value }: { label: string; value?: number }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 py-2.5 last:border-0">
      <dt className="text-white/55">{label}</dt>
      <dd className={`text-right font-semibold tabular-nums ${value === undefined ? 'text-white/35' : ''}`}>
        {value === undefined ? '—' : label === 'Year built' ? value : value.toLocaleString('en')}
      </dd>
    </div>
  )
}

const SHOWN = 5

function FacilityList({ group }: { group: FacilityGroup }) {
  const [all, setAll] = useState(false)
  const items = all ? group.items : group.items.slice(0, SHOWN)
  return (
    <div>
      <p className="flex items-center gap-2 font-semibold tracking-tight">
        <group.icon className="size-4.5 text-accent" /> {group.title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.label} className="flex items-start gap-2.5 text-sm text-white/75">
            {i.paid
              ? <span aria-label="Additional charge" className="mt-px w-4 shrink-0 text-center font-bold text-accent">$</span>
              : <Check className="mt-0.5 size-4 shrink-0 text-white/60" strokeWidth={2.5} />}
            {i.label}
          </li>
        ))}
      </ul>
      {group.items.length > SHOWN && (
        <button type="button" onClick={() => setAll((x) => !x)} aria-expanded={all} className="mt-2 text-sm font-semibold text-accent hover:underline">
          {all ? 'Show less' : 'See all'}
        </button>
      )}
    </div>
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
