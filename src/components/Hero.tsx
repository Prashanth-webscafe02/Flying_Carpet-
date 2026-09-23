import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { PillButton, ease } from '../effects/motion'

// Layered hero, like the original: sky layer → giant "Unlock" → foreground landscape cut-out.
// Each layer moves at its own depth on scroll and pointer for a parallax, "window" feel.
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 20 })
  const smy = useSpring(my, { stiffness: 60, damping: 20 })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '90%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  const bgX = useTransform(smx, (v) => v * -12)
  const bgMY = useTransform(smy, (v) => v * -8)
  const textX = useTransform(smx, (v) => v * 18)
  const fgX = useTransform(smx, (v) => v * 30)

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5)
        my.set(e.clientY / window.innerHeight - 0.5)
      }}
      className="relative h-[100svh] min-h-[640px] overflow-hidden"
    >
      {/* Sky */}
      <motion.div style={{ y: bgY, scale: bgScale, x: bgX, translateY: bgMY }} className="absolute inset-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/banner-bottom-mobile.webp" />
          <motion.img
            src="/banner-bottom.webp"
            alt=""
            initial={{ scale: 1.2, filter: 'blur(20px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease }}
            className="h-full w-full object-cover"
          />
        </picture>
      </motion.div>

      {/* Headline sits between sky and foreground */}
      <motion.div style={{ y: textY, opacity: textOpacity, x: textX }} className="absolute inset-x-0 top-[16%] z-[2] flex justify-center md:top-[9%]">
        <h1 className="flex overflow-hidden text-[clamp(4.5rem,min(22vw,32vh),15rem)] font-semibold leading-none tracking-[-0.07em] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.28)]">
          {'Unlock'.split('').map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.07, ease }}
              className="inline-block"
            >
              {c}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Foreground landscape */}
      <motion.div style={{ y: fgY, x: fgX }} className="pointer-events-none absolute inset-x-[-3%] bottom-0 z-[3]">
        <picture>
          <source media="(max-width: 767px)" srcSet="/banner-top-mobile.webp" />
          <motion.img
            src="/banner-top.webp"
            alt="Yurt camp on golden grassland with a horse grazing, snow mountains beyond"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease }}
            className="w-full object-cover object-bottom"
          />
        </picture>
      </motion.div>

      {/* Bottom fade into the fluid page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-40 bg-gradient-to-t from-brand/80 to-transparent" />

      {/* Glass info card */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 1, ease }}
        className="glass-strong absolute bottom-8 left-4 right-4 z-[5] rounded-[2rem] p-6 md:bottom-14 md:left-10 md:right-auto md:max-w-md md:p-7"
      >
        <p className="mb-5 text-[clamp(1.125rem,1.65vw,1.6rem)] font-semibold leading-[1.3] tracking-[-0.03em]">
          Exclusive inventory, Higher commissions, and Seamless technology
        </p>
        <PillButton href="#journeys">Get Agency Access</PillButton>
      </motion.div>

      <motion.a
        href="#journeys"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="glass absolute bottom-14 right-10 z-[5] hidden items-center gap-3 rounded-full py-2 pl-5 pr-2 text-sm font-semibold md:flex"
      >
        Explore journeys
        <span className="grid size-8 place-items-center rounded-full bg-white/15">
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown className="size-4" />
          </motion.span>
        </span>
      </motion.a>
    </section>
  )
}
