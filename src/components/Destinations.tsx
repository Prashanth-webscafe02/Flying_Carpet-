import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowRight, BedDouble, Car, CarFront, Plane, Search, Ticket, X, type LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { destinations, productOrder, type Destination, type ProductId } from '../destinations/data'
import { linesFor } from '../destinations/lines'
import { allLists, marketLists, type RegionId } from '../destinations/markets'
import { Eyebrow, PillButton, Reveal, SplitHeading, ease } from '../effects/motion'
import { LucidWave } from '../effects/LucidLine'
import { market, marketName } from '../market'

const PAGE = 8

const icons: Record<ProductId, { icon: LucideIcon; label: string }> = {
  flights: { icon: Plane, label: 'Flights' },
  hotels: { icon: BedDouble, label: 'Hotels' },
  experiences: { icon: Ticket, label: 'Experiences' },
  transfers: { icon: CarFront, label: 'Transfers' },
  'car-rentals': { icon: Car, label: 'Car rentals' },
}

const byId = new Map(destinations.map((d) => [d.id, d]))
const pick = (ids: string[]) => ids.map((id) => byId.get(id)).filter((d): d is Destination => !!d)

// Destination browser (H6): this market's list by default (Appendix A), grouped in region tabs in
// the client's order; "See all destinations" opens all 79. Grid on desktop, swipe row on phones.
export default function Destinations() {
  const [everything, setEverything] = useState(false)
  const [region, setRegion] = useState<RegionId | 'all'>('all')
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(PAGE)

  const lists = everything ? allLists : marketLists[market]
  const q = query.trim().toLowerCase()

  const list = useMemo(() => {
    // Search looks across every destination we cover, so an agent can always find a name.
    if (q) return destinations.filter((d) => `${d.city} ${d.country}`.toLowerCase().includes(q))
    const ids = region === 'all' ? lists.flatMap((r) => r.ids) : (lists.find((r) => r.region === region)?.ids ?? [])
    return pick(ids)
  }, [q, region, lists])

  const reset = () => setShown(PAGE)
  const chooseRegion = (r: RegionId | 'all') => {
    setRegion(r)
    reset()
  }
  const toggleEverything = () => {
    setEverything((e) => !e)
    setRegion('all')
    reset()
  }

  return (
    <section id="destinations" className="relative px-4 pt-28 md:px-8 md:pt-40">
      {/* Lucid Line across the gap above (About's bottom padding + this section's top padding) */}
      <LucidWave shape="fall" className="absolute inset-x-0 -top-16 -z-1 h-44 md:-top-24 md:h-64" />
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow>Destinations</Eyebrow></Reveal>
        <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <SplitHeading
            text="The destinations your clients ask for most"
            className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-tighter"
          />
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-white/75">
              The top leisure destinations for clients travelling from {marketName}, with all five categories on one login.
            </p>
          </Reveal>
        </div>

        {/* Controls: region tabs, See all destinations, search */}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <LayoutGroup id="dest-tabs">
            <div
              role="tablist"
              aria-label="Regions"
              className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 scrollbar-none lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {(['all', ...lists.map((r) => r.region)] as const).map((r) => {
                const on = !q && region === r
                const label = r === 'all' ? 'All' : lists.find((x) => x.region === r)!.name
                return (
                  <button
                    key={r}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setQuery('')
                      chooseRegion(r)
                    }}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${on ? 'text-white' : 'text-white/65 hover:text-white'}`}
                  >
                    {on && (
                      <motion.span
                        layoutId="dest-tab"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full border border-accent/60 bg-accent/20"
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={everything}
              onClick={toggleEverything}
              className="glass inline-flex items-center gap-3 rounded-full py-1.5 pl-4 pr-1.5 text-sm font-semibold"
            >
              See all destinations
              <span className={`relative h-6 w-10 rounded-full transition-colors ${everything ? 'bg-accent' : 'bg-white/15'}`}>
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`absolute top-1 size-4 rounded-full bg-white ${everything ? 'right-1' : 'left-1'}`}
                />
              </span>
            </button>
            <label className="glass flex min-w-0 flex-1 items-center gap-2 rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-accent/60 sm:w-64 sm:flex-none">
              <Search className="size-4 shrink-0 text-white/55" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  reset()
                }}
                placeholder="Search a destination"
                aria-label="Search a destination"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-white/50 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="text-white/60 hover:text-white">
                  <X className="size-4" />
                </button>
              )}
            </label>
          </div>
        </div>

        {/* Cards: a swipe row on phones, a grid from tablets up */}
        {list.length ? (
          <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.slice(0, shown).map((d, i) => (
                <Card key={d.id} d={d} i={i} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="glass mt-8 rounded-[1.75rem] px-6 py-10 text-center text-white/70">
            No destination matches “{query}”.
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-4">
          {shown < list.length && (
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="glass rounded-full px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/15"
            >
              Show more <span className="text-white/55">({list.length - shown})</span>
            </button>
          )}
          {/* Button under the section (H6): starts the questions */}
          <PillButton href="/get-started" variant="glass">Explore destinations</PillButton>
        </div>
      </div>
    </section>
  )
}

function Card({ d, i }: { d: Destination; i: number }) {
  const lines = linesFor(d.id)
  const name = d.city === d.country ? d.city : `${d.city}, ${d.country}`
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: (i % PAGE) * 0.04, ease }}
      className="group glass-solid relative flex w-[78vw] max-w-sm shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] ring-white/25 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:ring-1 hover:shadow-[0_24px_60px_-24px_rgb(232_101_37/0.55)] md:w-auto md:max-w-none"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={d.img}
          alt={d.city}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand/80 via-brand/10 to-transparent" />
        <h3 className="absolute inset-x-5 bottom-4 text-xl font-bold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
          {name}
        </h3>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {lines && (
          <>
            <p className="text-[0.95rem] font-semibold leading-snug">{lines[0]}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{lines[1]}</p>
          </>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <ul className="flex gap-1.5" aria-label="All five categories">
            {productOrder.map((p) => {
              const { icon: Icon, label } = icons[p]
              return (
                <li key={p} title={label} className="grid size-8 place-items-center rounded-full bg-white/8 text-accent ring-1 ring-white/10">
                  <Icon className="size-4" aria-label={label} />
                </li>
              )
            })}
          </ul>
          {/* Stretched link: the whole card opens the destination. */}
          <a
            href={`/destinations/${d.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-[gap] after:absolute after:inset-0 after:content-[''] group-hover:gap-2.5"
          >
            Explore <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
