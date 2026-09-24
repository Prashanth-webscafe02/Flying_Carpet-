import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { ease } from '../effects/motion'
import type { Choice } from './steps'

// Image-free selection tile: badge (code or icon), title, meta line, and a description that opens on hover/focus and stays open once picked.
export default function ChoiceTile({ choice, selected, multi, index, onToggle }: {
  choice: Choice
  selected: boolean
  multi: boolean
  index: number
  onToggle: () => void
}) {
  const Icon = choice.icon

  return (
    <motion.button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      onClick={onToggle}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.04, ease }}
      whileTap={{ scale: 0.98 }}
      className={`group flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/70 ${
        selected
          ? 'border-accent/80 bg-accent/15'
          : 'border-white/12 bg-white/[0.05] hover:border-white/25 hover:bg-white/[0.09]'
      }`}
    >
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
          selected ? 'bg-accent text-white' : 'bg-white/10 text-accent group-hover:bg-white/15'
        }`}
      >
        {choice.code
          ? <span className={`text-[0.95rem] font-bold tracking-wide ${selected ? '' : 'text-white'}`}>{choice.code}</span>
          : Icon && <Icon className="size-5" strokeWidth={2} />}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[0.975rem] font-semibold leading-snug tracking-tight">{choice.title}</span>
        {choice.meta && <span className="block text-xs leading-snug text-white/55">{choice.meta}</span>}
        <span
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            selected
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100'
          }`}
        >
          <span className="overflow-hidden">
            <span className="block pt-1.5 text-[0.8rem] leading-snug text-white/70">{choice.text}</span>
          </span>
        </span>
      </span>

      <span
        aria-hidden
        className={`grid size-5 shrink-0 place-items-center border transition-colors duration-300 ${multi ? 'rounded-md' : 'rounded-full'} ${
          selected ? 'border-accent bg-accent' : 'border-white/30 group-hover:border-white/50'
        }`}
      >
        <AnimatePresence initial={false}>
          {selected && (
            <motion.span key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 520, damping: 22 }}>
              <Check className="size-3.5" strokeWidth={3.2} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  )
}
