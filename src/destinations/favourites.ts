import { useState } from 'react'

const KEY = 'fct-favourites'

// Hearted/saved destinations, remembered on this device (shared by the list and detail pages).
export function useFavourites() {
  const [favs, setFavs] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[] } catch { return [] }
  })
  const toggle = (id: string) => setFavs((f) => {
    const next = f.includes(id) ? f.filter((x) => x !== id) : [...f, id]
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* ignore */ }
    return next
  })
  return [favs, toggle] as const
}
