import { motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect } from 'react'
import About from './components/About'
import Agents from './components/Agents'
import Destinations from './components/Destinations'
import Footer from './components/Footer'
import DestinationsRoute from './destinations/DestinationsRoute'
import GetStarted from './get-started/GetStarted'
import Header from './components/Header'
import Hero from './components/Hero'
import Testimonials from './components/Testimonials'
import Offers from './components/Offers'
import Platform from './components/Platform'
import CursorGlow from './effects/CursorGlow'
import FluidBackground from './effects/FluidBackground'
import { LucidCorner, LucidWave } from './effects/LucidLine'

// The agency onboarding flow lives under /get-started and lands on the personalised /destinations
// page; everything else is the landing page.
const isGetStarted = window.location.pathname.startsWith('/get-started')
const isDestinations = window.location.pathname.startsWith('/destinations')

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

  if (isGetStarted) {
    return (
      <>
        <FluidBackground />
        {/* Lucid Line fixed low in the viewport on desktop, behind the onboarding panel */}
        <LucidWave shape="lift" draw="intro" className="fixed inset-x-0 bottom-0 -z-1 hidden h-[40vh] supports-[height:1svh]:h-[40svh] lg:block" />
        <LucidCorner className="fixed bottom-0 left-0 -z-1 hidden lg:block" />
        <Header />
        <GetStarted />
      </>
    )
  }

  if (isDestinations) {
    return (
      <>
        <FluidBackground />
        <Header />
        <DestinationsRoute />
        <Footer />
      </>
    )
  }

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
        <Testimonials />
        <Agents />
      </main>
      <Footer />
    </>
  )
}
