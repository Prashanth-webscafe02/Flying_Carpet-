import { motion, useScroll, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { useRef } from "react";
import { CONTACT_EMAIL, PRIVACY_URL, TERMS_URL, external } from "../config";
import { ChatLink } from "../destinations/ChatFab";
import { footerImg, nav } from "../content";
import { Reveal } from "../effects/motion";
import { LucidCorner, LucidWave } from "../effects/LucidLine";

// Section anchors only exist on the landing page; elsewhere they point back to it.
const home = window.location.pathname === "/" ? "" : "/";
// Footer links (H11): the menu without Contact, since this is the contact section.
const links = nav.filter((n) => n.href !== "#contact");

/**
 * Footer (H11), the same on every page. `compact` drops the tall photo gap above the card,
 * for the results, destination and listing pages.
 */
export default function Footer({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  return (
    <footer id="contact" ref={ref} className={`relative overflow-hidden ${compact ? "mt-8" : "mt-24"}`}>
      <motion.img
        style={{ y }}
        src={footerImg}
        alt="Sunlit mountain ridges above a still alpine lake"
        loading="lazy"
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-brand via-brand/30 to-brand/70" />
      {/* Lucid Line over the photo above the card, plus the corner sign off */}
      {!compact && <LucidWave shape="fall" className="absolute inset-x-0 top-0 h-48 md:h-72" />}
      <LucidCorner className="absolute bottom-0 left-0" />

      <div className={`relative mx-auto max-w-7xl px-4 pb-8 md:px-8 ${compact ? "pt-16 md:pt-20" : "pt-40 md:pt-60"}`}>
        {/* Sign off above the footer (G1, H11) */}
        <Reveal>
          <p className="mb-10 text-center text-[clamp(2rem,5.5vw,4.5rem)] font-bold leading-none tracking-[-0.045em] md:mb-14">
            For everything last minute.
          </p>
        </Reveal>

        <Reveal className="glass-strong rounded-[2.5rem] p-7 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:items-start md:gap-10">
            <a href={`${home}#top`} className="block">
              <img
                src="/brand/logo-primary.webp"
                alt="Flying Carpet"
                width={1400}
                height={416}
                loading="lazy"
                className="h-auto w-full max-w-[18rem] sm:max-w-88 md:max-w-104"
              />
            </a>
            <nav aria-label="Footer">
              <ul className="flex flex-col gap-3 text-lg font-semibold">
                {links.map((n) => (
                  <li key={n.label}>
                    <a href={home + n.href} className="transition-colors hover:text-accent">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col items-start gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Contact</p>
              <ChatLink className="glass flex items-center gap-3 rounded-full px-4 py-2.5 font-semibold transition-colors hover:bg-white/20">
                <span aria-hidden className="size-2 rounded-full bg-[#25d366]" />
                Chat with us on WhatsApp
              </ChatLink>
              {/* The footer email shows only once the client sends it (src/config.ts). */}
              {CONTACT_EMAIL && (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="glass flex items-center gap-3 rounded-full px-4 py-2.5 transition-colors hover:bg-white/20"
                >
                  <Mail className="size-4 text-accent" /> {CONTACT_EMAIL}
                </a>
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Flying Carpet. All rights reserved.</p>
            <div className="flex gap-6">
              <a href={TERMS_URL} {...external(TERMS_URL)} className="hover:text-white">
                Terms and Conditions
              </a>
              <a href={PRIVACY_URL} {...external(PRIVACY_URL)} className="hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
        </Reveal>

        <motion.p
          style={{ y: wordY }}
          aria-hidden
          className="pointer-events-none mt-6 select-none text-center text-[clamp(2.5rem,11vw,10rem)] font-semibold leading-none tracking-[-0.07em] text-white/15"
        >
          Flying Carpet
        </motion.p>
      </div>
    </footer>
  );
}
