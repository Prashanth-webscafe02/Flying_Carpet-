import { motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect } from 'react'
import About from './components/About'
import Agents from './components/Agents'
import Destinations from './components/Destinations'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Hosts from './components/Hosts'
import Offers from './components/Offers'
import Platform from './components/Platform'
import CursorGlow from './effects/CursorGlow'
import FluidBackground from './effects/FluidBackground'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  // Inertial smooth scrolling; anchor links glide instead of jumping.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -80 } })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  return (
    <>
      <FluidBackground />
      <CursorGlow />
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-accent via-orange-300 to-white" />
      <Header />
      <main>
        <Hero />
        <Offers />
        <About />
        <Destinations />
        <Platform />
        <Hosts />
        <Agents />
      </main>
      <Footer />
    </>
  )
}
