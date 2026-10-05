import type { ProductId } from "./destinations/data";
import { isUS, words } from "./market";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Browser tab title and page description (G1). The US site has its own description.
export const SITE_NAME = "Flying Carpet";
export const siteTitle = "Flying Carpet | For everything last minute";
export const siteDescription = isUS
  ? "The booking platform for travel advisors. Flights, hotels, experiences, transfers and car rentals on one login, with 24/7 help. Register free."
  : "The booking platform for travel agents. Flights, hotels, experiences, transfers and car rentals on one login, with 24/7 help. Register free.";
/** Title for an inner page: "Singapore | Flying Carpet". */
export const pageTitle = (...parts: string[]) => [...parts, SITE_NAME].join(" | ");

// Header and footer menu (H1). "What you can book" goes to the categories section (H3); Contact to the footer.
export const nav = [
  { label: "What you can book", href: "#journeys" },
  { label: "Why Flying Carpet", href: "#why-us" },
  { label: "Destinations", href: "#destinations" },
  { label: "About us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Links the client still has to send live in src/config.ts.
export { REGISTER_URL } from "./config";

// What you can book (H3): all five categories, in the fixed order (G4). Each card opens its panel in The platform (H7).
export const offers: { id: ProductId; title: string; stat: string; unit: string; img: string }[] = [
  { id: "flights", title: "Flights", stat: "400+", unit: "airlines", img: "/images/flights.webp" },
  // Unbranded resort photo (G15: no brand names in images; the old one showed a hotel sign).
  { id: "hotels", title: "Hotels", stat: "300,000+", unit: "hotels", img: u("photo-1571896349842-33c89424de2d") },
  { id: "experiences", title: "Experiences", stat: "400,000+", unit: "experiences", img: "/images/activities.webp" },
  { id: "transfers", title: "Transfers", stat: "Upfront", unit: "pricing", img: u("photo-1449965408869-eaa3f722e40d") },
  { id: "car-rentals", title: "Car rentals", stat: "Zero", unit: "booking fee. T&Cs apply.", img: u("photo-1630165356623-266076eaceb6") },
];

// Why Flying Carpet (H5): the client's Why Choose Us text, word for word.
export const whyUs = [
  { title: "One stop travel platform", text: "Find all the major travel products you need in one marketplace, built for you as a B2B partner." },
  {
    title: "Diverse travel content",
    text: "Sell flights (multi GDS, multi LCC and NDC), hotels, transfers, car rental, experiences, insurance, holidays and more.",
  },
  { title: "Last minute bookings", text: "Search and book flights right up to the day of departure." },
  { title: "Mobile friendly portal and app", text: "Use it on your computer, tablet or phone, even for last minute bookings on the go." },
  {
    title: "White label solutions",
    text: "Give your customers a branded experience with your own themes, branding and communications. Choose the subscription option that suits you.",
  },
  {
    title: "Multi currency wallets",
    text: "Hold funds in several currencies and manage wallet, credit and debit transactions automatically or manually. You also get balance monitoring and alerts.",
  },
  {
    title: "Flexible payments and collections",
    text: "Collect payments your way with multiple payment gateways, payment links and automated wallet top ups.",
  },
  { title: "Group travel requests", text: "Submit and manage your group bookings in one place." },
  {
    title: "Advanced Customer Profiling & Synchronization",
    text: "Save your customers' details once and use them across every product and in your back office.",
  },
  { title: "Ready to use reports", text: "Track your daily operations and business with standard reports." },
  {
    title: "Stay up to date",
    text: "Get product updates, offers and briefings automatically, and share your feedback right on the platform.",
  },
];

// About us numbers (H4).
export const stats = [
  { value: 100, suffix: "+", label: "countries" },
  { value: 1400, suffix: "+", label: words.travelAgents },
];

// The platform (H7) panel photos. The panel text is the client's Appendix C (src/categories.ts).
export const platformImages: Record<ProductId, string> = {
  flights: "/images/flights.webp",
  hotels: u("photo-1571896349842-33c89424de2d"),
  experiences: u("photo-1476514525535-07fb3b4ae5f1"),
  transfers: u("photo-1449965408869-eaa3f722e40d"),
  "car-rentals": u("photo-1630165356623-266076eaceb6"),
};

export const testimonials = [
  {
    name: "Priya Sharma",
    role: "Founder, Wanderlust Holidays",
    location: "Mumbai, India",
    avatar: u("photo-1531123897727-8f129e1688ce", 400),
    trip: "Italy",
    tripImg: "/location/italy-wide.webp",
    rating: 5,
    quote:
      "Flying Carpet turned a complicated three city Italy itinerary into something my clients still talk about. Flights, boutique stays and transfers all in one place. I quoted in an hour instead of a week.",
  },
  {
    name: "Aisha Rahman",
    role: "Owner, Blue Horizon Travels",
    location: "Dubai, UAE",
    avatar: u("photo-1524504388940-b1c1722653e1", 400),
    trip: "Bali",
    tripImg: "/location/bali-wide.webp",
    rating: 5,
    quote:
      "Our group of 24 had a flawless week in Bali: villas in Ubud, a sunrise trek up Mount Batur and seamless transfers. Commission was paid on time, which says everything about the partnership.",
  },
  {
    name: "Marco Rossi",
    role: "Travel Agent, Rossi Viaggi",
    location: "Milan, Italy",
    avatar: u("photo-1506794778202-cad84cf45f1d", 400),
    trip: "Portugal",
    tripImg: "/location/portugal-wide.webp",
    rating: 5,
    quote:
      "From Lisbon's trams to wine tastings in the Douro, every detail was handled. The destination guides help me sell with confidence, and my repeat bookings have grown steadily since we joined.",
  },
  {
    name: "Sophie Laurent",
    role: "Director, Horizon Voyages",
    location: "Paris, France",
    avatar: u("photo-1438761681033-6461ffad8d80", 400),
    trip: "India",
    tripImg: "/location/india-wide.webp",
    rating: 5,
    quote:
      "Rajasthan's palaces, Varanasi at dawn and a houseboat in Kerala, all in one seamless itinerary. The local guides were exceptional, and my clients called it the trip of a lifetime.",
  },
  {
    name: "James Carter",
    role: "Travel Advisor, Carter & Co.",
    location: "London, UK",
    avatar: u("photo-1500648767791-00dcc994a43e", 400),
    trip: "Romania",
    tripImg: "/location/romania.webp",
    rating: 5,
    quote:
      "Transylvania was a hard sell until I had Flying Carpet's catalogue. Castles, mountain lodges and private drivers, all bookable in minutes. It has become one of my best selling trips.",
  },
];

export const agentsImg = u("photo-1509316785289-025f5b846b35", 1600);
export const footerImg = u("photo-1469474968028-56623f02e42e", 2400);
