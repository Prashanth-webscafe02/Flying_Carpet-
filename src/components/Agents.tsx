import { motion, useScroll, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { REGISTER_URL, external, whatsappLink } from '../config'
import { agentsImg } from '../content'
import { LucidWave } from '../effects/LucidLine'
import { Eyebrow, PillButton, Reveal, SplitHeading } from '../effects/motion'
import { words } from '../market'

// Moving strip (H10): our line and all five categories.
const strip = ['For everything last minute', 'Flights', 'Hotels', 'Experiences', 'Transfers', 'Car rentals']

// Register block (H9): headline, text and five points kept as the client reviewed them.
const reasons = [
  'Free to register: no fees, no minimum',
  'Your own markup on every category',
  'A login for every consultant, so anyone can take the urgent call',
  'White label site with your own branding',
  '24/7 help, on weekends and public holidays too',
]

// G6 prefilled message, naming the page the agent is on.
const chat = whatsappLink('Hi Flying Carpet, I have a question about registering.')

export default function Agents() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const radius = useTransform(scrollYProgress, [0, 0.4], ['6rem', '2.5rem'])
  const inset = useTransform(scrollYProgress, [0, 0.4], ['6%', '0%'])

  return (
    <section id="partners" ref={ref} className="relative px-4 py-16 md:px-8">
      <motion.div style={{ borderRadius: radius, marginInline: inset }} className="relative mx-auto max-w-7xl overflow-hidden">
        <motion.img
          style={{ y, scale: 1.3 }}
          src={agentsImg}
          alt="Open road through uncrowded high country at dusk"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-brand/60 via-brand/20 to-accent/30" />
        {/* Lucid Line over the photo, passing behind the card (stops above the marquee ribbon) */}
        <LucidWave shape="lift" className="absolute inset-x-0 top-0 bottom-15 hidden md:block" />

        <div className="relative grid min-h-160 items-center p-4 md:p-12">
          <div className="glass-strong max-w-2xl rounded-[2.5rem] p-7 md:p-12">
            <Eyebrow>For {words.agents}</Eyebrow>
            <SplitHeading
              text="Register free. Earn on every booking."
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-tighter"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 text-lg leading-relaxed text-white/80">
                Be ready before the next urgent request comes in. Register once and sell flights, hotels, transfers, car rentals and experiences, whenever your client needs them.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-6 space-y-2.5">
                {reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-white/85">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent">
                      <Check className="size-3" strokeWidth={3.5} />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.25} className="mt-8">
              <PillButton href={REGISTER_URL} target="_blank">Register free</PillButton>
              <p className="mt-4 text-white/80">
                Prefer to talk first?{' '}
                <a
                  href={chat}
                  {...external(chat)}
                  className="font-semibold text-white underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
                >
                  Chat with us on WhatsApp.
                </a>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Glass marquee ribbon */}
        <div className="glass relative overflow-hidden border-x-0 py-4">
          <div className="marquee flex w-max gap-10 whitespace-nowrap text-xl font-semibold tracking-tight">
            {[...strip, ...strip, ...strip, ...strip].map((r, i) => (
              <span key={i} className="flex items-center gap-10">
                {r} <span className="text-accent">✳</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
