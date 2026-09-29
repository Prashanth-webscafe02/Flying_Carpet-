const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type ProductId = "flights" | "hotels" | "experiences" | "transfers" | "car-rentals";

export type Destination = {
  id: string;
  city: string;
  country: string;
  /** Region id, matching the "Which regions do you sell most?" step. */
  region: string;
  tagline: string;
  img: string;
  products: ProductId[];
  popular?: boolean;
};

// The one product order used everywhere: flights, hotels, experiences, transfers, car rentals.
export const productOrder: ProductId[] = ["flights", "hotels", "experiences", "transfers", "car-rentals"];
const all = productOrder;

/** A destination's products, always in `productOrder`. */
export const productsOf = (d: Pick<Destination, "products">) => productOrder.filter((p) => d.products.includes(p));

// Listed in "relevance" order for an agent with no picks yet.
export const destinations: Destination[] = [
  { id: "dubai", city: "Dubai", country: "UAE", region: "me", tagline: "Modern city, extraordinary experiences", img: u("photo-1518684079-3c830dcef090"), products: all, popular: true },
  { id: "maldives", city: "Maldives", country: "Maldives", region: "is", tagline: "Mythic islands and unforgettable stays", img: u("photo-1507525428034-b723cf961d3e"), products: ["flights", "hotels", "experiences", "transfers"], popular: true },
  { id: "singapore", city: "Singapore", country: "Singapore", region: "sea", tagline: "A global city with endless possibilities", img: u("photo-1525625293386-3f8f99389edd"), products: all, popular: true },
  { id: "bangkok", city: "Bangkok", country: "Thailand", region: "sea", tagline: "Vibrant culture and amazing value", img: u("photo-1508009603885-50cf7c579365"), products: all },
  { id: "bali", city: "Bali", country: "Indonesia", region: "sea", tagline: "Natural beauty and rich culture", img: "/location/bali-wide.webp", products: all, popular: true },
  { id: "istanbul", city: "Istanbul", country: "Türkiye", region: "eu", tagline: "Where East meets West", img: u("photo-1524231757912-21f4fe3a7200"), products: all },
  { id: "london", city: "London", country: "United Kingdom", region: "eu", tagline: "Iconic sights and timeless experiences", img: u("photo-1513635269975-59663e0ac1ad"), products: all, popular: true },
  { id: "new-york", city: "New York", country: "USA", region: "na", tagline: "A city that never stops inspiring", img: u("photo-1496442226666-8d4d0e62e6e9"), products: all },
  { id: "rajasthan", city: "Rajasthan", country: "India", region: "is", tagline: "Forts, palaces and desert colour", img: "/location/india-wide.webp", products: all },
  { id: "rome", city: "Rome", country: "Italy", region: "eu", tagline: "History, art and la dolce vita", img: "/location/italy-wide.webp", products: all },
  { id: "marrakech", city: "Marrakech", country: "Morocco", region: "af", tagline: "Souks, riads and Saharan skies", img: "/location/morocco-wide.webp", products: all },
  { id: "paris", city: "Paris", country: "France", region: "eu", tagline: "The art of living, elevated", img: u("photo-1502602898657-3e91760cbb34"), products: all, popular: true },
  { id: "tokyo", city: "Tokyo", country: "Japan", region: "sea", tagline: "Tradition meeting tomorrow", img: u("photo-1540959733332-eab4deabeeaf"), products: all },
  { id: "lisbon", city: "Lisbon", country: "Portugal", region: "eu", tagline: "Tiled streets and Atlantic light", img: "/location/portugal-wide.webp", products: all },
  { id: "cape-town", city: "Cape Town", country: "South Africa", region: "af", tagline: "Where mountain meets ocean", img: u("photo-1580060839134-75a5edca2e99"), products: all },
  { id: "brasov", city: "Brașov", country: "Romania", region: "eu", tagline: "Castles, forests and old-world charm", img: "/location/romania.webp", products: all },
  { id: "sydney", city: "Sydney", country: "Australia", region: "oc", tagline: "Harbour city, endless light", img: u("photo-1506973035872-a4ec16b8e8d9"), products: all },
];

export const bannerImg = u("photo-1613395877344-13d4a8e0d49e", 1800);
export const specialistImg = u("photo-1544551763-46a013bb70d5", 1800);

// Placeholder contact number (same as the footer's) until the real WhatsApp line is provided.
const WHATSAPP_NUMBER = "1012345678";
export const whatsapp = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/** Larger version of a photo URL for galleries (Unsplash `w=` parameter). */
export const bigPhoto = (src: string) => src.replace(/w=\d+/, "w=1600");

/** Full country name for location lines ("UAE" → "United Arab Emirates"). */
const countryNames: Record<string, string> = { UAE: "United Arab Emirates", USA: "United States" };
export const countryName = (country: string) => countryNames[country] ?? country;
