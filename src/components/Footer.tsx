import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { useRef } from 'react'
import { footerImg } from '../content'
import { Reveal } from '../effects/motion'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '0%'])
  const wordY = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])

  return (
    <footer id="contact" ref={ref} className="relative mt-24 overflow-hidden">
      <motion.img
        style={{ y }}
        src={footerImg}
        alt="Sunlit mountain ridges above a still alpine lake"
        loading="lazy"
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand via-brand/30 to-brand/70" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-48 md:px-8 md:pt-72">
        <Reveal className="glass-strong rounded-[2.5rem] p-7 md:p-12">
          {/* Columns are vertically centred, and the links use the same row height and gap as the
              contact pills, so "+ Partners" lines up with the phone row and "+ Contacts" with email. */}
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
            <a href="#top" className="block">
              <img src="/brand/logo-primary.webp" alt="Flying Carpet Travel — For magical experiences" width={1400} height={416} loading="lazy" className="h-auto w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem]" />
            </a>
            <div className="flex flex-col gap-3 text-lg font-semibold md:items-center">
              <a href="#partners" className="flex h-11.5 items-center leading-6 transition-colors hover:text-accent">+ Partners</a>
              <a href="#contact" className="flex h-11.5 items-center leading-6 transition-colors hover:text-accent">+ Contacts</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="tel:+1012345678" className="glass flex items-center gap-3 rounded-full px-4 py-2.5 transition-colors hover:bg-white/20">
                <Phone className="size-4 text-accent" /> +1 012 345 678
              </a>
              <a href="mailto:hello@flyingcarpet.travel" className="glass flex items-center gap-3 rounded-full px-4 py-2.5 transition-colors hover:bg-white/20">
                <Mail className="size-4 text-accent" /> hello@flyingcarpet.travel
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <p>© All rights reserved. Flying Carpet Travel, 2026</p>
            <div className="flex gap-6">
              <a href="#top" className="hover:text-white">Terms and Conditions</a>
              <a href="#top" className="hover:text-white">Privacy Policy</a>
            </div>
          </div>
        </Reveal>

        <motion.p
          style={{ y: wordY }}
          aria-hidden
          className="pointer-events-none mt-6 select-none text-center text-[clamp(2.5rem,11vw,10rem)] font-semibold leading-none tracking-[-0.07em] text-white/15"
        >
          FlyingCarpet.Travel
        </motion.p>
      </div>
    </footer>
  )
}
