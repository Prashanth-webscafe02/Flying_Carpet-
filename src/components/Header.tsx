import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { REGISTER_URL, nav } from "../content";
import { PillButton, ease } from "../effects/motion";

// Section anchors only exist on the landing page; elsewhere they point back to it.
const home = window.location.pathname === "/" ? "" : "/";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setScrolled(y > 40);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.5, ease }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 md:px-6 ${
          scrolled ? "glass-strong" : "border border-transparent"
        }`}
      >
        <a href={`${home}#top`} className="shrink-0">
          <img
            src="/brand/logo-primary.webp"
            alt="Flying Carpet Travel — For magical experiences"
            width={1400}
            height={416}
            className={`w-auto transition-[height] duration-500 ${scrolled ? "h-10 sm:h-11 lg:h-14" : "h-12 sm:h-14 md:h-16 xl:h-20"}`}
          />
        </a>

        <nav className="hidden lg:block" onPointerLeave={() => setActive(null)}>
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.label} className="relative">
                {active === n.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="glass absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <a
                  href={home + n.href}
                  onPointerEnter={() => setActive(n.label)}
                  className="relative block whitespace-nowrap px-3 py-2 text-sm font-semibold text-white/90 xl:px-4 transition-colors hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* One call to action everywhere: Sign Up. Login stays as a quieter link. */}
        <div className="ml-auto mr-3 flex items-center gap-4 lg:m-0">
          <a href={`${home}#`} className="hidden text-sm font-semibold text-white/85 transition-colors hover:text-white xl:inline">
            Login
          </a>
          <div className="hidden sm:block">
            <PillButton href={REGISTER_URL}>Sign Up</PillButton>
          </div>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="glass grid size-11 place-items-center rounded-full lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -16, scale: 0.96, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transitionEnd: { filter: "none" },
            }}
            exit={{ opacity: 0, y: -16, scale: 0.96, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease }}
            className="glass-strong mx-auto mt-3 max-w-7xl rounded-3xl p-3 lg:hidden"
          >
            {nav.map((n, i) => (
              <motion.a
                key={n.label}
                href={home + n.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.1 }}
                className="block rounded-2xl px-4 py-3 text-lg font-semibold hover:bg-white/10"
              >
                {n.label}
              </motion.a>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-white/10 px-1 pt-3">
              <a href={REGISTER_URL} className="flex-1 rounded-full bg-cream px-4 py-3 text-center font-bold text-ink">
                Sign Up
              </a>
              <a href={`${home}#`} onClick={() => setOpen(false)} className="rounded-full px-5 py-3 font-semibold ring-1 ring-white/20">
                Login
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
