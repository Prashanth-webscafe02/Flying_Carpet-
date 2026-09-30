import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Car,
  CarFront,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Plane,
  Sparkles,
  Star,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { LucidCorner, LucidWave } from "../effects/LucidLine";
import { ease } from "../effects/motion";
import { loadAnswers } from "../get-started/answers";
import { steps } from "../get-started/steps";
import ChatFab from "./ChatFab";
import { productsOf, whatsapp, type Destination, type ProductId } from "./data";
import {
  categoryLabel,
  details,
  hotelImages,
  images,
  origins,
  type Detail,
  type HotelCategory,
} from "./details";
import { mobility } from "./mobility";
import { CarRentalInfo, TransfersInfo } from "./MobilityViews";
import ProductInfoPanel from "./ProductInfoPanel";
import { linkTo, slug } from "./navigate";
import { flightOptionsEnabled, isOpen, tabs, type Tab } from "./tabs";

const big = (src: string) => src.replace("w=900", "w=1800");
const nameOf = (d: Destination) =>
  d.city === d.country ? d.city : `${d.city}, ${d.country}`;

// One destination: banner, product tabs (no separate "overview" tab: the page itself is the
// overview), and a view per tab. Tabs switch in place and keep the URL in sync.
export default function DestinationDetail({
  d,
  initialTab,
}: {
  d: Destination;
  initialTab: Tab | null;
}) {
  const info = details[d.id];
  const [{ answers }] = useState(loadAnswers);
  const [tab, setTab] = useState<Tab | null>(initialTab);
  const tabsRef = useRef<HTMLDivElement>(null);
  const name = nameOf(d);

  useEffect(() => {
    const t = tab ? tabs.find((x) => x.id === tab)!.label : null;
    document.title = `${t ? `${t} · ` : ""}${d.city} — Flying Carpet`;
  }, [tab, d.city]);

  useEffect(() => {
    const onPop = () => {
      const t = window.location.pathname.split("/")[3];
      setTab(isOpen(t) ? t : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = (t: Tab | null) => {
    if (t === tab) return;
    setTab(t);
    window.history.pushState(
      null,
      "",
      `/destinations/${d.id}${t ? `/${t}` : ""}`,
    );
    // Bring the tab bar into view if the reader has scrolled past it.
    const top =
      (tabsRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 96;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  };

  const enquire = (what: string) =>
    whatsapp(`Hi! I'd like ${what} in ${name} for my clients.`);
  const origin = origins[answers.market[0]];
  const marketTitle = steps[0].choices
    .find((c) => c.id === answers.market[0])
    ?.title.trim();

  return (
    <>
      <main>
        {/* Banner */}
        <section className="relative overflow-hidden">
          <motion.img
            src={big(d.img)}
            alt=""
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/80 to-brand/25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand/80 to-transparent" />
          <LucidWave
            shape="lift"
            draw="intro"
            className="absolute inset-x-0 bottom-16 top-1/2 hidden md:block"
          />

          <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:pt-36 md:px-8 md:pb-28 md:pt-40">
            <div className="mb-8 flex items-center justify-between gap-4">
              <a
                href="/destinations"
                className="-my-2 inline-flex items-center gap-2 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                <ArrowLeft className="size-4" /> All destinations
              </a>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease }}
              className="max-w-3xl"
            >
              <h1 className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.05em]">
                {name}
              </h1>
              <p className="mt-3 bg-gradient-to-r from-[#ffb68c] to-accent bg-clip-text text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold tracking-[-0.03em] text-transparent">
                {info.subtitle}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                {info.intro}
              </p>
            </motion.div>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {[
                {
                  icon: Plane,
                  text: `${info.airlines.length} airlines into ${info.airport}`,
                },
                { icon: BedDouble, text: "Hotels from luxury to value" },
                { icon: Sparkles, text: "Unforgettable experiences" },
                ...(d.products.includes("transfers")
                  ? [{ icon: CarFront, text: "Seamless transfers" }]
                  : []),
                ...(d.products.includes("car-rentals")
                  ? [{ icon: Car, text: "Self-drive car rentals" }]
                  : []),
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-white/85"
                >
                  <Icon className="size-4 text-accent" /> {text}
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Tabs */}
        <div
          ref={tabsRef}
          className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 md:px-8"
        >
          <div className="glass-strong flex items-center gap-2 rounded-full p-1.5">
            <LayoutGroup id="detail-tabs">
              <nav
                aria-label={`${d.city} sections`}
                className="flex min-w-0 flex-1 gap-1 overflow-x-auto [mask-image:linear-gradient(to_right,#000_85%,transparent)] [scrollbar-width:none] lg:[mask-image:none] [&::-webkit-scrollbar]:hidden"
              >
                {tabs.map((t) => {
                  const on = tab === t.id;
                  if (t.disabled) {
                    return (
                      <span
                        key={t.id}
                        aria-disabled="true"
                        title="Coming soon"
                        className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white/35"
                      >
                        <t.icon className="size-4" />
                        {t.label}
                        {/* <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-white/55">Soon</span> */}
                      </span>
                    );
                  }
                  return (
                    <a
                      key={t.id}
                      href={`/destinations/${d.id}/${t.id}`}
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                        e.preventDefault();
                        go(t.id);
                      }}
                      aria-current={on ? "page" : undefined}
                      className={`relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${on ? "text-white" : "text-white/70 hover:text-white"}`}
                    >
                      {on && (
                        <motion.span
                          layoutId="detail-tab"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-full bg-accent"
                        />
                      )}
                      <t.icon className="relative size-4" />
                      <span className="relative">{t.label}</span>
                    </a>
                  );
                })}
              </nav>
            </LayoutGroup>
            <a
              href={enquire("to plan a trip")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-ink transition-transform duration-300 hover:scale-[1.03] lg:inline-flex"
            >
              Enquire about {d.city}
            </a>
          </div>
        </div>

        <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-12 md:px-8 md:pt-14">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab ?? "overview"}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
            >
              {tab === null && (
                <Overview
                  d={d}
                  info={info}
                  mySpecialise={answers.specialise}
                  onTab={go}
                  enquire={enquire}
                />
              )}
              {tab === "flights" && (
                <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.7fr)] lg:gap-12">
                  <Flights
                    d={d}
                    info={info}
                    origin={origin}
                    onBack={() => go(null)}
                    enquire={enquire}
                  />
                  <ProductInfoPanel product="flights" />
                </div>
              )}
              {tab === "hotels" && (
                <Hotels
                  d={d}
                  info={info}
                  myHotels={answers.hotels}
                  market={marketTitle}
                  onBack={() => go(null)}
                  enquire={enquire}
                />
              )}
              {tab === "experiences" && (
                <Experiences d={d} info={info} onBack={() => go(null)} />
              )}
              {tab === "transfers" && (
                <TransfersInfo
                  d={d}
                  info={info}
                  onBack={() => go(null)}
                  enquire={enquire}
                />
              )}
              {tab === "car-rentals" && (
                <CarRentalInfo
                  d={d}
                  info={info}
                  onBack={() => go(null)}
                  enquire={enquire}
                />
              )}
              {/* Travel Guide is switched off with its view below; restore this line with it. */}
              {/* {tab === 'travel-guide' && <Guide d={d} info={info} onBack={() => go(null)} onTab={go} />} */}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
      <ChatFab text={`Hi! I have a question about ${name}.`} />
    </>
  );
}

/* ---------- shared bits ---------- */

type Enquire = (what: string) => string;

function ViewHead({
  d,
  title,
  sub,
  onBack,
}: {
  d: Destination;
  title: string;
  sub: string;
  onBack: () => void;
}) {
  return (
    <div className="mb-8">
      <button
        type="button"
        onClick={onBack}
        className="-mt-2 mb-1 inline-flex items-center gap-2 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" /> Back to {d.city}
      </button>
      <h2 className="text-[clamp(1.8rem,3.2vw,2.75rem)] font-semibold leading-tight tracking-[-0.045em]">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-white/65">{sub}</p>
    </div>
  );
}

// `stretch`: the link's ::after covers its whole card (the card needs `relative`), so clicking
// anywhere on the card does what the button does. No filter/transform on the link itself:
// either would shrink the ::after back to the button.
const stretched =
  "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']";

function Cta({
  href,
  children,
  variant = "accent",
  stretch = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "accent" | "ghost";
  stretch?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/cta inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full py-2 pl-4 pr-2 text-sm font-semibold transition ${variant === "accent" ? `bg-accent shadow-[0_10px_30px_-10px_rgb(232_101_37/0.9)] hover:bg-[#f0763a] ${stretch ? "group-hover:bg-[#f0763a]" : ""}` : "glass hover:bg-white/15"} ${stretch ? stretched : ""}`}
    >
      {children}
      <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover/cta:translate-x-0.5">
        <ArrowRight className="size-3.5" />
      </span>
    </a>
  );
}

function Chip({ children, on = false }: { children: ReactNode; on?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${on ? "bg-accent/20 text-white ring-1 ring-accent/50" : "bg-white/[0.07] text-white/70"}`}
    >
      {children}
    </span>
  );
}

function HelpCard({
  title,
  text,
  href,
}: {
  title: string;
  text?: string;
  href: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#1d1a63] to-brand p-6 ring-1 ring-white/15">
      <LucidCorner className="absolute -bottom-2 -right-6 rotate-180 opacity-60" />
      <p className="text-lg font-semibold leading-snug tracking-tight">
        {title}
      </p>
      {text && (
        <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-bold text-ink transition-transform duration-300 hover:scale-[1.03]"
      >
        <MessageCircle className="size-4 text-accent" /> Chat on WhatsApp
      </a>
    </div>
  );
}

function WhyCard({
  title,
  points,
  children,
}: {
  title: string;
  points: string[];
  children?: ReactNode;
}) {
  return (
    <div className="glass rounded-[1.75rem] p-6">
      <p className="text-lg font-semibold leading-snug tracking-tight">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {points.map((p) => (
          <li
            key={p}
            className="flex gap-2.5 text-sm leading-snug text-white/75"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-accent" /> {p}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

const toggleIn = (list: string[], v: string) =>
  list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

function CategoryChip({
  label,
  count,
  on,
  mine = false,
  onClick,
}: {
  label: string;
  count: number;
  on: boolean;
  mine?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${on ? "border-accent bg-accent text-white" : "border-white/15 bg-white/[0.06] text-white/75 hover:border-white/30 hover:text-white"}`}
    >
      {label}
      {mine && !on && (
        <span
          title="One of your hotel categories"
          className="size-1.5 rounded-full bg-accent"
        />
      )}
      <span
        className={`text-xs tabular-nums ${on ? "text-white/85" : "text-white/45"}`}
      >
        {count}
      </span>
    </button>
  );
}

/* ---------- overview ---------- */

const productCopy = (
  d: Destination,
  info: Detail,
): Record<
  ProductId,
  {
    title: string;
    text: string;
    img: string;
    icon: LucideIcon;
    chips: string[];
  }
> => ({
  flights: {
    title: "Flights",
    text: `Wide connectivity with top airlines to ${d.city}`,
    img: images.flights,
    icon: Plane,
    chips: info.airlines.map((a) => a.name),
  },
  hotels: {
    title: "Hotels",
    text: `From iconic luxury to great-value stays`,
    img: images.hotels,
    icon: BedDouble,
    chips: [...new Set(info.hotels.map((h) => categoryLabel[h.category]))],
  },
  experiences: {
    title: "Experiences",
    text: `Tours, attractions and unforgettable moments`,
    img: images.experiences,
    icon: Ticket,
    chips: info.experiences.map((e) => e.tags[0]),
  },
  transfers: {
    title: "Transfers",
    text:
      info.transferMode === "sea"
        ? "Speedboat and seaplane transfers to your resort"
        : "Reliable airport and local transfers",
    img: images.transfers,
    icon: CarFront,
    chips: mobility[d.id].vehicles,
  },
  "car-rentals": {
    title: "Car rentals",
    text: `Self-drive cars to explore ${d.city} at your clients’ own pace`,
    img: images.chauffeur,
    icon: Car,
    chips: mobility[d.id].carTypes,
  },
});

function Overview({
  d,
  info,
  mySpecialise,
  onTab,
  enquire,
}: {
  d: Destination;
  info: Detail;
  mySpecialise: string[];
  onTab: (t: Tab) => void;
  enquire: Enquire;
}) {
  const copy = productCopy(d, info);
  // Always the site-wide order (flights, hotels, experiences, transfers, car rentals); the
  // agent's own products are marked "You sell this" rather than moved.
  const featured = productsOf(d);
  // const guide = guideCards(d, info) // feeds "More to inspire your clients" below; restore with that block

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_19rem]">
      <div className="min-w-0 space-y-14">
        <div>
          <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">
            Featured for you in {d.city}
          </h2>
          <p className="mt-1 text-white/60">
            {mySpecialise.length
              ? "A curated selection based on your preferences."
              : `Everything you can offer your clients in ${d.city}.`}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featured.map((p, i) => {
              const c = copy[p];
              const mine = mySpecialise.includes(p);
              // An odd card out on the last row spans both columns, laid out side by side.
              const wide =
                featured.length % 2 === 1 && i === featured.length - 1;
              return (
                <motion.article
                  key={p}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease }}
                  className={`group glass-solid relative flex flex-col overflow-hidden rounded-[1.5rem] ${isOpen(p) ? "cursor-pointer ring-white/25 transition-shadow hover:ring-1" : ""} ${wide ? "sm:col-span-2 sm:flex-row" : ""} ${mine ? "ring-1 ring-accent/60" : ""}`}
                >
                  <div
                    className={`relative h-44 shrink-0 overflow-hidden ${wide ? "sm:h-auto sm:min-h-44 sm:w-1/2" : ""}`}
                  >
                    <img
                      src={c.img}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    {mine && (
                      <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em]">
                        You sell this
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-accent ring-1 ring-white/15">
                        <c.icon className="size-4.5" />
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {c.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm leading-snug text-white/65">
                      {c.text}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.chips.slice(0, 3).map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                      {c.chips.length > 3 && <Chip>+{c.chips.length - 3}</Chip>}
                    </div>
                    {isOpen(p) ? (
                      <button
                        type="button"
                        onClick={() => onTab(p)}
                        className={`mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent transition-[gap] hover:gap-2.5 group-hover:gap-2.5 ${stretched}`}
                      >
                        Explore {c.title.toLowerCase()}{" "}
                        <ArrowRight className="size-4" />
                      </button>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="mt-auto cursor-not-allowed pt-4 text-sm font-semibold text-white/35"
                      >
                        Coming soon
                      </span>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Journeys prompt */}
        {/* <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-white/15">
          <img src={big(d.img)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/75 to-brand/20" />
          <LucidWave shape="rise" className="absolute inset-0 hidden sm:block" />
          <div className="relative max-w-lg p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">More than a destination</p>
            <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.04em]">Create complete journeys for every traveller</h3>
            <p className="mt-3 text-white/75">Combine flights, hotels, experiences, transfers and car rentals to unlock more opportunities and deliver unforgettable trips.</p>
            <div className="mt-6">
              <Cta href={enquire('a suggested package')}>Get a suggested package</Cta>
            </div>
          </div>
        </div> */}

        {/* <div>
          <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em]">More to inspire your clients</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {guide.map((g) => (
              <button key={g.title} type="button" disabled={!isOpen('travel-guide')} onClick={() => onTab('travel-guide')} className="group text-left disabled:cursor-default">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] ring-1 ring-white/10">
                  <img src={g.img} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                </div>
                <p className="mt-3 font-semibold tracking-tight">{g.title}</p>
                <p className="text-sm leading-snug text-white/60">{g.text}</p>
              </button>
            ))}
          </div>
        </div> */}
      </div>

      <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <WhyCard
          title={`Why ${d.city} with Flying Carpet?`}
          points={[
            "Wide range of products in one place",
            "Trusted global suppliers",
            "Dedicated agent support",
            "Ideal for leisure, business and group travel",
          ]}
        >
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nameOf(d))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] py-6 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
          >
            <MapPin className="size-4 text-accent" /> View on map
          </a>
        </WhyCard>
        <HelpCard
          title="Need help planning a trip for your client?"
          text="Our destination specialists are here to help."
          href={enquire("help planning a trip")}
        />
      </div>
    </div>
  );
}

/* ---------- flights ---------- */

function Flights({
  d,
  info,
  origin,
  onBack,
  enquire,
}: {
  d: Destination;
  info: Detail;
  origin?: { city: string; code: string };
  onBack: () => void;
  enquire: Enquire;
}) {
  const [sort, setSort] = useState<"recommended" | "az">("recommended");
  const list = useMemo(() => {
    const l = info.airlines.map((a, i) => ({ ...a, i }));
    return sort === "az"
      ? [...l].sort((a, b) => a.name.localeCompare(b.name))
      : l;
  }, [info, sort]);
  const from = origin ? `${origin.city} (${origin.code})` : "Your city";

  return (
    <>
      <ViewHead
        d={d}
        onBack={onBack}
        title={`Flights to ${d.city}`}
        sub={`Access a wide range of airlines, routes and flexible options to get your clients to ${d.city} and beyond.`}
      />
      <div className="grid gap-6">
        <div className="min-w-0">
          <ResultsBar
            count={list.length}
            noun="airline"
            note={`${from} → ${d.city} (${info.airport}) · fares confirmed by our team`}
            sorts={[
              ["recommended", "Recommended"],
              ["az", "A–Z"],
            ]}
            sort={sort}
            onSort={(s) => setSort(s as typeof sort)}
          />
          <motion.div layout className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((a) => (
                <motion.article
                  key={a.name}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease }}
                  className={`glass-solid rounded-[1.5rem] p-5 ${a.i === 0 ? "ring-1 ring-accent/60" : ""}`}
                >
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    <div className="w-full min-w-0 sm:w-40">
                      {a.i === 0 && (
                        <span className="mb-1.5 inline-block rounded-full bg-accent px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.08em]">
                          Recommended
                        </span>
                      )}
                      <p className="text-lg font-semibold tracking-tight">
                        {a.name}
                      </p>
                    </div>
                    <div className="flex min-w-[14rem] flex-1 items-center gap-3">
                      <span className="text-lg font-semibold tabular-nums">
                        {origin?.code ?? "ANY"}
                      </span>
                      <div className="relative flex-1 text-center">
                        <div className="h-px bg-white/25" />
                        <Plane className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 bg-transparent text-accent" />
                        <p className="mt-3 text-xs text-white/60">
                          {a.via
                            ? `1 stop · ${a.via}`
                            : "Direct & network routes"}
                        </p>
                      </div>
                      <span className="text-lg font-semibold tabular-nums">
                        {info.airport}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 sm:ml-auto">
                      <div className="text-right">
                        <p className="text-xs text-white/50">Fares</p>
                        <p className="text-sm font-semibold">Agent rates</p>
                      </div>
                      {flightOptionsEnabled ? (
                        <Cta
                          href={enquire(
                            `${a.name} flight options${origin ? ` from ${origin.city}` : ""}`,
                          )}
                        >
                          View options
                        </Cta>
                      ) : (
                        <span
                          aria-disabled="true"
                          title="Coming soon"
                          className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 whitespace-nowrap rounded-full bg-white/10 py-2 pl-4 pr-2 text-sm font-semibold text-white/40"
                        >
                          View options
                          <span className="grid size-6 place-items-center rounded-full bg-white/10">
                            <ArrowRight className="size-3.5" />
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                    {[
                      "Baggage options",
                      "In-flight meals",
                      "Flexible fares",
                    ].map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <WhyCard
            title="Why book flights with Flying Carpet?"
            points={[
              "Wide choice of global airlines",
              "Competitive fares and flexible options",
              "Easy add-ons with hotels, experiences, transfers and car rentals",
              "Dedicated agent support",
            ]}
          />
          <HelpCard
            title="Need help finding the right flight?"
            href={enquire("help finding the right flight")}
          />
        </div>
      </div>
    </>
  );
}

function ResultsBar({
  count,
  noun,
  note,
  sorts,
  sort,
  onSort,
}: {
  count: number;
  noun: string;
  note: string;
  sorts?: [string, string][];
  sort?: string;
  onSort?: (s: string) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-lg font-semibold tracking-tight">
          {count} {noun}
          {count === 1 ? "" : "s"} found
        </p>
        <p className="text-sm text-white/55">{note}</p>
      </div>
      {sorts && (
        <LayoutGroup id={`sort-${noun}`}>
          <div
            role="radiogroup"
            aria-label="Sort by"
            className="glass flex rounded-full p-1"
          >
            {sorts.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={sort === id}
                onClick={() => onSort?.(id)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${sort === id ? "text-white" : "text-white/60 hover:text-white"}`}
              >
                {sort === id && (
                  <motion.span
                    layoutId={`sort-pill-${noun}`}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-accent"
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      )}
    </div>
  );
}

/* ---------- hotels ---------- */

function Hotels({
  d,
  info,
  myHotels,
  market,
  onBack,
  enquire,
}: {
  d: Destination;
  info: Detail;
  myHotels: string[];
  market?: string;
  onBack: () => void;
  enquire: Enquire;
}) {
  const [cats, setCats] = useState<string[]>([]);
  const available = (Object.keys(categoryLabel) as HotelCategory[]).filter(
    (c) => info.hotels.some((h) => h.category === c),
  );
  const list = useMemo(() => {
    const l = info.hotels
      .map((h, i) => ({ ...h, i }))
      .filter((h) => !cats.length || cats.includes(h.category));
    // The agent's hotel categories first, then editorial order.
    return [...l].sort(
      (a, b) =>
        Number(myHotels.includes(b.category)) -
          Number(myHotels.includes(a.category)) || a.i - b.i,
    );
  }, [info, cats, myHotels]);
  const hotelUrl = (name: string) =>
    `/destinations/${d.id}/hotels/${slug(name)}`;

  return (
    <>
      <ViewHead
        d={d}
        onBack={onBack}
        title={`Hotels in ${d.city}`}
        sub={`From world-renowned luxury to stylish, great-value stays, find the perfect hotel for your clients in ${d.city}.`}
      />
      {/* Hotel category filter */}
      <div
        role="group"
        aria-label="Hotel category"
        className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <CategoryChip
          label="All hotels"
          count={info.hotels.length}
          on={!cats.length}
          onClick={() => setCats([])}
        />
        {available.map((c) => (
          <CategoryChip
            key={c}
            label={categoryLabel[c]}
            count={info.hotels.filter((h) => h.category === c).length}
            on={cats.includes(c)}
            mine={myHotels.includes(c)}
            onClick={() => setCats(toggleIn(cats, c))}
          />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
          <ResultsBar
            count={list.length}
            noun="hotel"
            note={
              market
                ? `Curated for agents selling ${market}`
                : `Curated for agents · ${d.city}`
            }
          />
          <motion.div layout className="space-y-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((h) => (
                <motion.article
                  key={h.name}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease }}
                  className="group glass-solid relative flex cursor-pointer flex-col overflow-hidden rounded-[1.5rem] ring-white/25 transition-shadow hover:ring-1 sm:flex-row"
                >
                  <a
                    href={hotelUrl(h.name)}
                    onClick={linkTo(hotelUrl(h.name))}
                    aria-label={h.name}
                    className="relative block aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-56"
                  >
                    <img
                      src={hotelImages[h.i % hotelImages.length]}
                      alt={h.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    {h.tag && (
                      <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em]">
                        {h.tag}
                      </span>
                    )}
                  </a>
                  <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 md:flex-row">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-lg font-semibold tracking-tight">
                          <a
                            href={hotelUrl(h.name)}
                            onClick={linkTo(hotelUrl(h.name))}
                            className="transition-colors hover:text-accent"
                          >
                            {h.name}
                          </a>
                        </h3>
                        <span
                          className="flex gap-0.5"
                          aria-label={`${h.stars} star`}
                        >
                          {Array.from({ length: h.stars }, (_, i) => (
                            <Star
                              key={i}
                              className="size-3.5 fill-accent text-accent"
                            />
                          ))}
                        </span>
                      </div>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-white/55">
                        <MapPin className="size-3.5" /> {h.area}, {d.city}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">
                        {h.text}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {h.amenities.map((a) => (
                          <Chip key={a}>{a}</Chip>
                        ))}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 pt-4 md:w-44 md:flex-col md:items-end md:justify-between md:border-l md:border-t-0 md:pl-5 md:pt-0">
                      <Chip on={myHotels.includes(h.category)}>
                        {categoryLabel[h.category]}
                      </Chip>
                      <div className="md:text-right">
                        <p className="text-xs text-white/50">From</p>
                        <p className="text-sm font-semibold leading-tight">
                          Special agent rates
                        </p>
                      </div>
                      <a
                        href={hotelUrl(h.name)}
                        onClick={linkTo(hotelUrl(h.name))}
                        className={`group/cta inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-accent py-2 pl-4 pr-2 text-sm font-semibold shadow-[0_10px_30px_-10px_rgb(232_101_37/0.9)] transition hover:bg-[#f0763a] group-hover:bg-[#f0763a] ${stretched}`}
                      >
                        View hotel
                        <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover/cta:translate-x-0.5">
                          <ArrowRight className="size-3.5" />
                        </span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <WhyCard
            title="Why book hotels with Flying Carpet?"
            points={[
              "Global hotel supply and exclusive deals",
              "Trusted partners worldwide",
              "Wide range from budget to luxury",
              "Easy add-ons with flights, experiences, transfers and car rentals",
            ]}
          />
          <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/15">
            <img
              src={images.wing}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-32 w-full object-cover"
            />
            <div className="glass-solid p-5">
              <p className="font-semibold tracking-tight">
                Turn stays into bigger journeys.
              </p>
              <a
                href={enquire("a package with flights and hotels")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                Explore packages <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
          <HelpCard
            title="Need help finding the right hotel?"
            href={enquire("help finding the right hotel")}
          />
        </div>
      </div>
    </>
  );
}

/* ---------- experiences ---------- */

function Experiences({
  d,
  info,
  onBack,
}: {
  d: Destination;
  info: Detail;
  onBack: () => void;
}) {
  const pool = [d.img, images.experiences, images.outdoors];
  return (
    <>
      <ViewHead
        d={d}
        onBack={onBack}
        title={`Experiences in ${d.city}`}
        sub="Tours, attractions and unforgettable moments you can add to any itinerary."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {info.experiences.map((e, i) => (
          <motion.article
            key={e.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease }}
            className="group glass-solid relative flex cursor-pointer flex-col overflow-hidden rounded-[1.5rem] ring-white/25 transition-shadow hover:ring-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={e.img ?? pool[i % pool.length]}
                alt={e.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold leading-snug tracking-tight">
                {e.title}
              </h3>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/55">
                <MapPin className="size-3.5" /> {e.place}{" "}
                <span className="text-white/30">·</span>{" "}
                <Clock className="size-3.5" /> {e.duration}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {e.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <div className="mt-auto pt-5">
                <a
                  href={`/destinations/${d.id}/experiences/${slug(e.title)}`}
                  onClick={linkTo(
                    `/destinations/${d.id}/experiences/${slug(e.title)}`,
                  )}
                  className={`group/cta inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-accent py-2 pl-4 pr-2 text-sm font-semibold shadow-[0_10px_30px_-10px_rgb(232_101_37/0.9)] transition hover:bg-[#f0763a] group-hover:bg-[#f0763a] ${stretched}`}
                >
                  View details
                  <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover/cta:translate-x-0.5">
                    <ArrowRight className="size-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}

/* ---------- travel guide ---------- */

// function guideCards(d: Destination, info: Detail) {
//   return [
//     { title: `Top things to do in ${d.city}`, text: info.experiences.slice(0, 2).map((e) => e.title).join(', '), img: big(d.img).replace('w=1800', 'w=800') },
//     { title: 'Where to stay', text: info.areas.slice(0, 3).join(', '), img: hotelImages[1] },
//     { title: 'Perfect for every traveller', text: 'Families, couples, solo and groups', img: images.outdoors },
//     { title: 'Plan the best time to visit', text: info.bestTime, img: images.wing },
//   ]
// }

// function Guide({ d, info, onBack, onTab }: { d: Destination; info: Detail; onBack: () => void; onTab: (t: Tab) => void }) {
//   const points = [
//     `Best time to visit: ${info.bestTime}`,
//     `Fly into ${info.airportName} (${info.airport}), with ${info.airlines.length} airline options.`,
//     `Popular areas to stay: ${info.areas.join(', ')}.`,
//     `Client favourites: ${info.experiences.map((e) => e.title).join(', ')}.`,
//   ]
//   return (
//     <>
//       <ViewHead d={d} onBack={onBack} title={`${d.city} travel guide`} sub="Talking points, seasonal tips and inspiration to help you sell with confidence." />
//       <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
//         <div className="min-w-0">
//           <p className="max-w-2xl text-lg leading-relaxed text-white/80">{info.intro}</p>
//           <div className="mt-8 grid gap-4 sm:grid-cols-2">
//             {guideCards(d, info).map((g, i) => (
//               <motion.div key={g.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease }} className="glass-solid overflow-hidden rounded-[1.5rem]">
//                 <img src={g.img} alt="" loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
//                 <div className="p-5">
//                   <p className="font-semibold tracking-tight">{g.title}</p>
//                   <p className="mt-1 text-sm leading-snug text-white/65">{g.text}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//         <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
//           <WhyCard title="Talking points for your clients" points={points} />
//           <div className="glass rounded-[1.75rem] p-6">
//             <p className="font-semibold tracking-tight">Ready to build the trip?</p>
//             <div className="mt-4 flex flex-wrap gap-2">
//               {tabs.filter((t) => t.id !== 'travel-guide' && !t.disabled).map((t) => (
//                 <button key={t.id} type="button" onClick={() => onTab(t.id)} className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/15">
//                   <t.icon className="size-3.5 text-accent" /> {t.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
