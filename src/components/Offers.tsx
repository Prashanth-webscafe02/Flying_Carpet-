import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { offers } from '../content'
import { Eyebrow, Reveal, SplitHeading, Tilt, ease } from '../effects/motion'

export default function Offers() {
  return (
    <section id="journeys" className="relative px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal><Eyebrow>Partner with us</Eyebrow></Reveal>
        <SplitHeading
          text="Everything your travel business needs, in one platform"
          className="max-w-4xl text-[clamp(2.2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.05em]"
        />

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Sell flights, hotels, transfers, car rentals and experiences from a single portal, on any device, even for last-minute bookings.
          </p>
        </Reveal>

        {/* All five categories: three cards, then two wide ones */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {offers.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 80, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1.1, delay: (i % 3) * 0.12, ease }}
              className={i < 3 ? 'lg:col-span-2' : i === 4 ? 'sm:col-span-2 lg:col-span-3' : 'lg:col-span-3'}
            >
              <Tilt className="rounded-[2rem]">
                <a href="#products" className={`group sheen relative block overflow-hidden rounded-[2rem] ${i < 3 ? 'aspect-[4/3] lg:aspect-[4/5]' : (i === 4 ? 'aspect-[4/3] sm:aspect-[21/9] lg:aspect-[16/9]' : 'aspect-[4/3] lg:aspect-[16/9]')}`}>
                  <img src={o.img} alt={o.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-transparent" />
                  <span className="glass absolute right-5 top-5 z-[2] grid size-11 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45 group-hover:bg-accent">
                    <ArrowUpRight className="size-5" />
                  </span>
                  <div className="glass-strong absolute inset-x-4 bottom-4 z-[2] flex items-end justify-between rounded-3xl px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-white/70">{o.title}</p>
                      <p className="text-[clamp(1.9rem,3vw,2.25rem)] font-semibold tracking-[-0.05em]">{o.stat}</p>
                    </div>
                    <p className="pb-1 text-sm font-semibold text-white/80">{o.unit}</p>
                  </div>
                </a>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
