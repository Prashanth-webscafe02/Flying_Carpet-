import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Check, ChevronDown, MessageCircle, Minus, Plus, Users } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { words } from '../market'
import { whatsapp } from './data'

// Shared by the hotel and experience pages: the sticky "Special agent rates" panel (desktop),
// the pinned rates bar (phones/tablets) and the section tab bar.

type Counts = Record<string, number>
const today = () => new Date().toISOString().slice(0, 10)
const fmtDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const plural = (n: number, one: string) => `${n} ${n === 1 ? one : `${one}s`}`.replace('Childs', 'Children')

// Viator-style pickers: dates plus a travellers (or rooms & guests) dropdown. The choices go into
// the WhatsApp request, so the specialist can quote straight away. Nothing is booked here.
export function RatesPanel({ intro, points, request, kind, footer }: { intro: string; points: string[]; request: string; kind: 'hotel' | 'experience'; footer?: ReactNode }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [counts, setCounts] = useState<Counts>(kind === 'hotel' ? { Room: 1, Adult: 2, Child: 0 } : { Adult: 2, Child: 0 })
  const who = Object.entries(counts).filter(([, n]) => n > 0).map(([k, n]) => plural(n, k)).join(', ')
  const when = kind === 'hotel'
    ? from && to ? `${fmtDate(from)} to ${fmtDate(to)}` : from ? `from ${fmtDate(from)}` : ''
    : from ? fmtDate(from) : ''
  const enquire = whatsapp(`Hi! I'd like ${request} for my clients.${when ? ` Dates: ${when}.` : ''} ${kind === 'hotel' ? 'Rooms and guests' : 'Guests'}: ${who}.`)

  return (
    <div className="glass-solid rounded-[1.75rem] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Special {words.agent} rates</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">Rates on request</p>
      <p className="mt-1 text-sm text-white/60">{intro}</p>

      <div className="mt-5 space-y-2.5">
        {kind === 'hotel' ? (
          <div className="grid grid-cols-2 gap-2.5">
            <DateField label="Check in" value={from} min={today()} onChange={(v) => { setFrom(v); if (to && to <= v) setTo('') }} />
            <DateField label="Check out" value={to} min={from || today()} onChange={setTo} />
          </div>
        ) : (
          <DateField label="Select date" value={from} min={today()} onChange={setFrom} />
        )}
        <CountsDropdown label={kind === 'hotel' ? 'Rooms & guests' : 'Guests'} summary={who} counts={counts} setCounts={setCounts} />
      </div>

      <ul className="mt-5 space-y-2.5 text-sm text-white/80">
        {points.map((t) => (
          <li key={t} className="flex items-start gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={3} /> {t}</li>
        ))}
      </ul>
      <a href={enquire} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-cream px-5 py-3 font-bold text-ink shadow-[0_10px_40px_-8px_rgb(232_101_37/0.7)] transition-transform duration-300 hover:scale-[1.02]">
        <MessageCircle className="size-4 text-accent" /> Request rates on WhatsApp
      </a>
      {footer && <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/60">{footer}</div>}
    </div>
  )
}

function DateField({ label, value, min, onChange }: { label: string; value: string; min: string; onChange: (v: string) => void }) {
  return (
    <label className="relative flex cursor-pointer items-center gap-2.5 rounded-2xl bg-white/8 px-3.5 py-2.5 ring-1 ring-white/15 transition-colors focus-within:ring-accent hover:bg-white/12">
      <Calendar className="size-4 shrink-0 text-accent" />
      <span className="min-w-0">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-widest text-white/50">{label}</span>
        <span className={`block truncate text-sm font-semibold ${value ? '' : 'text-white/60'}`}>{value ? fmtDate(value) : 'Choose'}</span>
      </span>
      {/* Native picker (calendar on desktop, wheel on phones) laid invisibly over the field */}
      <input type="date" value={value} min={min} onChange={(e) => onChange(e.target.value)} aria-label={label} className="absolute inset-0 cursor-pointer opacity-0 scheme-dark" />
    </label>
  )
}

function CountsDropdown({ label, summary, counts, setCounts }: { label: string; summary: string; counts: Counts; setCounts: (c: Counts) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc) }
  }, [open])
  const min = (k: string) => (k === 'Adult' || k === 'Room' ? 1 : 0)
  const hint: Record<string, string> = { Adult: 'Age 12+', Child: 'Age 2 to 11', Room: '' }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 rounded-2xl bg-white/8 px-3.5 py-2.5 text-left ring-1 ring-white/15 transition-colors hover:bg-white/12"
      >
        <Users className="size-4 shrink-0 text-accent" />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.7rem] font-semibold uppercase tracking-widest text-white/50">{label}</span>
          <span className="block truncate text-sm font-semibold">{summary}</span>
        </span>
        <ChevronDown className={`size-4 shrink-0 text-white/60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full z-20 mt-2 space-y-3 rounded-2xl bg-[#1d1a63] p-4 shadow-2xl ring-1 ring-white/20"
          >
            {Object.entries(counts).map(([k, n]) => (
              <div key={k} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{k === 'Child' ? 'Children' : `${k}s`}</p>
                  {hint[k] && <p className="text-xs text-white/50">{hint[k]}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" aria-label={`Fewer ${k.toLowerCase()}s`} disabled={n <= min(k)} onClick={() => setCounts({ ...counts, [k]: n - 1 })} className="grid size-8 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white/10 disabled:opacity-30"><Minus className="size-3.5" /></button>
                  <span className="w-5 text-center font-semibold tabular-nums">{n}</span>
                  <button type="button" aria-label={`More ${k.toLowerCase()}s`} disabled={n >= 20} onClick={() => setCounts({ ...counts, [k]: n + 1 })} className="grid size-8 place-items-center rounded-full ring-1 ring-white/25 transition hover:bg-white/10 disabled:opacity-30"><Plus className="size-3.5" /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setOpen(false)} className="w-full rounded-full bg-white/10 py-2 text-sm font-semibold hover:bg-white/15">Done</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Phones/tablets: rates bar pinned to the bottom while on the page (stops above the footer). */
export function RatesBar({ name, enquire }: { name: string; enquire: string }) {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--fab-lift', '4.75rem')
    return () => {
      root.style.removeProperty('--fab-lift')
    }
  }, [])
  return (
    <div className="glass-strong sticky bottom-0 z-40 flex items-center justify-between gap-3 rounded-t-3xl px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">{words.Agent} rates</p>
        <p className="truncate font-semibold tracking-tight">On request · {name}</p>
      </div>
      <a href={enquire} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-sm font-bold text-ink">
        <MessageCircle className="size-4 text-accent" /> Request rates
      </a>
    </div>
  )
}

export type SectionTab = { id: string; label: string }

/** Sticky tab bar that highlights whichever section is in the middle of the screen. */
export function SectionTabs({ sections }: { sections: SectionTab[] }) {
  const [active, setActive] = useState(sections[0]?.id)
  const ref = useRef<HTMLElement>(null)
  const ids = sections.map((s) => s.id).join()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    ids.split(',').forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids])

  // Phones: keep the highlighted tab visible in the sideways-scrolling bar.
  useEffect(() => {
    const bar = ref.current
    const tab = bar?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (bar && tab) bar.scrollTo({ left: tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' })
  }, [active])

  return (
    <nav ref={ref} aria-label="Sections" className="glass-strong sticky top-3 z-30 -mx-1 flex gap-1 overflow-x-auto rounded-full p-1.5 scrollbar-none [&::-webkit-scrollbar]:hidden">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-current={active === s.id ? 'true' : undefined}
          className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === s.id ? 'text-ink' : 'text-white/75 hover:text-white'}`}
        >
          {active === s.id && <motion.span layoutId="section-tab" className="absolute inset-0 rounded-full bg-cream" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
          <span className="relative">{s.label}</span>
        </a>
      ))}
    </nav>
  )
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-[clamp(1.5rem,2.4vw,2.1rem)] font-semibold tracking-[-0.04em] ${className}`}>{children}</h2>
}
