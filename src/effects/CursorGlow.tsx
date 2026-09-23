import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

// Morphing liquid orb that trails the pointer; only shown for fine pointers (mouse/trackpad).
export default function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 140, damping: 18, mass: 0.5 })

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
      <div className="blob glass size-12 -translate-x-1/2 -translate-y-1/2 !bg-white/10 !backdrop-blur-[3px] ring-1 ring-accent/40" />
    </motion.div>
  )
}
