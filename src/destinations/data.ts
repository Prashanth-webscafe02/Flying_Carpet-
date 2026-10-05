import { allLists, destinationNames, type RegionId } from "./markets";

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type ProductId = "flights" | "hotels" | "experiences" | "transfers" | "car-rentals";

export type Destination = {
  id: string;
  city: string;
  country: string;
  /** One of the nine regions in Appendix A. */
  region: RegionId;
  tagline: string;
  img: string;
  products: ProductId[];
  /** True while the destination uses the neutral placeholder photo. */
  needsPhoto?: boolean;
};

// The one product order used everywhere: flights, hotels, experiences, transfers, car rentals.
export const productOrder: ProductId[] = ["flights", "hotels", "experiences", "transfers", "car-rentals"];
const all = productOrder;

/** A destination's products, always in `productOrder`. */
export const productsOf = (d: Pick<Destination, "products">) => productOrder.filter((p) => d.products.includes(p));

// Destinations with their own photo and details today (Appendix A ids). Region comes from markets.ts.
const known: Record<string, Omit<Destination, "region">> = {
  "dubai": { id: "dubai", city: "Dubai", country: "UAE", tagline: "Modern city, extraordinary experiences", img: u("photo-1518684079-3c830dcef090"), products: all },
  "maldives": { id: "maldives", city: "Maldives", country: "Maldives", tagline: "Mythic islands and unforgettable stays", img: u("photo-1507525428034-b723cf961d3e"), products: ["flights", "hotels", "experiences", "transfers"] },
  "singapore": { id: "singapore", city: "Singapore", country: "Singapore", tagline: "A global city with endless possibilities", img: u("photo-1525625293386-3f8f99389edd"), products: all },
  "bangkok": { id: "bangkok", city: "Bangkok", country: "Thailand", tagline: "Vibrant culture and amazing value", img: u("photo-1508009603885-50cf7c579365"), products: all },
  "bali": { id: "bali", city: "Bali", country: "Indonesia", tagline: "Natural beauty and rich culture", img: "/location/bali-wide.webp", products: all },
  "istanbul": { id: "istanbul", city: "Istanbul", country: "Türkiye", tagline: "Where East meets West", img: u("photo-1524231757912-21f4fe3a7200"), products: all },
  "london": { id: "london", city: "London", country: "United Kingdom", tagline: "Iconic sights and timeless experiences", img: u("photo-1513635269975-59663e0ac1ad"), products: all },
  "new-york": { id: "new-york", city: "New York", country: "USA", tagline: "A city that never stops inspiring", img: u("photo-1496442226666-8d4d0e62e6e9"), products: all },
  "rome": { id: "rome", city: "Rome", country: "Italy", tagline: "History, art and la dolce vita", img: "/location/italy-wide.webp", products: all },
  "marrakech": { id: "marrakech", city: "Marrakech", country: "Morocco", tagline: "Souks, riads and Saharan skies", img: "/location/morocco-wide.webp", products: all },
  "paris": { id: "paris", city: "Paris", country: "France", tagline: "The art of living, elevated", img: u("photo-1502602898657-3e91760cbb34"), products: all },
  "tokyo": { id: "tokyo", city: "Tokyo", country: "Japan", tagline: "Tradition meeting tomorrow", img: u("photo-1540959733332-eab4deabeeaf"), products: all },
  "cape-town": { id: "cape-town", city: "Cape Town", country: "South Africa", tagline: "Where mountain meets ocean", img: u("photo-1580060839134-75a5edca2e99"), products: all },
  "sydney": { id: "sydney", city: "Sydney", country: "Australia", tagline: "Harbour city, endless light", img: u("photo-1506973035872-a4ec16b8e8d9"), products: all },
};

// Country for each destination in Appendix A that has no page content yet.
const countries: Record<string, string> = {
  bazaruto: "Mozambique", "cairo-and-the-nile": "Egypt", kruger: "South Africa", "masai-mara": "Kenya",
  mauritius: "Mauritius", "nairobi-and-mombasa": "Kenya", namibia: "Namibia", serengeti: "Tanzania",
  "victoria-falls": "Zimbabwe", zanzibar: "Tanzania", "chiang-mai": "Thailand", kyoto: "Japan", osaka: "Japan",
  phuket: "Thailand", auckland: "New Zealand", fiji: "Fiji", "gold-coast": "Australia",
  "great-barrier-reef": "Australia", melbourne: "Australia", perth: "Australia", queenstown: "New Zealand",
  tahiti: "French Polynesia", aruba: "Aruba", jamaica: "Jamaica", "punta-cana": "Dominican Republic",
  "turks-and-caicos": "Turks and Caicos", "us-virgin-islands": "US Virgin Islands", belize: "Belize",
  "costa-rica": "Costa Rica", guatemala: "Guatemala", panama: "Panama", roatan: "Honduras",
  amsterdam: "Netherlands", athens: "Greece", barcelona: "Spain", florence: "Italy", "french-riviera": "France",
  interlaken: "Switzerland", mykonos: "Greece", santorini: "Greece", venice: "Italy", zurich: "Switzerland",
  "abu-dhabi": "UAE", antalya: "Türkiye", cappadocia: "Türkiye", doha: "Qatar", israel: "Israel",
  jordan: "Jordan", oman: "Oman", cancun: "Mexico", hawaii: "USA", "las-vegas": "USA", "los-angeles": "USA",
  "los-cabos": "Mexico", miami: "USA", orlando: "USA", "puerto-vallarta": "Mexico", "san-francisco": "USA",
  "buenos-aires": "Argentina", cartagena: "Colombia", "cusco-and-machu-picchu": "Peru",
  "galapagos-islands": "Ecuador", "iguazu-falls": "Argentina", patagonia: "Argentina", "rio-de-janeiro": "Brazil",
};

/** Neutral photo for destinations whose real photo is still to come (client question 11). */
export const PLACEHOLDER_IMG = "/images/destination-placeholder.svg";

// All 79 destinations of Appendix A (regions and destinations A to Z), all five categories each (G4).
export const destinations: Destination[] = allLists.flatMap((r) =>
  r.ids.map((id) =>
    known[id]
      ? { ...known[id], region: r.region, products: all }
      : {
          id,
          city: destinationNames[id],
          country: countries[id] ?? destinationNames[id],
          region: r.region,
          tagline: "",
          img: PLACEHOLDER_IMG,
          products: all,
          needsPhoto: true,
        },
  ),
);

export const bannerImg = u("photo-1613395877344-13d4a8e0d49e", 1800);
export const specialistImg = u("photo-1544551763-46a013bb70d5", 1800);

// WhatsApp chat link with a prefilled message. The number lives in src/config.ts (placeholder until sent).
export { whatsappLink as whatsapp } from "../config";

/** Larger version of a photo URL for galleries (Unsplash `w=` parameter). */
export const bigPhoto = (src: string) => src.replace(/w=\d+/, "w=1600");

/** Full country name for location lines ("UAE" → "United Arab Emirates"). */
const countryNames: Record<string, string> = { UAE: "United Arab Emirates", USA: "United States" };
export const countryName = (country: string) => countryNames[country] ?? country;
