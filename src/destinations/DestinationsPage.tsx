import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BedDouble, Car, CarFront, LayoutGrid, List, MessageCircle, Pencil, Plane, RotateCcw, Ticket, type LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { LucidCorner, LucidWave } from '../effects/LucidLine'
import { Reveal, ease } from '../effects/motion'
import { clearAnswers, loadAnswers, type Answers } from '../get-started/answers'
import { steps, type StepId } from '../get-started/steps'
import { bannerImg, destinations, productsOf, specialistImg, whatsapp, type Destination, type ProductId } from './data'
import ChatFab from './ChatFab'
import { linkTo } from './navigate'

const PAGE = 8
const regions = steps.find((s) => s.id === 'destinations')!.choices

const products: Record<ProductId, { label: string; icon: LucideIcon }> = {
  flights: { label: 'Flights', icon: Plane },
  hotels: { label: 'Hotels', icon: BedDouble },
  experiences: { label: 'Experiences', icon: Ticket },
  transfers: { label: 'Transfers', icon: CarFront },
  'car-rentals': { label: 'Car rentals', icon: Car },
}

type Sort = 'relevance' | 'popular' | 'az'
const sorts: { id: Sort; label: string }[] = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'popular', label: 'Popular' },
  { id: 'az', label: 'A–Z' },
]

// "India to world" for one pick, "Southeast Asia +2" for several, or the fallback for none.
function summary(answers: Answers, id: StepId, fallback: string) {
  const picked = steps.find((s) => s.id === id)!.choices.filter((c) => answers[id].includes(c.id)).map((c) => c.title.trim())
  if (!picked.length) return fallback
  return picked.length === 1 ? picked[0] : `${picked[0]} +${picked.length - 1}`
}

// Personalised results page the onboarding flow lands on: the agent's picks, a region filter,
// and destinations ranked by how well they match (regions first, then products they sell).
export default function DestinationsPage() {
  const [{ answers }] = useState(loadAnswers)
  const [region, setRegion] = useState('all')
  const [sort, setSort] = useState<Sort>('relevance')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [shown, setShown] = useState(PAGE)

  useEffect(() => { document.title = 'Your destinations — Flying Carpet' }, [])

  const myRegions = answers.destinations
  const mySpecialise = answers.specialise
  const personalised = Object.values(answers).some((a) => a.length)

  const list = useMemo(() => {
    const score = (d: Destination, i: number) =>
      (myRegions.includes(d.region) ? 1000 : 0) + d.products.filter((p) => mySpecialise.includes(p)).length * 50 + (d.popular ? 10 : 0) - i
    const ranked = destinations.map((d, i) => ({ d, i })).filter(({ d }) => region === 'all' || d.region === region)
    if (sort === 'az') ranked.sort((a, b) => a.d.city.localeCompare(b.d.city))
    else if (sort === 'popular') ranked.sort((a, b) => Number(!!b.d.popular) - Number(!!a.d.popular) || a.i - b.i)
    else ranked.sort((a, b) => score(b.d, b.i) - score(a.d, a.i))
    return ranked.map(({ d }) => d)
  }, [region, sort, myRegions, mySpecialise])

  const count = (id: string) => destinations.filter((d) => id === 'all' || d.region === id).length
  const regionTitle = regions.find((r) => r.id === region)?.title
  const pickRegion = (id: string) => { setRegion(id); setShown(PAGE) }

  const prefs: { id: StepId; label: string; value: string }[] = [
    { id: 'market', label: 'Market', value: summary(answers, 'market', 'All markets') },
    { id: 'destinations', label: 'Regions', value: summary(answers, 'destinations', 'All regions') },
    { id: 'specialise', label: 'Specialise in', value: summary(answers, 'specialise', 'All products') },
    { id: 'hotels', label: 'Hotel category', value: summary(answers, 'hotels', 'All categories') },
  ]

  return (
    <>
      <main>
        {/* Banner */}
        <section className="relative overflow-hidden">
          <motion.img
            src={bannerImg}
            alt=""
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/80 to-brand/25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand/80 to-transparent" />
          {/* Lucid Line: low under the copy on the left, lifting over the photo on the right */}
          <LucidWave shape="lift" draw="intro" className="absolute inset-x-0 bottom-20 top-1/2 hidden md:block" />

          <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-32 sm:pt-36 md:px-8 md:pb-36 md:pt-44">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease }} className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">Your personalised destinations</p>
              <h1 className="text-[clamp(2.4rem,5.2vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.045em]">
                Incredible places.
                <br />
                <span className="bg-gradient-to-r from-[#ffb68c] to-accent bg-clip-text text-transparent">Greater opportunities.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                Based on your preferences, here are destinations and products that match your business. Explore, get inspired and see what you can offer your travellers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The agent's picks, each editable */}
        <div className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="glass-strong flex flex-col gap-3 rounded-[1.75rem] p-3 sm:p-4 lg:flex-row lg:items-center"
          >
            <div className="grid flex-1 grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-4">
              {prefs.map((p) => (
                <a
                  key={p.id}
                  href={`/get-started/${p.id}?return=destinations`}
                  className="group flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/10"
                >
                  <span className="min-w-0">
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/50">{p.label}</span>
                    <span className="block truncate font-semibold tracking-tight">{p.value}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">
                    <Pencil className="size-3.5" /> Edit
                  </span>
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => { clearAnswers(); window.location.assign('/get-started/market') }}
              className="inline-flex items-center justify-center gap-2 self-start rounded-full px-4 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:text-white lg:self-auto"
            >
              <RotateCcw className="size-4" /> Start over
            </button>
          </motion.div>
        </div>

        {/* Regions + results */}
        <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 md:px-8 md:pt-16">
          <div className="grid gap-8 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-10">
            <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
              <h2 className="mb-3 text-lg font-semibold tracking-tight">Regions</h2>
              <LayoutGroup id="regions">
                <div
                  role="radiogroup"
                  aria-label="Filter by region"
                  className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
                >
                  {[{ id: 'all', title: 'All destinations' }, ...regions].map((r) => {
                    const on = region === r.id
                    const mine = myRegions.includes(r.id)
                    return (
                      <button
                        key={r.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => pickRegion(r.id)}
                        className={`relative flex shrink-0 items-center justify-between gap-3 rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors lg:rounded-2xl ${on ? 'text-white' : 'text-white/70 hover:bg-white/[0.06] hover:text-white'}`}
                      >
                        {on && <motion.span layoutId="region-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-[inherit] border border-accent/60 bg-accent/15" />}
                        <span className="relative flex items-center gap-2 whitespace-nowrap">
                          {r.title.trim()}
                          {mine && <span title="One of your regions" className="size-1.5 rounded-full bg-accent" />}
                        </span>
                        <span className={`relative text-xs tabular-nums ${on ? 'text-white' : 'text-white/45'}`}>{count(r.id)}</span>
                      </button>
                    )
                  })}
                </div>
              </LayoutGroup>

              <a href="/#partners" className="group relative mt-6 hidden aspect-[4/3.4] overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 lg:block">
                <img src={specialistImg} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/30 to-transparent" />
                <span className="glass absolute right-4 top-4 grid size-10 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45 group-hover:bg-accent">
                  <ArrowUpRight className="size-4" />
                </span>
                <p className="absolute inset-x-5 bottom-5 font-semibold leading-snug tracking-tight">See how agents grow with Flying Carpet</p>
              </a>
            </aside>

            <div className="min-w-0">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.04em]">
                    {region === 'all' ? 'Top destinations for you' : regionTitle}
                  </h2>
                  <p className="mt-1 text-sm text-white/55">
                    {list.length} destination{list.length === 1 ? '' : 's'}
                    {personalised && sort === 'relevance' ? ' · ranked by your picks' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <LayoutGroup id="sort">
                    <div role="radiogroup" aria-label="Sort by" className="glass flex rounded-full p-1">
                      {sorts.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          role="radio"
                          aria-checked={sort === s.id}
                          onClick={() => setSort(s.id)}
                          className={`relative rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${sort === s.id ? 'text-white' : 'text-white/60 hover:text-white'}`}
                        >
                          {sort === s.id && <motion.span layoutId="sort-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-full bg-accent" />}
                          <span className="relative">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </LayoutGroup>
                  <div className="glass hidden rounded-full p-1 sm:flex">
                    {([['grid', LayoutGrid, 'Grid view'], ['list', List, 'List view']] as const).map(([v, Icon, label]) => (
                      <button
                        key={v}
                        type="button"
                        aria-label={label}
                        aria-pressed={view === v}
                        onClick={() => setView(v)}
                        className={`grid size-8 place-items-center rounded-full transition-colors ${view === v ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white'}`}
                      >
                        <Icon className="size-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {list.length ? (
                <motion.div layout className={view === 'grid' ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3' : 'grid gap-4'}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {list.slice(0, shown).map((d, i) => (
                      <Card
                        key={d.id}
                        d={d}
                        i={i}
                        list={view === 'list'}
                        inMyRegion={myRegions.includes(d.region)}
                        mySpecialise={mySpecialise}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="glass rounded-[1.75rem] px-6 py-12 text-center">
                  <p className="text-lg font-semibold tracking-tight">No {regionTitle} destinations listed yet</p>
                  <p className="mx-auto mt-2 max-w-md text-white/65">Our specialists can still build journeys there for your clients.</p>
                  <a href={whatsapp(`Hi! I'm looking for ${regionTitle} options for my clients.`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold transition hover:brightness-110">
                    <MessageCircle className="size-4" /> Ask a specialist
                  </a>
                </div>
              )}

              {shown < list.length && (
                <div className="mt-10 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShown((n) => n + PAGE)}
                    className="glass rounded-full px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/15"
                  >
                    Load more destinations
                  </button>
                  <p className="text-xs text-white/45">Showing {shown} of {list.length}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Specialist prompt */}
        <section className="px-4 md:px-8">
          <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] ring-1 ring-white/15">
            <img src={specialistImg} alt="A diver among a school of fish" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/70 to-brand/25" />
            <LucidCorner className="absolute bottom-0 left-0" />
            <div className="relative flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between md:p-14">
              <div className="max-w-lg">
                <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.045em]">Not sure where to start?</h2>
                <p className="mt-4 text-lg leading-relaxed text-white/75">Chat with our destination specialists and get personalised recommendations for your clients.</p>
                <a
                  href={whatsapp("Hi! I'd like personalised destination recommendations for my clients.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-cream py-1.5 pl-5 pr-1.5 font-bold tracking-tight text-ink shadow-[0_10px_40px_-8px_rgb(232_101_37/0.7)] transition-transform duration-500 hover:scale-[1.04]"
                >
                  Chat on WhatsApp
                  <span className="grid size-8 place-items-center rounded-full bg-accent text-white"><MessageCircle className="size-4" /></span>
                </a>
              </div>
              <p className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-light italic tracking-[-0.03em] text-white/90">Travel sells dreams.</p>
            </div>
          </Reveal>
        </section>
      </main>

      <ChatFab />
    </>
  )
}

function Card({ d, i, list, inMyRegion, mySpecialise }: {
  d: Destination
  i: number
  list: boolean
  inMyRegion: boolean
  mySpecialise: string[]
}) {
  const name = d.city === d.country ? d.city : `${d.city}, ${d.country}`
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: Math.min(i % PAGE, 7) * 0.04, ease }}
      className={`group glass-solid relative flex cursor-pointer overflow-hidden rounded-[1.75rem] ring-white/25 transition-shadow hover:ring-1 ${list ? 'flex-col sm:flex-row' : 'flex-col'}`}
    >
      <div className={`relative shrink-0 overflow-hidden ${list ? 'aspect-[4/3] sm:aspect-auto sm:w-64' : 'aspect-[4/3]'}`}>
        <img src={d.img} alt={name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/50 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {d.popular && <span className="rounded-full bg-accent px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em]">Popular</span>}
          {inMyRegion && <span className="glass rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em]">Your region</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/65">{d.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {productsOf(d).map((p) => {
            const { label, icon: Icon } = products[p]
            const match = mySpecialise.includes(p)
            return (
              <li key={p} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${match ? 'bg-accent/20 text-white ring-1 ring-accent/50' : 'bg-white/[0.07] text-white/70'}`}>
                <Icon className="size-3.5" /> {label}
              </li>
            )
          })}
        </ul>
        <div className="mt-auto pt-5">
          {/* Stretched link: its ::after covers the whole card, so clicking anywhere opens the
              destination (the heart sits above it on z-10). No filter/transform on this link:
              either would shrink the ::after back to the button. */}
          <a
            href={`/destinations/${d.id}`}
            onClick={linkTo(`/destinations/${d.id}`)}
            className="group/btn inline-flex items-center gap-2.5 rounded-full bg-accent py-2 pl-4 pr-2 text-sm font-semibold shadow-[0_10px_30px_-10px_rgb(232_101_37/0.9)] transition after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] hover:bg-[#f0763a] group-hover:bg-[#f0763a]"
          >
            Explore
            <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-x-0.5">
              <ArrowRight className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}
