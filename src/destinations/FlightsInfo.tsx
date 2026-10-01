import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgePercent,
  Clock,
  FileText,
  Luggage,
  Network,
  Plane,
  PlaneTakeoff,
  ShieldCheck,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { ease } from "../effects/motion";
import type { Destination } from "./data";
import LogoMarquee from "./LogoMarquee";
import { products } from "./ProductInfoPanel";

// Same order as the flights points in ProductInfoPanel.
const icons: LucideIcon[] = [
  BadgePercent,
  Network,
  Tags,
  PlaneTakeoff,
  Luggage,
  FileText,
  ShieldCheck,
  Clock,
];

// Partner airlines shown in the logo strip; the files are in /public/brands/airlines.
const airlines = [
  "Emirates",
  "Qatar Airways",
  "flydubai",
  "Saudia",
  "IndiGo",
  "ITA Airways",
  "Ethiopian Airlines",
  "Gulf Air",
  "Kenya Airways",
  "South African Airways",
  "EgyptAir",
  "Air Arabia",
  "Kuwait Airways",
  "flynas",
  "Jazeera Airways",
];
const airlineLogos = Object.fromEntries(
  airlines.map((a) => [
    a,
    `/brands/airlines/${a.toLowerCase().replace(/ /g, "-")}.svg`,
  ]),
);

// Flights: the client's product copy only (title, intro and the eight points), nothing else.
export default function FlightsInfo({
  d,
  onBack,
}: {
  d: Destination;
  onBack: () => void;
}) {
  const content = products.find((p) => p.id === "flights")!;

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="-mt-2 mb-6 inline-flex items-center gap-2 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" /> Back to {d.city}
      </button>

      {/* Title and intro over the photo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative isolate overflow-hidden rounded-4xl ring-1 ring-white/15"
      >
        <img
          src="/images/flights.webp"
          alt=""
          decoding="async"
          className="absolute inset-0 -z-2 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-1 bg-linear-to-r from-brand via-brand/85 to-brand/10" />
        <div className="max-w-2xl px-6 py-12 sm:px-10 sm:py-16 lg:py-20">
          <span className="grid size-12 place-items-center rounded-2xl bg-accent/15 ring-1 ring-accent/40">
            <Plane className="size-5 text-accent" />
          </span>
          <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.25rem)] font-semibold leading-none tracking-tighter">
            {content.title}
          </h2>
          <p className="mt-5 text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-white/85">
            {content.intro}
          </p>
        </div>
      </motion.div>

      {/* Airline logos, endlessly scrolling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className="my-8"
      >
        <LogoMarquee names={airlines} logos={airlineLogos} label="Airlines" />
      </motion.div>

      {/* The eight points */}
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {content.points.map(([label, text], i) => {
          const Icon = icons[i] ?? Plane;
          return (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease }}
              className="group glass sheen flex flex-col rounded-[1.75rem] p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-accent/15 ring-1 ring-accent/30 transition-colors duration-500 group-hover:bg-accent">
                <Icon className="size-5 text-accent transition-colors duration-500 group-hover:text-white" />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
                {label}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">
                {text}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}
