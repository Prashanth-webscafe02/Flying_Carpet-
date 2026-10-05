import { motion } from "framer-motion";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Baby,
  BedDouble,
  Bike,
  Briefcase,
  Building2,
  CalendarCheck,
  Check,
  ChevronRight,
  Clock,
  Coffee,
  ConciergeBell,
  CreditCard,
  Crown,
  Dumbbell,
  Eye,
  Hotel as HotelIcon,
  Info,
  Landmark,
  Languages,
  Leaf,
  Link2,
  MapPin,
  Mountain,
  Sofa,
  Sparkles,
  SquareParking,
  Star,
  TrainFront,
  Umbrella,
  Users,
  UtensilsCrossed,
  Waves,
  Wifi,
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
import {
  categoryLabel,
  details,
  hotelImages,
  images,
  type Detail,
  type Hotel,
} from "./details";
import {
  hotelFacts,
  roomRows,
  sampleRoomFacts,
  useSampleRoomFacts,
  type RoomCounts,
} from "./hotelFacts";
import { linkTo, slug } from "./navigate";
// import { isOpen } from './tabs'

// Facility → icon for the amenity lists.
const facilityIcon = (label: string): LucideIcon => {
  const l = label.toLowerCase();
  const rules: [RegExp, LucideIcon][] = [
    [/pool|water|diving|snorkel|surf/, Waves],
    [/spa|yoga|hammam|wellness/, Sparkles],
    [/wi-?fi/, Wifi],
    [/beach/, Umbrella],
    [/dining|restaurant|breakfast|tea|bar|inclusive/, UtensilsCrossed],
    [/kids|family/, Baby],
    [/gym|fitness/, Dumbbell],
    [/business/, Briefcase],
    [/view/, Eye],
    [/heritage|palace/, Landmark],
    [/butler|riad/, ConciergeBell],
    [/metro|skytrain|shuttle/, TrainFront],
    [/rooftop|design|art/, Building2],
    [/garden|desert|ski|nature|mountain/, Mountain],
    [/group/, Users],
    [/reception|central/, Clock],
    [/multilingual|language/, Languages],
    [/wheelchair|accessib/, Accessibility],
    [/car park|parking/, SquareParking],
  ];
  return rules.find(([re]) => re.test(l))?.[1] ?? Check;
};

const categoryBlurb: Record<Hotel["category"], string> = {
  luxury:
    "A top choice for high value clients, honeymooners and special occasions.",
  upscale:
    "Great for families, couples and business clients who want quality and comfort.",
  midscale:
    "A reliable, great value choice that suits a wide range of clients.",
  boutique:
    "A one of a kind stay with character, ideal for clients who want something different.",
  budget:
    "A smart, comfortable option for value conscious clients, groups and longer stays.",
};

// "Ideal for" chips, matching the category blurbs above.
const idealFor: Record<Hotel["category"], string[]> = {
  luxury: ["Honeymoons", "Special occasions", "High value clients"],
  upscale: ["Families", "Couples", "Business travel"],
  midscale: ["Great value", "Couples", "Families"],
  boutique: ["Something different", "Couples", "Design lovers"],
  budget: ["Value stays", "Groups", "Longer stays"],
};

const roomIcons: Record<keyof RoomCounts, LucideIcon> = {
  total: HotelIcon,
  juniorSuites: Sofa,
  seniorSuites: Crown,
  executive: Briefcase,
  superior: BedDouble,
  accessible: Accessibility,
};

type Facility = { label: string; paid?: boolean };
type FacilityGroup = { title: string; icon: LucideIcon; items: Facility[] };

const groupIcons: Record<string, LucideIcon> = {
  "Amenities and Services": ConciergeBell,
  "Restaurant Service": UtensilsCrossed,
  Meals: Coffee,
  Business: Briefcase,
  "Internet Access": Wifi,
  Entertainment: Waves,
  "Health and Beauty": Sparkles,
  "Sustainable Certification": Leaf,
  Activities: Bike,
  "To take into account": Info,
  "Cards Accepted": CreditCard,
};

// Grouped facilities, built from the hotel's own amenities (sorted into groups) plus standard
// services for its category. `paid` items are marked "$" on the page.
function facilityGroups(hotel: Hotel, info: Detail): FacilityGroup[] {
  const premium =
    hotel.category === "luxury" ||
    hotel.category === "upscale" ||
    hotel.category === "boutique";
  const f = (label: string, paid = false): Facility => ({ label, paid });
  const groups: FacilityGroup[] = [
    {
      title: "Amenities and Services",
      icon: ConciergeBell,
      items: [
        f("24 hour reception"),
        f("Multilingual staff"),
        ...(premium ? [f("Concierge")] : []),
        f("Luggage storage"),
        f("Laundry service", true),
        ...(info.transferMode !== "sea" && hotel.category !== "budget"
          ? [f("Car park")]
          : []),
      ],
    },
    {
      title: "Restaurant Service",
      icon: UtensilsCrossed,
      items: [
        f("Restaurant"),
        ...(hotel.category !== "budget" ? [f("Bar")] : []),
        ...(premium ? [f("Room service", true)] : []),
      ],
    },
    {
      title: "Meals",
      icon: Coffee,
      items: [
        f("Breakfast buffet"),
        ...(premium ? [f("Lunch"), f("Dinner")] : []),
      ],
    },
    {
      title: "Business",
      icon: Briefcase,
      items: premium
        ? [f("Meeting rooms"), f("Business centre"), f("Printer", true)]
        : [],
    },
    { title: "Internet Access", icon: Wifi, items: [f("Wi-Fi")] },
    { title: "Entertainment", icon: Waves, items: [] },
    {
      title: "Health and Beauty",
      icon: Sparkles,
      items: premium ? [f("Fitness centre")] : [],
    },
    { title: "Activities", icon: Bike, items: [] },
    {
      title: "To take into account",
      icon: Info,
      items: [
        f("Deposit may be required on arrival"),
        f("Photo ID required at check in"),
      ],
    },
    {
      title: "Cards Accepted",
      icon: CreditCard,
      items: [f("American Express"), f("MasterCard"), f("Visa")],
    },
  ];
  const group = (title: string) => groups.find((g) => g.title === title)!;
  // Sort each of the hotel's own amenities into a group.
  const rules: [RegExp, string, boolean][] = [
    [/wi-?fi/i, "Internet Access", false],
    [/dining|tea|breakfast|bar$|rooftop bar/i, "Restaurant Service", false],
    [/inclusive/i, "Meals", false],
    [/business/i, "Business", false],
    [/spa|hammam/i, "Health and Beauty", true],
    [/gym|fitness|yoga/i, "Health and Beauty", false],
    [/diving|snorkel|surf|water sports|ski|desert/i, "Activities", true],
    [
      /pool|beach|kids|family|garden|view|casino|art|design|rooftop/i,
      "Entertainment",
      false,
    ],
  ];
  for (const a of hotel.amenities) {
    const [, title, paid] = rules.find(([re]) => re.test(a)) ?? [
      null,
      "Amenities and Services",
      false,
    ];
    group(title).items.push(f(a, paid));
    if (/spa/i.test(a))
      group("Health and Beauty").items.push(f("Massage", true));
  }
  // De-duplicate (e.g. "Wi-Fi" vs "Free Wi-Fi") and drop empty groups.
  for (const g of groups) {
    const seen = new Set<string>();
    g.items = g.items.filter((i) => {
      const key = i.label.toLowerCase().replace(/^free /, "");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (g.title === "Internet Access" && g.items.length > 1)
      g.items = g.items.filter((i) => i.label !== "Wi-Fi");
    if (
      g.title === "Health and Beauty" &&
      g.items.some(
        (i) => /gym|fitness/i.test(i.label) && i.label !== "Fitness centre",
      )
    )
      g.items = g.items.filter((i) => i.label !== "Fitness centre");
  }
  return groups.filter((g) => g.items.length);
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "rooms", label: "Rooms" },
  { id: "facilities", label: "Facilities" },
  // { id: 'location', label: 'Location' },
  // { id: 'policies', label: 'Policies' },
];

// A hotel's own page, laid out like a hotel booking page (without live prices or booking): gallery
// mosaic, section tabs, and a sticky agent-rates panel (a bottom bar on phones) beside overview,
// rooms, facilities, location, policies and similar hotels.
export default function HotelDetail({
  d,
  hotel,
}: {
  d: Destination;
  hotel: Hotel;
}) {
  const info = details[d.id];
  const index = info.hotels.indexOf(hotel);
  const country = countryName(d.country);
  const facts = hotelFacts[hotel.name] ?? {};
  // Year built + room counts: the shared sample while `useSampleRoomFacts` is on, else this hotel's own.
  const roomFacts = useSampleRoomFacts
    ? sampleRoomFacts
    : { opened: facts.opened, rooms: facts.rooms };
  const where = d.city === country ? country : `${d.city}, ${country}`;
  const address = facts.address
    ? `${facts.address}, ${where}`
    : `${hotel.area}, ${where}`;
  const photos = [
    ...new Set([
      ...hotelImages.slice(index % hotelImages.length),
      ...hotelImages.slice(0, index % hotelImages.length),
      images.hotels,
      d.img,
    ]),
  ].map(bigPhoto);
  const [copied, setCopied] = useState(false);
  const back = `/destinations/${d.id}/hotels`;

  useEffect(() => {
    document.title = pageTitle(hotel.name, d.city);
  }, [hotel.name, d.city]);

  // Top amenities: the hotel's own, then standard services.
  const strip =
    facts.strip ??
    [
      ...hotel.amenities,
      ...[
        "Restaurant",
        "Free Wi-Fi",
        "24 hour reception",
        "Multilingual staff",
      ].filter(
        (f) =>
          !hotel.amenities.some((a) =>
            a.toLowerCase().includes(f.split(" ").pop()!.toLowerCase()),
          ),
      ),
    ].slice(0, 8);
  const allGroups: FacilityGroup[] = facts.facilities
    ? facts.facilities.map((g) => ({
        ...g,
        icon: groupIcons[g.title] ?? Check,
      }))
    : facilityGroups(hotel, info);
  // Check-in/out hours, payment cards and "good to know" live under Policies, not Facilities.
  const isHours = (label: string) => /check-(in|out) hour/i.test(label);
  // Used by the Policies section, which is switched off below. To bring it back, uncomment these,
  // the section, the Policy component, the 'policies' tab, CalendarClock in the icon import and ReactNode from react.
  // const allItems = allGroups.flatMap((g) => g.items.map((i) => i.label))
  // const times = (re: RegExp) => allItems.find((l) => re.test(l))?.match(/\d{1,2}:\d{2}/g) ?? null
  // const checkIn = times(/check in hour/i)
  // const checkOut = times(/check-out hour/i)
  // const cards = allGroups.find((g) => g.title === 'Cards Accepted')?.items.map((i) => i.label) ?? []
  // const goodToKnow = allGroups.find((g) => g.title === 'To take into account')?.items.map((i) => i.label) ?? []
  const groups = allGroups
    .filter(
      (g) => g.title !== "Cards Accepted" && g.title !== "To take into account",
    )
    .map((g) => ({ ...g, items: g.items.filter((i) => !isHours(i.label)) }))
    .filter((g) => g.items.length);

  const listFormatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });
  const location = hotel.area === d.city ? d.city : `${hotel.area}, ${d.city}`;
  const overview = [
    `${hotel.text} Located in ${location}, ${hotel.name} is listed in our ${categoryLabel[hotel.category].toLowerCase()} collection. ${categoryBlurb[hotel.category]}`,
    ...(hotel.amenities.length
      ? [
          `The property's highlights include ${listFormatter.format(hotel.amenities)}. These features help shape the stay beyond the room itself, whether your clients want to spend time enjoying the hotel or balance their visit with days out in ${d.city}.`,
        ]
      : []),
  ];
  const suites =
    (roomFacts.rooms?.juniorSuites ?? 0) + (roomFacts.rooms?.seniorSuites ?? 0);
  const glance: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Star, label: "Rating", value: `${hotel.stars}-star` },
    { icon: Crown, label: "Collection", value: categoryLabel[hotel.category] },
    {
      icon: CalendarCheck,
      label: "Opened",
      value: roomFacts.opened ? String(roomFacts.opened) : "—",
    },
    {
      icon: BedDouble,
      label: "Rooms",
      value: roomFacts.rooms?.total
        ? roomFacts.rooms.total.toLocaleString("en")
        : "—",
    },
  ];
  // const mapQuery = encodeURIComponent(`${hotel.name}, ${address}`)
  // const transfers = `/destinations/${d.id}/transfers`
  const others = info.hotels.filter((h) => h !== hotel).slice(0, 3);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: hotel.name, url });
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
              <span className="sm:hidden">Hotels</span>
              <span className="hidden sm:inline">Hotels in {d.city}</span>
            </a>
            <ChevronRight className="hidden size-3.5 shrink-0 text-white/35 sm:block" />
            <span className="hidden truncate sm:block">{hotel.name}</span>
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
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
              {categoryLabel[hotel.category]}
            </span>
            {hotel.tag && (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
                {hotel.tag}
              </span>
            )}
            <span
              className="flex gap-0.5"
              aria-label={`${hotel.stars} star hotel`}
            >
              {Array.from({ length: hotel.stars }, (_, i) => (
                <Star key={i} className="size-4 fill-accent text-accent" />
              ))}
            </span>
          </div>
          <h1 className="text-[clamp(2.1rem,4.6vw,3.9rem)] font-bold leading-[1.02] tracking-[-0.045em]">
            {hotel.name}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-white/70">
            <span className="inline-flex items-start gap-1.5">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" /> {address}
            </span>
          </p>
        </motion.div>

        <Gallery photos={photos} name={hotel.name} variant="mosaic" />

        <div className="mt-8">
          <div className="min-w-0">
            {/* Section tabs */}
            <SectionTabs sections={sections} />

            {/* Overview */}
            <section id="overview" className="scroll-mt-24 pt-10">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {glance.map((g) => (
                  <li key={g.label} className="glass rounded-[1.25rem] p-4">
                    <g.icon className="size-5 text-accent" />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      {g.label}
                    </p>
                    <p className="mt-0.5 text-lg font-semibold tracking-tight">
                      {g.value}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
                <div>
                  <SectionTitle>About the hotel</SectionTitle>
                  <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-white/80">
                    {overview.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-sm font-semibold text-white/60">
                      Ideal for
                    </span>
                    {idealFor[hotel.category].map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium"
                      >
                        <Check
                          className="size-3.5 text-accent"
                          strokeWidth={3}
                        />{" "}
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-10 text-lg font-semibold tracking-tight">
                    Popular amenities
                  </h3>
                  <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                    {strip.map((f) => {
                      const Icon = facilityIcon(f);
                      return (
                        <li
                          key={f}
                          className="flex items-center gap-3 text-[0.95rem] text-white/85"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10">
                            <Icon className="size-4 text-accent" />
                          </span>
                          {f}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <ProductInfoPanel product="hotels" />
              </div>
            </section>

            {/* Rooms */}
            <section id="rooms" className="scroll-mt-24 pt-14">
              <SectionTitle>Rooms &amp; suites</SectionTitle>
              <p className="mt-2 text-white/65">
                {suites > 0 && roomFacts.rooms?.total
                  ? `${roomFacts.rooms.total.toLocaleString("en")} rooms, including ${suites} suites. `
                  : ""}
                Room types, views and bedding are confirmed with your quote.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {roomRows.map(([key, label]) => {
                  const Icon = roomIcons[key];
                  const value = roomFacts.rooms?.[key];
                  return (
                    <li
                      key={key}
                      className={`flex items-center gap-4 rounded-[1.25rem] p-4 ${key === "total" ? "glass-solid" : "glass"}`}
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent/15 ring-1 ring-accent/30">
                        <Icon className="size-5 text-accent" />
                      </span>
                      <span className="min-w-0 flex-1 text-white/75">
                        {label}
                      </span>
                      <span
                        className={`text-xl font-semibold tabular-nums tracking-tight ${value === undefined ? "text-white/35" : ""}`}
                      >
                        {value === undefined ? "—" : value.toLocaleString("en")}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {(!roomFacts.opened ||
                roomRows.some(
                  ([key]) => roomFacts.rooms?.[key] === undefined,
                )) && (
                <p className="mt-3 text-xs text-white/45">
                 , confirmed on request
                </p>
              )}
            </section>

            {/* Facilities, grouped; "$" marks items with an extra charge */}
            <section id="facilities" className="scroll-mt-24 pt-14">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <SectionTitle>Facilities</SectionTitle>
                <p className="text-sm text-white/55">
                  <span className="font-bold text-accent">$</span> Additional
                  charge
                </p>
              </div>
              <div className="glass mt-5 columns-1 gap-x-8 rounded-[1.75rem] p-6 sm:columns-2 xl:columns-3 md:p-8">
                {groups.map((g) => (
                  <FacilityList key={g.title} group={g} />
                ))}
              </div>
            </section>

            {/* Location */}
            {/* <section id="location" className="scroll-mt-24 pt-14">
              <SectionTitle>Location</SectionTitle>
              <p className="mt-2 flex items-start gap-1.5 text-white/70"><MapPin className="mt-1 size-4 shrink-0 text-accent" /> {address}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                <div className="relative h-72 overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 md:h-full md:min-h-80">
                  <iframe
                    title={`Map of ${hotel.name}`}
                    src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full [filter:invert(90%)_hue-rotate(180deg)_saturate(0.7)_brightness(0.95)]"
                  />
                </div>
                <div className="glass rounded-[1.75rem] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Getting there</p>
                  <div className="mt-3 flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10"><Plane className="size-4 text-accent" /></span>
                    <div>
                      <p className="font-semibold">{info.airportName}</p>
                      <p className="text-sm text-white/55">Nearest airport · {info.airport}</p>
                    </div>
                  </div>
                  {isOpen('transfers') && (
                    <a href={transfers} onClick={linkTo(transfers)} className="group mt-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                      <Car className="size-4 shrink-0 text-accent" />
                      <span className="flex-1 text-sm font-semibold">Arrange an airport transfer</span>
                      <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Areas in {d.city}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {info.areas.map((a) => (
                      <li key={a} className={`rounded-full px-3 py-1.5 text-sm ${a === hotel.area ? 'bg-accent font-semibold' : 'bg-white/8 text-white/75 ring-1 ring-white/10'}`}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section> */}

            {/* Policies */}
            {/* <section id="policies" className="scroll-mt-24 pt-14">
              <SectionTitle>Policies</SectionTitle>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Policy icon={CalendarCheck} title="Check-in">{checkIn ? `From ${checkIn[0]}` : 'Confirmed at booking'}</Policy>
                <Policy icon={CalendarClock} title="Check-out">{checkOut ? `Until ${checkOut[checkOut.length - 1]}` : 'Confirmed at booking'}</Policy>
                {cards.length > 0 && (
                  <Policy icon={CreditCard} title="Cards accepted">
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {cards.map((c) => <span key={c} className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-semibold text-white/85">{c}</span>)}
                    </span>
                  </Policy>
                )}
                {goodToKnow.length > 0 && (
                  <Policy icon={Info} title="Good to know">
                    <ul className="space-y-1">{goodToKnow.map((g) => <li key={g}>{g}</li>)}</ul>
                  </Policy>
                )}
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-white/65 sm:grid-cols-2">
                {[
                  'Total price shown from the first page, with no hidden card or payment fees',
                  'Refundable and non-refundable rates available',
                  'Cancellation and penalty terms shown before you book',
                  'City taxes and resort fees, where applicable, are paid directly to the hotel',
                ].map((t) => <li key={t} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} /> {t}</li>)}
              </ul>
            </section> */}
          </div>
        </div>

        {/* Enquiry banner */}
        <Reveal className="relative mt-20 overflow-hidden rounded-4xl ring-1 ring-white/15">
          <img
            src={photos[1]}
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
                Want {hotel.name} for your client?
              </h2>
              <p className="mt-2 text-white/75">
                Our specialists will confirm rates, rooms and availability, and
                can add flights, experiences, transfers and car rentals.
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

        {/* Similar hotels */}
        {others.length > 0 && (
          <section className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <SectionTitle>More hotels in {d.city}</SectionTitle>
              <a
                href={back}
                onClick={linkTo(back)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                View all <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((h) => {
                const url = `/destinations/${d.id}/hotels/${slug(h.name)}`;
                return (
                  <a
                    key={h.name}
                    href={url}
                    onClick={linkTo(url)}
                    className="group glass-solid flex flex-col overflow-hidden rounded-3xl ring-white/25 transition-shadow hover:ring-1"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <img
                        src={
                          hotelImages[
                            info.hotels.indexOf(h) % hotelImages.length
                          ]
                        }
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                      />
                      {h.tag && (
                        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em]">
                          {h.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span
                        className="flex gap-0.5"
                        aria-label={`${h.stars} star hotel`}
                      >
                        {Array.from({ length: h.stars }, (_, i) => (
                          <Star
                            key={i}
                            className="size-3.5 fill-accent text-accent"
                          />
                        ))}
                      </span>
                      <span className="mt-2 text-lg font-semibold tracking-tight">
                        {h.name}
                      </span>
                      <span className="mt-0.5 text-sm text-white/55">
                        {h.area} · {categoryLabel[h.category]}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        View hotel{" "}
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

// Policies section card (section switched off; see the note near checkIn).
// function Policy({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
//   return (
//     <div className="glass flex gap-4 rounded-[1.25rem] p-5">
//       <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10"><Icon className="size-4 text-accent" /></span>
//       <div className="min-w-0 text-sm text-white/75">
//         <p className="mb-1 font-semibold text-white">{title}</p>
//         {children}
//       </div>
//     </div>
//   )
// }

const SHOWN = 5;

function FacilityList({ group }: { group: FacilityGroup }) {
  const [all, setAll] = useState(false);
  const items = all ? group.items : group.items.slice(0, SHOWN);
  return (
    <div className="mb-8 break-inside-avoid last:mb-0">
      <p className="flex items-center gap-2 font-semibold tracking-tight">
        <group.icon className="size-4.5 text-accent" /> {group.title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li
            key={i.label}
            className="flex items-start gap-2.5 text-sm text-white/75"
          >
            {i.paid ? (
              <span
                aria-label="Additional charge"
                className="mt-px w-4 shrink-0 text-center font-bold text-accent"
              >
                $
              </span>
            ) : (
              <Check
                className="mt-0.5 size-4 shrink-0 text-white/60"
                strokeWidth={2.5}
              />
            )}
            {i.label}
          </li>
        ))}
      </ul>
      {group.items.length > SHOWN && (
        <button
          type="button"
          onClick={() => setAll((x) => !x)}
          aria-expanded={all}
          className="-mb-2 mt-0 py-2 text-sm font-semibold text-accent hover:underline"
        >
          {all ? "Show less" : "See all"}
        </button>
      )}
    </div>
  );
}
