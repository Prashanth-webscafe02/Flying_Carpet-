import { ChevronDown } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: "flights",
    title: "Flights",
    intro:
      "Get negotiated, low-cost and competitively priced fares from a wide range of airlines, including for last-minute travel.",
    points: [
      [
        "Agency commissions",
        "Earn attractive agency commissions on selected airline fares.",
      ],
      [
        "NDC content",
        "Access NDC content through GDS, direct and consolidator sources.",
      ],
      [
        "Clear fare options",
        "Choose from multiple fare types with clear labels, fare families and descriptions.",
      ],
      [
        "Regional ultra low-cost carriers",
        "Offer regional ultra low-cost carriers for wider market coverage.",
      ],
      [
        "Extras on the platform",
        "Book seats, meals, baggage and other extras for your customers on the platform, for GDS and low-cost carrier flights.",
      ],
      [
        "Professional quotes",
        "Create professional quotes with upsell options.",
      ],
      [
        "Secure card payments",
        "Pay securely with PCI-DSS-compliant card payments, including card pass-through accepted by airlines.",
      ],
      [
        "Last-minute and same-day booking",
        "Search and book last-minute and same-day flights, right up to the day of departure.",
      ],
    ],
  },
  {
    id: "hotels",
    title: "Hotels",
    intro:
      "Choose from a large inventory of properties across many destinations. You see the total price from the first page, with no hidden credit card or payment fees.",
    points: [
      [
        "Last-minute stays",
        "Find and book rooms for your customers' last-minute trips.",
      ],
      [
        "Wide coverage",
        "Find the right stay for your customers across a broad range of properties and destinations.",
      ],
      [
        "Clear pricing",
        "See the total price you pay us from the first page, with no hidden credit card or payment fees.",
      ],
      [
        "Flexible options",
        "Choose from many room types, with refundable and non-refundable rates.",
      ],
      [
        "Clear cancellation policies",
        "See the cancellation and penalty terms on the platform before you book, so you and your customers know the terms up front.",
      ],
    ],
    note: "City taxes and resort fees, where applicable, are shown separately and paid directly to the hotel.",
  },
  {
    id: "experiences",
    title: "Experiences",
    intro:
      "Offer your customers activities and experiences for every budget, from affordable options to premium and luxury.",
    points: [
      [
        "Last-minute activities",
        "Find things to do for your customers, even at short notice.",
      ],
      [
        "Something for every budget",
        "Choose from affordable, premium and luxury experiences.",
      ],
      [
        "Wide range",
        "Find experiences across many destinations, lasting from one hour to several days.",
      ],
    ],
  },
  {
    id: "transfers",
    title: "Transfers",
    intro:
      "Book airport, train station, port and accommodation transfers for your customers, with upfront pricing.",
    points: [
      [
        "Last-minute transfers",
        "Arrange a transfer for your customers, even close to travel time.",
      ],
      [
        "Every journey covered",
        "Book transfers to and from airports, train stations, ports and accommodations.",
      ],
      [
        "Wide range of vehicles",
        "Choose from cars, hybrid cars, SUVs, minibuses, shuttles and accessible vehicles.",
      ],
      [
        "Standard, Premium and Luxury",
        "Pick the level that suits your customers.",
      ],
      [
        "Private or shared",
        "Book a private vehicle or a shared seat on a shuttle or bus.",
      ],
      [
        "Upfront pricing",
        "No hidden fees or surprises. The price you see is the price you pay.",
      ],
    ],
  },
  {
    id: "car-rentals",
    title: "Car Rental",
    intro:
      "Offer your customers car rental from leading brands, including Avis, Budget, Payless, Alamo, Enterprise, National, Sixt, Dollar, Europcar, Thrifty and Hertz.",
    points: [
      [
        "Last-minute rentals",
        "Book a car for your customers' last-minute plans.",
      ],
      [
        "Pay at pick-up",
        "Your customers book through the platform and pay the supplier directly when they collect the car.",
      ],
      [
        "No booking fee",
        "Your customers pay nothing to us at the time of booking.",
      ],
      [
        "Flexible cancellations",
        "Your customers can cancel free of charge before pick-up, subject to the rental's cancellation policy.",
      ],
      [
        "Card guarantee",
        "Your customers enter their credit card details at booking, but nothing is charged. Some suppliers require a card as a guarantee for certain vehicle types.",
      ],
    ],
  },
];

export default function ProductInfoPanel({ product }: { product: string }) {
  const content = products.find((item) => item.id === product)!;
  const [expanded, setExpanded] = useState(false);
  const visiblePoints = expanded ? content.points : content.points.slice(0, 3);

  return (
    <section className="glass-solid mt-12 rounded-3xl p-6 ring-1 ring-white/15 lg:mt-0">
      <div className="max-w-xl">
        <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.035em]">
          {content.title}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-white/80">
          {content.intro}
        </p>
        <ul className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-white/75">
          {visiblePoints.map(([label, text]) => (
            <li key={label}>
              <strong className="font-semibold text-white">{label}: </strong>
              {text}
            </li>
          ))}
        </ul>
        {content.points.length > 3 && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-white"
          >
            {expanded ? "View less" : "View more"}
            <ChevronDown
              aria-hidden="true"
              className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
        {content.note && (
          <p className="mt-5 text-sm italic leading-relaxed text-white/60">
            {content.note}
          </p>
        )}
      </div>
    </section>
  );
}
