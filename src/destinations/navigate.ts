import type { MouseEvent } from 'react'

// In-app navigation for the destinations pages: update the URL without a reload and let
// DestinationsRoute re-render (it listens for popstate).
export function navigate(url: string) {
  window.history.pushState(null, '', url)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'instant' })
}

// onClick for <a href> links: navigate in-app, but keep new-tab/window clicks working.
export function linkTo(url: string) {
  return (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(url)
  }
}

export const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
