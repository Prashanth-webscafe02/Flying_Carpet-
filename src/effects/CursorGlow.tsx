import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

// Morphing liquid orb centred on the pointer; only shown for fine pointers (mouse/trackpad).
// A stiff spring keeps it on the cursor with just a touch of smoothing.
export default function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 1200, damping: 60, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 1200, damping: 60, mass: 0.2 })

  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden [@media(pointer:fine)]:block"
    >
      {/* Centred with margins (not transforms) so the morph animation can never shift it off the pointer. */}
      <div data-cursor-orb className="blob-morph glass -ml-6 -mt-6 size-12 !bg-white/10 !backdrop-blur-[3px] ring-1 ring-accent/40" />
    </motion.div>
  )
}
