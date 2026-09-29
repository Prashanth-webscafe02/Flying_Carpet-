import { BedDouble, Car, CarFront, Plane, Ticket, type LucideIcon } from 'lucide-react'

// Destination detail tabs; the page itself is the overview, so there's no "overview" tab.
export type Tab = 'flights' | 'hotels' | 'experiences' | 'transfers' | 'car-rentals' | 'travel-guide'

// `disabled` tabs show as "coming soon": visible but not clickable. Remove the flag to switch one back on.
export const tabs: { id: Tab; label: string; icon: LucideIcon; disabled?: boolean }[] = [
  { id: 'flights', label: 'Flights', icon: Plane, disabled: true },
  { id: 'hotels', label: 'Hotels', icon: BedDouble },
  { id: 'experiences', label: 'Experiences', icon: Ticket },
  { id: 'transfers', label: 'Transfers', icon: CarFront },
  { id: 'car-rentals', label: 'Car rentals', icon: Car },
]
export const isTab = (t?: string): t is Tab => tabs.some((x) => x.id === t)
/** A tab that exists and is switched on. */
export const isOpen = (t?: string): t is Tab => tabs.some((x) => x.id === t && !x.disabled)

// Flights: the per-airline "View options" button is switched off for now.
export const flightOptionsEnabled = false
