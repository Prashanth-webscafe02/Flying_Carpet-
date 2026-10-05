import type { Market } from "../market";

// Appendix A of the changes document: destinations by market, in the client's order of priority.
// Each country site shows its own list by default; "See all destinations" shows all 79.

export type RegionId =
  | "africa"
  | "asia"
  | "australasia"
  | "caribbean"
  | "central-america"
  | "europe"
  | "middle-east"
  | "north-america"
  | "south-america";

export const regionNames: Record<RegionId, string> = {
  africa: "Africa",
  asia: "Asia",
  australasia: "Australasia",
  caribbean: "Caribbean",
  "central-america": "Central America",
  europe: "Europe",
  "middle-east": "Middle East",
  "north-america": "North America",
  "south-america": "South America",
};

/** Destination id from its name: "Cusco and Machu Picchu" -> "cusco-and-machu-picchu". */
export const slugOf = (name: string) =>
  name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type Group = { region: RegionId; names: string[] };

const za: Group[] = [
  { region: "africa", names: ["Mauritius", "Zanzibar", "Victoria Falls", "Bazaruto", "Namibia"] },
  { region: "europe", names: ["Paris", "London", "Rome", "Barcelona", "Amsterdam"] },
  { region: "asia", names: ["Phuket", "Bali", "Bangkok", "Maldives", "Singapore"] },
  { region: "north-america", names: ["Orlando", "Miami", "New York", "Las Vegas", "Los Angeles"] },
  { region: "middle-east", names: ["Dubai", "Istanbul", "Abu Dhabi", "Antalya", "Doha"] },
];

const india: Group[] = [
  { region: "middle-east", names: ["Dubai", "Antalya", "Cappadocia", "Istanbul", "Abu Dhabi"] },
  { region: "asia", names: ["Bangkok", "Phuket", "Bali", "Singapore", "Maldives"] },
  { region: "europe", names: ["Paris", "Zurich", "Interlaken", "London", "Rome", "Barcelona"] },
  { region: "north-america", names: ["Orlando", "Las Vegas", "New York", "Los Angeles", "San Francisco"] },
  { region: "south-america", names: ["Rio de Janeiro", "Cusco and Machu Picchu", "Buenos Aires", "Iguazu Falls", "Galapagos Islands"] },
  { region: "australasia", names: ["Gold Coast", "Sydney", "Queenstown", "Melbourne", "Fiji"] },
  { region: "africa", names: ["Mauritius", "Cape Town", "Masai Mara", "Serengeti", "Victoria Falls"] },
];

const us: Group[] = [
  { region: "europe", names: ["Paris", "French Riviera", "Rome", "Venice", "Florence", "Barcelona", "Athens", "Santorini", "Mykonos", "London"] },
  { region: "north-america", names: ["Orlando", "Las Vegas", "Cancun", "Los Cabos", "Puerto Vallarta", "Hawaii"] },
  { region: "asia", names: ["Tokyo", "Kyoto", "Osaka", "Phuket", "Bali", "Bangkok", "Chiang Mai", "Maldives", "Singapore"] },
  { region: "caribbean", names: ["Jamaica", "Punta Cana", "Aruba", "Turks and Caicos", "US Virgin Islands"] },
  { region: "south-america", names: ["Cusco and Machu Picchu", "Rio de Janeiro", "Cartagena", "Buenos Aires", "Patagonia"] },
  { region: "central-america", names: ["Costa Rica", "Belize", "Guatemala", "Panama", "Roatan"] },
  { region: "middle-east", names: ["Dubai", "Istanbul", "Cappadocia", "Jordan", "Israel", "Abu Dhabi", "Oman"] },
  { region: "africa", names: ["Cape Town", "Kruger", "Cairo and the Nile", "Zanzibar", "Serengeti", "Nairobi and Mombasa", "Marrakech"] },
  { region: "australasia", names: ["Tahiti", "Sydney", "Gold Coast", "Great Barrier Reef", "Queenstown", "Auckland", "Fiji", "Perth"] },
];

// "See all destinations": all 79, regions and destinations A to Z (as in Appendix A).
const all: Group[] = [
  { region: "africa", names: ["Bazaruto", "Cairo and the Nile", "Cape Town", "Kruger", "Marrakech", "Masai Mara", "Mauritius", "Nairobi and Mombasa", "Namibia", "Serengeti", "Victoria Falls", "Zanzibar"] },
  { region: "asia", names: ["Bali", "Bangkok", "Chiang Mai", "Kyoto", "Maldives", "Osaka", "Phuket", "Singapore", "Tokyo"] },
  { region: "australasia", names: ["Auckland", "Fiji", "Gold Coast", "Great Barrier Reef", "Melbourne", "Perth", "Queenstown", "Sydney", "Tahiti"] },
  { region: "caribbean", names: ["Aruba", "Jamaica", "Punta Cana", "Turks and Caicos", "US Virgin Islands"] },
  { region: "central-america", names: ["Belize", "Costa Rica", "Guatemala", "Panama", "Roatan"] },
  { region: "europe", names: ["Amsterdam", "Athens", "Barcelona", "Florence", "French Riviera", "Interlaken", "London", "Mykonos", "Paris", "Rome", "Santorini", "Venice", "Zurich"] },
  { region: "middle-east", names: ["Abu Dhabi", "Antalya", "Cappadocia", "Doha", "Dubai", "Israel", "Istanbul", "Jordan", "Oman"] },
  { region: "north-america", names: ["Cancun", "Hawaii", "Las Vegas", "Los Angeles", "Los Cabos", "Miami", "New York", "Orlando", "Puerto Vallarta", "San Francisco"] },
  { region: "south-america", names: ["Buenos Aires", "Cartagena", "Cusco and Machu Picchu", "Galapagos Islands", "Iguazu Falls", "Patagonia", "Rio de Janeiro"] },
];

export type RegionList = { region: RegionId; name: string; ids: string[] };

const toLists = (groups: Group[]): RegionList[] =>
  groups.map((g) => ({ region: g.region, name: regionNames[g.region], ids: g.names.map(slugOf) }));

/** Each market's regions and destinations, in the client's order (Appendix A). */
export const marketLists: Record<Market, RegionList[]> = {
  za: toLists(za),
  in: toLists(india),
  us: toLists(us),
};

/** All 79 destinations by region, A to Z. */
export const allLists: RegionList[] = toLists(all);

/** Display name for every destination id. */
export const destinationNames: Record<string, string> = Object.fromEntries(
  all.flatMap((g) => g.names.map((n) => [slugOf(n), n])),
);

/** Region of any destination (from the full list). */
export const regionOf = (id: string): RegionId | undefined =>
  allLists.find((r) => r.ids.includes(id))?.region;

/** A market's destinations in "Our ranking" order: its regions in order, then each region's destinations in order. */
export const rankingFor = (m: Market) => marketLists[m].flatMap((r) => r.ids);
