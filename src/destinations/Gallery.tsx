import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { ease } from '../effects/motion'

// Photo gallery shared by the hotel and experience pages: one hero image, two thumbnails and an
// "All N photos" button (phones show the hero with the button), opening a full-screen viewer.
export default function Gallery({ photos, name }: { photos: string[]; name: string }) {
  const [viewer, setViewer] = useState<number | null>(null)
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease }}
        className="mt-6 grid h-[clamp(16rem,48vw,32rem)] gap-3 md:grid-cols-[2fr_1fr] md:grid-rows-2"
      >
        <GalleryTile src={photos[0]} alt={name} onClick={() => setViewer(0)} className="md:row-span-2" eager>
          <AllPhotos count={photos.length} onClick={() => setViewer(0)} className="md:hidden" />
        </GalleryTile>
        <GalleryTile src={photos[1]} alt="" onClick={() => setViewer(1)} className="hidden md:block" />
        <GalleryTile src={photos[2]} alt="" onClick={() => setViewer(2)} className="hidden md:block">
          <AllPhotos count={photos.length} onClick={() => setViewer(0)} />
        </GalleryTile>
      </motion.div>
      <AnimatePresence>{viewer !== null && <Viewer photos={photos} start={viewer} name={name} onClose={() => setViewer(null)} />}</AnimatePresence>
    </>
  )
}

function GalleryTile({ src, alt, onClick, className = '', eager = false, children }: { src: string; alt: string; onClick: () => void; className?: string; eager?: boolean; children?: ReactNode }) {
  return (
    <div className={`group relative min-h-0 overflow-hidden rounded-[1.5rem] ring-1 ring-white/10 ${className}`}>
      <button type="button" onClick={onClick} aria-label="Open photo" className="absolute inset-0">
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
      </button>
      {children}
    </div>
  )
}

function AllPhotos({ count, onClick, className = '' }: { count: number; onClick: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`glass absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/20 ${className}`}>
      <Images className="size-4" /> All {count} photos
    </button>
  )
}

// Full-screen photo viewer: arrows / swipe-free buttons, Esc to close, thumbnails to jump.
function Viewer({ photos, start, name, onClose }: { photos: string[]; start: number; name: string; onClose: () => void }) {
  const [i, setI] = useState(start)
  const go = (n: number) => setI((n + photos.length) % photos.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setI((x) => (x + 1) % photos.length)
      if (e.key === 'ArrowLeft') setI((x) => (x - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); html.style.overflow = prev }
  }, [onClose, photos.length])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} photos`}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] flex flex-col bg-brand/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <p className="text-sm font-semibold text-white/80">{name} · {i + 1} / {photos.length}</p>
        <button type="button" onClick={onClose} aria-label="Close photos" className="glass grid size-11 place-items-center rounded-full hover:bg-white/15">
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
        <AnimatePresence mode="wait">
          <motion.img key={i} src={photos[i]} alt="" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="max-h-full max-w-full rounded-2xl object-contain" />
        </AnimatePresence>
        <button type="button" onClick={() => go(i - 1)} aria-label="Previous photo" className="glass absolute left-3 grid size-11 place-items-center rounded-full hover:bg-white/15 md:left-6"><ChevronLeft className="size-5" /></button>
        <button type="button" onClick={() => go(i + 1)} aria-label="Next photo" className="glass absolute right-3 grid size-11 place-items-center rounded-full hover:bg-white/15 md:right-6"><ChevronRight className="size-5" /></button>
      </div>
      <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
        {photos.map((p, k) => (
          <button key={p + k} type="button" onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} className={`size-14 shrink-0 overflow-hidden rounded-lg ring-2 transition ${k === i ? 'ring-accent' : 'opacity-60 ring-transparent hover:opacity-100'}`}>
            <img src={p.replace('w=1600', 'w=200')} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  )
}
