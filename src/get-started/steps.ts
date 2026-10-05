import {
  BedDouble,
  Building2,
  Car,
  CarFront,
  Castle,
  Landmark,
  Leaf,
  Mountain,
  PawPrint,
  Plane,
  Sun,
  Ticket,
  TreePalm,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { marketLists, type RegionId } from "../destinations/markets";
import { market } from "../market";

export type Choice = {
  id: string;
  title: string;
  /** Description under the title (categories only; Q2 drops the region descriptions). */
  text?: string;
  /** Short label shown in the tile's badge (e.g. a country code); otherwise `icon` is used. */
  code?: string;
  icon?: LucideIcon;
  meta?: string;
};

export type StepId = "regions" | "categories";

export type Step = {
  id: StepId;
  /** Progress bar label (Q5). */
  label: string;
  /** Small label above the headline. */
  eyebrow: string;
  title: [string, string];
  intro: string;
  /** Line at the bottom. */
  tagline: string;
  multi: boolean;
  /** Main button. */
  next: string;
  choices: Choice[];
};

const regionIcons: Record<RegionId, LucideIcon> = {
  africa: PawPrint,
  asia: TreePalm,
  australasia: Waves,
  caribbean: Sun,
  "central-america": Leaf,
  europe: Castle,
  "middle-east": Landmark,
  "north-america": Building2,
  "south-america": Mountain,
};

const LINE = "Free to register. No fees, no minimum.";

// The questions (Q2, Q3). The market comes from the site address (Q1), so there are two steps.
export const steps: Step[] = [
  {
    id: "regions",
    label: "Regions",
    eyebrow: "Step 1 of 2",
    title: ["Where do your clients", "travel most?"],
    intro: "Pick the regions you sell. We'll show you the destinations that matter to your business.",
    tagline: LINE,
    multi: true,
    next: "Next",
    // That market's regions from Appendix A, in the client's order, with how many destinations each has.
    choices: marketLists[market].map((r) => ({
      id: r.region,
      icon: regionIcons[r.region],
      title: r.name,
      meta: `${r.ids.length} destinations`,
    })),
  },
  {
    id: "categories",
    label: "Categories",
    eyebrow: "Step 2 of 2",
    title: ["Which categories", "do you sell most?"],
    intro: "Pick as many as you like. We'll put them first on every destination.",
    tagline: LINE,
    multi: true,
    next: "Show my destinations",
    choices: [
      { id: "flights", icon: Plane, title: "Flights", text: "400+ airlines, booked up to the day of departure" },
      { id: "hotels", icon: BedDouble, title: "Hotels", text: "300,000+ hotels, with the total price shown upfront" },
      { id: "experiences", icon: Ticket, title: "Experiences", text: "400,000+ tours, tickets and activities" },
      { id: "transfers", icon: CarFront, title: "Transfers", text: "Airport, station, port and hotel transfers" },
      { id: "car-rentals", icon: Car, title: "Car rentals", text: "Self drive cars from 11 global brands. Zero booking fee. T&Cs apply." },
    ],
  },
];
