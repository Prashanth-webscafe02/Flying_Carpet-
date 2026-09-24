import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { steps, type StepId } from './steps'

// Numbered progress rail; completed and current steps are clickable, future ones are not.
export default function Stepper({ current, done, onGo }: { current: number; done: Set<StepId>; onGo: (i: number) => void }) {
  return (
    <ol className="grid grid-cols-4 gap-2 md:gap-3">
      {steps.map((s, i) => {
        const isDone = done.has(s.id) && i !== current
        const isCurrent = i === current
        const reachable = isCurrent || done.has(s.id) || i < current
        return (
          <li key={s.id}>
            <button
              type="button"
              disabled={!reachable}
              onClick={() => onGo(i)}
              aria-current={isCurrent ? 'step' : undefined}
              className="group flex w-full flex-col gap-2.5 text-left outline-none disabled:cursor-default"
            >
              <span className="relative h-1 w-full overflow-hidden rounded-full bg-white/12">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  initial={false}
                  animate={{ width: isCurrent || isDone || i < current ? '100%' : '0%' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <span className="flex items-center gap-2">
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold transition-colors ${
                    isCurrent ? 'bg-accent text-white' : isDone ? 'bg-white text-ink' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {isDone ? <Check className="size-3" strokeWidth={3.5} /> : i + 1}
                </span>
                <span
                  className={`hidden truncate text-sm font-medium transition-colors sm:block ${
                    isCurrent ? 'text-white' : reachable ? 'text-white/70 group-hover:text-white' : 'text-white/40'
                  }`}
                >
                  {s.label}
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
