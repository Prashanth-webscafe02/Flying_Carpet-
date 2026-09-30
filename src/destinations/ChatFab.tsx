import { ArrowUpRight } from 'lucide-react'
import { REGISTER_URL } from '../content'

// Floating agency-access button shared by the destinations pages.
export default function ChatFab() {
  return (
    <a
      href={REGISTER_URL}
      aria-label="Get Agency Access"
      className="glass-orange fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-transform duration-300 hover:scale-105 md:bottom-8 md:right-8"
    >
      Get Agency Access <ArrowUpRight aria-hidden="true" className="size-4" />
    </a>
  )
}
