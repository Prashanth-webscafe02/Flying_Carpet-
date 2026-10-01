import { motion } from 'framer-motion'
import { BarChart3, Clock, CreditCard, Globe2, Layers, Palette, Smartphone, UserRound, Users, Wallet, type LucideIcon } from 'lucide-react'
import { whyUs } from '../content'
import { Eyebrow, Reveal, SplitHeading, ease } from '../effects/motion'

// Same order as `whyUs` in content.ts.
const icons: LucideIcon[] = [Layers, Clock, Globe2, Smartphone, Palette, Wallet, CreditCard, Users, UserRound, BarChart3]

// "Why choose us" points from the client's B2B product sheet, plus the Wallet saving.
export default function WhyUs() {
  return (
    <section id="why-us" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow>Why choose us</Eyebrow></Reveal>
        <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <SplitHeading
            text="Built for travel agents, ready when your client is"
            className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-tighter"
          />
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-white/75">
              One login for flights, hotels, transfers, car rentals and experiences, with 24/7 help behind every booking.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => {
            const Icon = icons[i] ?? Layers
            return (
              <motion.li
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease }}
                className="glass sheen rounded-[1.75rem] p-6"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-accent/15 ring-1 ring-accent/30">
                  <Icon className="size-5 text-accent" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{w.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/70">{w.text}</p>
              </motion.li>
            )
          })}

          {/* Wallet saving: the one number agents act on, so it gets the solid card */}
          <motion.li
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="glass-orange rounded-[1.75rem] p-6 sm:col-span-2 lg:col-span-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/85">Pay smarter with Wallet</p>
            <p className="mt-3 text-[clamp(2.25rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.05em]">Save up to 3.5%</p>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/90">
              Pay with your Flying Carpet Wallet and skip gateway fees on hotel and transfer bookings and on selected flights.
            </p>
          </motion.li>
        </ul>
      </div>
    </section>
  )
}
