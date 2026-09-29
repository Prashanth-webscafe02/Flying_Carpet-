import { motion } from 'framer-motion'
import { ArrowLeft, Bus, BusFront, Car, CarFront, MessageCircle, Plane, PlaneTakeoff, Ship, Truck, Van, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { ease } from '../effects/motion'
import type { Destination } from './data'
import type { Detail } from './details'
import { carRentalHero, mobility, transferHero, type HeroPhoto } from './mobility'

type Props = { d: Destination; info: Detail; onBack: () => void; enquire: (what: string) => string }

const vehicleIcons: Record<string, LucideIcon> = {
  Shuttle: Bus, Car, SUV: CarFront, Minibus: BusFront, Speedboat: Ship, Seaplane: Plane, 'Domestic flight': PlaneTakeoff,
}
const carTypeIcon = (type: string): LucideIcon =>
  /suv|crossover/i.test(type) ? CarFront : /van|minivan/i.test(type) ? Van : /pick ?up/i.test(type) ? Truck : Car

// Transfers: one shared info page per destination, exactly as specified —
// 1. hero image of the vehicle types, 2. overview, 3. vehicle types.
// (No search, price filter, categories, transfer types, fares, result cards or Book Now.)
export function TransfersInfo({ d, info, onBack }: Props) {
  const m = mobility[d.id]
  const sea = info.transferMode === 'sea'
  const overview = sea
    ? `We arrange shared and private speedboat transfers to resorts near Malé, seaplane flights to the outer atolls in daylight hours, and domestic flights with a connecting speedboat for the most remote islands, all timed to your clients’ arrival at ${info.airportName} (${info.airport}).`
    : `We arrange airport${m.port ? ', port' : ''} and hotel pickups in ${d.city}, shared or private. Your clients are met on arrival at ${info.airportName} (${info.airport})${m.port ? ` or at ${m.port}` : ''} and taken straight to their hotel, in the vehicle that suits their group.`

  return (
    <>
      <Head d={d} onBack={onBack} title={`Transfers in ${d.city}`} />
      <div className="space-y-12">
        <Hero photo={transferHero[sea ? 'sea' : 'road']} />
        <Section title="Overview">
          <p className="max-w-4xl text-lg leading-relaxed text-white/80">{overview}</p>
        </Section>
        <Section title="Vehicle types" note={`${m.vehicles.length} in ${d.city}`}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {m.vehicles.map((v, i) => <Tile key={v} icon={vehicleIcons[v] ?? Car} label={v} i={i} />)}
          </div>
        </Section>
      </div>
    </>
  )
}

// Car rental: one shared info page per destination, exactly as specified —
// 1. hero image of the car types, 2. overview, 3. rental car companies, 4. car types.
// (No search, driver's age, filters, result cards or Reserve.)
export function CarRentalInfo({ d, info, onBack, enquire }: Props) {
  const m = mobility[d.id]
  if (!m.companies.length) {
    return (
      <>
        <Head d={d} onBack={onBack} title={`Car rentals in ${d.city}`} />
        <div className="glass rounded-[1.75rem] px-6 py-12 text-center">
          <p className="text-lg font-semibold tracking-tight">Car rentals aren’t offered in {d.city}</p>
          <p className="mx-auto mt-2 max-w-md text-white/65">Getting around is by speedboat, seaplane or domestic flight; see Transfers.</p>
          <a href={enquire('help getting around')} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold transition hover:bg-[#f0763a]">
            <MessageCircle className="size-4" /> Ask a specialist
          </a>
        </div>
      </>
    )
  }
  const overview = `Self-drive car rental in ${d.city} from ${m.companies.length} rental car companies, with pickup at ${info.airportName} (${info.airport}) or in the city. Choose from ${m.carTypes.length} car types, from hatchbacks and sedans to SUVs, with unlimited mileage options.`

  return (
    <>
      <Head d={d} onBack={onBack} title={`Car rentals in ${d.city}`} />
      <div className="space-y-12">
        <Hero photo={carRentalHero} />
        <Section title="Overview">
          <p className="max-w-4xl text-lg leading-relaxed text-white/80">{overview}</p>
        </Section>
        <Section title="Rental car companies" note={`${m.companies.length} in ${d.city}`}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {m.companies.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease }}
                className="glass-solid grid h-20 place-items-center rounded-2xl px-3 text-center"
              >
                <span className="text-[0.95rem] font-extrabold uppercase leading-tight tracking-[0.06em]">{c}</span>
              </motion.div>
            ))}
          </div>
        </Section>
        <Section title="Car types" note={`${m.carTypes.length} in ${d.city}`}>
          <div className="flex flex-wrap gap-2">
            {m.carTypes.map((t) => {
              const Icon = carTypeIcon(t)
              return (
                <span key={t} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                  <Icon className="size-4 text-accent" /> {t}
                </span>
              )
            })}
          </div>
        </Section>
      </div>
    </>
  )
}

/* ---------- pieces ---------- */

function Head({ d, onBack, title }: { d: Destination; onBack: () => void; title: string }) {
  return (
    <div className="mb-8">
      <button type="button" onClick={onBack} className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors hover:text-white">
        <ArrowLeft className="size-4" /> Back to {d.city}
      </button>
      <h2 className="text-[clamp(1.8rem,3.2vw,2.75rem)] font-semibold leading-tight tracking-[-0.045em]">{title}</h2>
    </div>
  )
}

// 1. One hero image of the vehicle / car types usually available.
function Hero({ photo }: { photo: HeroPhoto }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      className="relative h-[clamp(14rem,38vw,26rem)] overflow-hidden rounded-[1.75rem] ring-1 ring-white/15"
    >
      <img src={photo.src} alt={photo.label} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    </motion.figure>
  )
}

function Section({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.035em]">{title}</h3>
        {note && <p className="text-sm text-white/55">{note}</p>}
      </div>
      {children}
    </section>
  )
}

function Tile({ icon: Icon, label, i }: { icon: LucideIcon; label: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05, ease }}
      className="glass-solid flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center"
    >
      <span className="grid size-14 place-items-center rounded-full bg-white/10 text-accent ring-1 ring-white/15">
        <Icon className="size-7" strokeWidth={1.75} />
      </span>
      <span className="font-semibold tracking-tight">{label}</span>
    </motion.div>
  )
}
