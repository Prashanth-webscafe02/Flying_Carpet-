import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Flag,
  Languages,
  Link2,
  MapPin,
  Smartphone,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { LucidCorner } from "../effects/LucidLine";
import { Reveal, ease } from "../effects/motion";
import { REGISTER_URL, pageTitle } from "../content";
import { words } from "../market";
import { SectionTabs, SectionTitle } from "./AgentRates";
import Gallery from "./Gallery";
import ProductInfoPanel from "./ProductInfoPanel";
import { bigPhoto, countryName, type Destination } from "./data";
import { detailFor, images, type Experience } from "./details";
import {
  defaultLanguages,
  defaultTicket,
  experienceImage,
  experienceInfo,
} from "./experienceDetails";
import { additional } from "./itineraries/additional";
import { asia } from "./itineraries/asia";
import { west } from "./itineraries/west";
import { linkTo, slug } from "./navigate";

// An experience's own page, laid out like a tour booking page (Viator-style, without live prices or
// booking): gallery mosaic, section tabs and a sticky agent-rates panel (a bottom bar on phones)
// beside overview, what's included, what to expect, meeting and pickup, and good to know.
export default function ExperienceDetail({
  d,
  experience: e,
}: {
  d: Destination;
  experience: Experience;
}) {
  const info = detailFor(d.id);
  const index = info.experiences.indexOf(e);
  const content = experienceInfo[e.title];
  const country = countryName(d.country);
  const location = d.city === country ? country : `${d.city}, ${country}`;
  const hero = experienceImage(d, e, index);
  const photos = [
    ...new Set([hero, d.img, images.experiences, images.outdoors, images.wing]),
  ].map(bigPhoto);
  const [copied, setCopied] = useState(false);
  const back = `/destinations/${d.id}/experiences`;
  const others = info.experiences.filter((x) => x !== e).slice(0, 3);
  const stops =
    additional[e.title] ??
    asia[e.title] ??
    west[e.title] ??
    content?.stops ??
    [];
  const highlights = stops.map(([name]) => name);
  const pickup = content?.included.some((i) => /pick-?up/i.test(i)) ?? false;
  const ticket = content?.ticket ?? defaultTicket;
  const languages = content?.languages ?? defaultLanguages;
  const duration = /hour/i.test(e.duration)
    ? `${e.duration} (approx.)`
    : e.duration;
  const overviewDetail = highlights.length
    ? `With a listed duration of ${e.duration.toLowerCase()}, the experience centres on ${new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(highlights)}. It gives your clients a dedicated part of their ${d.city} journey to enjoy these highlights, with time around the activity to shape the rest of their day.`
    : `With a listed duration of ${e.duration.toLowerCase()}, this experience adds a focused visit to ${e.place} to your clients’ time in ${d.city}. Build it into their itinerary alongside time to explore and unwind, choosing a pace that reflects their interests.`;

  useEffect(() => {
    document.title = pageTitle(e.title, d.city);
  }, [e.title, d.city]);

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Clock, label: "Duration", value: duration },
    {
      icon: pickup ? Bus : MapPin,
      label: pickup ? "Pickup" : "Meeting point",
      value: pickup ? "Hotel pickup included" : "Meet on site",
    },
    { icon: Smartphone, label: "Ticket", value: ticket },
    { icon: Languages, label: "Offered in", value: languages },
  ];
  const sections = [
    { id: "overview", label: "Overview" },
    ...(content ? [{ id: "included", label: "What’s included" }] : []),
    ...(stops.length ? [{ id: "expect", label: "What to expect" }] : []),
  ];
  const meetAt = stops[0]?.[0] ?? e.place;

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: e.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* dismissed */
    }
  };

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:pt-32 md:px-8 lg:pb-24">
        {/* Breadcrumb + share */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-1.5 text-sm text-white/60"
          >
            <a
              href={back}
              onClick={linkTo(back)}
              className="-my-2 inline-flex shrink-0 items-center gap-2 py-2 font-medium text-white/75 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />{" "}
              <span className="sm:hidden">Experiences</span>
              <span className="hidden sm:inline">Experiences in {d.city}</span>
            </a>
            <ChevronRight className="hidden size-3.5 shrink-0 text-white/35 sm:block" />
            <span className="hidden truncate sm:block">{e.title}</span>
          </nav>
          <button
            type="button"
            onClick={share}
            className="glass inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/15"
          >
            <Link2 className="size-4" /> {copied ? "Link copied" : "Share"}
          </button>
        </div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {e.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {e.tags.map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${i === 0 ? "bg-accent font-bold" : "bg-white/10 text-white/80"}`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-[clamp(2.1rem,4.6vw,3.9rem)] font-bold leading-[1.02] tracking-[-0.045em]">
            {e.title}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0 text-accent" /> {e.place},{" "}
              {location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 shrink-0 text-accent" /> {duration}
            </span>
          </p>
        </motion.div>

        <Gallery photos={photos} name={e.title} variant="mosaic" />

        <div className="mt-8">
          <div className="min-w-0">
            <SectionTabs sections={sections} />

            {/* Overview */}
            <section id="overview" className="scroll-mt-24 pt-10">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {facts.map((f) => (
                  <li key={f.label} className="glass rounded-[1.25rem] p-4">
                    <f.icon className="size-5 text-accent" />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      {f.label}
                    </p>
                    <p className="mt-0.5 font-semibold leading-snug tracking-tight">
                      {f.value}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
                <div>
                  <SectionTitle>Overview</SectionTitle>
                  <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-white/80">
                    <p>
                      {content?.overview ??
                        `Discover ${e.title} in ${e.place}, ${d.city}, and make it part of a journey shaped around your clients’ interests.`}
                    </p>
                    <p>{overviewDetail}</p>
                  </div>

                  {highlights.length > 0 && (
                    <>
                      <h3 className="mt-10 text-lg font-semibold tracking-tight">
                        Highlights
                      </h3>
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-center gap-3 text-[0.95rem] text-white/85"
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10">
                              <Flag className="size-4 text-accent" />
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <ProductInfoPanel product="experiences" />
              </div>
            </section>

            {/* What's included */}
            {content && (
              <section id="included" className="scroll-mt-24 pt-14">
                <SectionTitle>What’s included</SectionTitle>
                <div className="glass mt-5 grid gap-6 rounded-[1.75rem] p-6 sm:grid-cols-2 md:p-8">
                  <IncludeList items={content.included} included />
                </div>
                <div className="glass mt-5 grid gap-6 rounded-[1.75rem] p-6 sm:grid-cols-2 md:p-8">
                  <IncludeList items={content.excluded} />
                </div>
              </section>
            )}

            {/* What to expect: stops in journey order */}
            {stops.length > 0 && (
              <section id="expect" className="scroll-mt-24 pt-14">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <SectionTitle>Itinerary</SectionTitle>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
                    <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5">
                      <Clock
                        aria-hidden="true"
                        className="size-4 text-accent"
                      />
                      {e.duration} total
                    </span>
                    <span>
                      {stops.length} {stops.length === 1 ? "stop" : "stops"}
                    </span>
                  </div>
                </div>
                <ol className="mt-6">
                  <Marker
                    icon={pickup ? Bus : MapPin}
                    label={
                      pickup
                        ? "Pickup from your client’s hotel"
                        : `Meet at ${meetAt}`
                    }
                  />
                  {stops.map(([name, text], i) => (
                    <Stop key={name} n={i + 1} name={name} text={text} />
                  ))}
                  <Marker
                    icon={Flag}
                    label={
                      pickup
                        ? "Drop off back at the hotel"
                        : "The experience ends here"
                    }
                    last
                  />
                </ol>
              </section>
            )}
          </div>
        </div>

        {/* Enquiry banner */}
        <Reveal className="relative mt-20 overflow-hidden rounded-4xl ring-1 ring-white/15">
          <img
            src={photos[1] ?? photos[0]}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-brand via-brand/85 to-brand/40" />
          <LucidCorner className="absolute bottom-0 left-0" />
          <div className="relative flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Special {words.agent} rates
              </p>
              <h2 className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.04em]">
                Add {e.title} to your client’s trip
              </h2>
              <p className="mt-2 text-white/75">
                Our specialists will confirm dates, availability and rates, and
                can combine it with flights, hotels, transfers and car rentals.
              </p>
            </div>
            <a
              href={REGISTER_URL}
              target="_blank"
              className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-cream py-1.5 pl-5 pr-1.5 font-bold tracking-tight text-ink shadow-[0_10px_40px_-8px_rgb(232_101_37/0.7)] transition-transform duration-500 hover:scale-[1.04] md:self-auto"
            >
              Register free
              <span className="grid size-8 place-items-center rounded-full bg-accent text-white">
                <ArrowRight className="size-4" />
              </span>
            </a>
          </div>
        </Reveal>

        {/* Similar experiences */}
        {others.length > 0 && (
          <section className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <SectionTitle>More experiences in {d.city}</SectionTitle>
              <a
                href={back}
                onClick={linkTo(back)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                View all <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((x) => {
                const url = `/destinations/${d.id}/experiences/${slug(x.title)}`;
                return (
                  <a
                    key={x.title}
                    href={url}
                    onClick={linkTo(url)}
                    className="group glass-solid flex flex-col overflow-hidden rounded-3xl ring-white/25 transition-shadow hover:ring-1"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <img
                        src={experienceImage(d, x, info.experiences.indexOf(x))}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                      />
                      {x.tags[0] && (
                        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em]">
                          {x.tags[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-lg font-semibold tracking-tight">
                        {x.title}
                      </span>
                      <span className="mt-0.5 text-sm text-white/55">
                        {x.place} · {x.duration}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        View experience{" "}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function IncludeList({
  items,
  included = false,
}: {
  items: string[];
  included?: boolean;
}) {
  return (
    <div>
      <p className="font-semibold tracking-tight">
        {included ? "Included" : "Not included"}
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-white/80">
            <span
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${included ? "bg-emerald-400/20 text-emerald-300" : "bg-rose-400/15 text-rose-300"}`}
            >
              {included ? (
                <Check className="size-3.5" strokeWidth={2.5} />
              ) : (
                <X className="size-3.5" strokeWidth={2.5} />
              )}
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Start / end of the "What to expect" timeline.
function Marker({
  icon: Icon,
  label,
  last = false,
}: {
  icon: LucideIcon;
  label: string;
  last?: boolean;
}) {
  return (
    <li
      className={`group relative flex items-center gap-4 sm:gap-5 ${last ? "" : "pb-5"}`}
    >
      <div
        aria-hidden="true"
        className="relative flex w-10 shrink-0 justify-center self-stretch sm:w-12"
      >
        {!last && (
          <span className="absolute bottom-0 left-1/2 top-10 w-px bg-linear-to-b from-accent/50 to-white/15 sm:top-12" />
        )}
        <span className="relative grid size-10 place-items-center rounded-full bg-accent text-white sm:size-12">
          <Icon className="size-4.5" />
        </span>
      </div>
      <p className="font-semibold tracking-tight text-white/90">{label}</p>
    </li>
  );
}

function Stop({ n, name, text }: { n: number; name: string; text: string }) {
  const [open, setOpen] = useState(false);
  const id = `stop-${n}`;
  return (
    <li className="relative flex gap-4 pb-5 sm:gap-5">
      <div
        aria-hidden="true"
        className="relative flex w-10 shrink-0 justify-center sm:w-12"
      >
        <span className="absolute bottom-0 left-1/2 top-10 w-px bg-linear-to-b from-accent/50 to-white/15 sm:top-12" />
        <span className="relative grid size-10 place-items-center rounded-full border border-accent/40 bg-brand text-sm font-bold tabular-nums text-accent sm:size-12">
          {String(n).padStart(2, "0")}
        </span>
      </div>
      {/* Collapsed by default: the stop name is a button that reveals the details (Viator-style). */}
      <div className="glass min-w-0 flex-1 rounded-[1.25rem]">
        <h3>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={id}
            className="flex w-full items-center gap-3 p-5 text-left sm:px-6"
          >
            <span className="min-w-0 flex-1 text-lg font-semibold leading-snug tracking-tight">
              {name}
            </span>
            <span className="hidden shrink-0 text-sm font-semibold text-accent sm:inline">
              {open ? "Hide details" : "See details"}
            </span>
            <ChevronDown
              className={`size-5 shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-5 leading-relaxed text-white/75 sm:px-6 sm:pb-6">
                {text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}
