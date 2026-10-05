// Transfers and car rental: one shared info page per destination (no individual listings).
// Transfers: hero image, overview, vehicle types. Car rental: hero image, overview, rental car
// companies and car types.
// The vehicle types, rental companies and car types mirror the "Transfers for", "Rental Car
// Company" and "Type" groups on the booking portal.
// The companies and car types of each destination come from a portal search at its main airport
// (1-day rental, October 2026); a car type is listed only where the portal had a real picture for it.

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type HeroPhoto = { src: string; label: string };

// One hero image per page, showing the vehicle / car types usually available.
export const transferHero: Record<"road" | "sea", HeroPhoto> = {
  road: {
    src: u("photo-1787028331201-75a0abb8ab0e", 1800),
    label: "Shuttle van and SUV at an airport drop off",
  },
  sea: {
    src: u("photo-1512100356356-de1b84283e18", 1800),
    label: "Seaplane arriving at a Maldives resort island",
  },
};

export const carRentalHero: HeroPhoto = {
  src: u("photo-1630165356623-266076eaceb6", 1800),
  label: "Hatchbacks, sedans and SUVs parked in a row",
};
export const carRentalPhotos = [
  carRentalHero.src,
  u("photo-1492144534655-ae79c964c9d7", 1800),
  u("photo-1519641471654-76ce0107ad1b", 1800),
];

// One photo per transfer vehicle type, shown on the type cards.
export const vehiclePhotos: Record<string, string> = {
  Shuttle: u("photo-1787028331201-75a0abb8ab0e", 640),
  Car: u("photo-1546614042-7df3c24c9e5d", 640),
  SUV: u("photo-1650959818516-03d68079f9a0", 640),
  Minibus: u("photo-1715340614342-899407bed6dd", 640),
  Speedboat: u("photo-1746633163947-0f60358625b6", 640),
  Seaplane: u("photo-1550259979-ffa0383e2b5e", 640),
  "Domestic flight": u("photo-1706723532458-392730ad1277", 640),
};
// Car types use the booking portal's own car pictures for that destination's airport (cut-outs on
// white), saved as /public/images/cars/<destination>/<type>.webp.
export const carPhoto = (destination: string, type: string) =>
  `/images/cars/${destination}/${type.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.webp`;

// Rental company logos in /public/brands/rental. Companies without one show their name instead.
const logo = (file: string) => `/brands/rental/${file}`;
export const companyLogos: Record<string, string> = {
  Alamo: logo("alamo.svg"),
  Avis: logo("avis.svg"),
  Budget: logo("budget.svg"),
  Dollar: logo("dollar.gif"),
  Enterprise: logo("enterprise.svg"),
  Europcar: logo("europcar.svg"),
  Hertz: logo("hertz.svg"),
  Maggiore: logo("maggiore.png"),
  National: logo("national.svg"),
  "Nippon Rent-A-Car": logo("nippon.svg"),
  "Orix Rent-A-Car": logo("orix.svg"),
  Sixt: logo("sixt.svg"),
  Thrifty: logo("thrifty.svg"),
  "Times Car Rental": logo("times.png"),
};

export type Mobility = {
  /** Vehicle types for transfers ("Transfers for" group). */
  vehicles: string[];
  /** Cruise port served, if any (adds port pickups to the overview). */
  port?: string;
  /** Rental car companies ("Rental Car Company" group). Empty = no car rental. */
  companies: string[];
  /** Car body types ("Type" group). */
  carTypes: string[];
};

const road = ["Shuttle", "Car", "SUV", "Minibus"];

export const mobility: Record<string, Mobility> = {
  dubai: {
    vehicles: road,
    port: "Dubai Harbour and Port Rashid cruise terminals",
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Europcar", "Hertz", "National", "Sixt", "Thrifty"],
    carTypes: ["2/4 Door", "4 to 5 Door", "SUV", "Open Air all terrain", "Limousine", "Special", "2/3 Door", "Passenger Van", "Convertible"],
  },
  maldives: {
    vehicles: ["Speedboat", "Seaplane", "Domestic flight"],
    companies: [],
    carTypes: [],
  },
  singapore: {
    vehicles: road,
    port: "Marina Bay Cruise Centre",
    companies: ["Hertz", "Sixt"],
    carTypes: ["4-5 Door", "SUV", "Passenger Van", "Sport"],
  },
  bangkok: {
    vehicles: road,
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Europcar", "Hertz", "National", "Sixt", "Thrifty"],
    carTypes: ["4-5 Door", "Passenger Van", "2/4 Door", "SUV", "Pick Up extended Cab", "Wagon/Estate"],
  },
  bali: {
    vehicles: road,
    port: "Benoa cruise port",
    companies: ["Avis", "Europcar"],
    carTypes: ["Monospace", "Passenger Van"],
  },
  istanbul: {
    vehicles: road,
    port: "Galataport cruise terminal",
    companies: ["Alamo", "Avis", "Budget", "Enterprise", "Europcar", "Hertz", "National", "Sixt"],
    carTypes: ["4-5 Door", "Wagon/Estate", "SUV", "Passenger Van", "Monospace", "2/4 Door"],
  },
  london: {
    vehicles: road,
    port: "Southampton and Dover cruise terminals",
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Europcar", "Hertz", "National", "Sixt", "Thrifty"],
    carTypes: ["4-5 Door", "2/3 Door", "SUV", "Passenger Van", "2/4 Door", "Wagon/Estate", "Special"],
  },
  "new-york": {
    vehicles: road,
    port: "Manhattan and Brooklyn cruise terminals",
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Hertz", "National", "Payless", "Sixt", "Thrifty"],
    carTypes: ["Passenger Van", "2/4 Door", "SUV", "Open Air all terrain", "Pick Up Regular Cab", "Recreational"],
  },
  rajasthan: {
    vehicles: road,
    companies: ["Avis", "Europcar"],
    carTypes: ["4-5 Door", "Passenger Van", "2/4 Door"],
  },
  rome: {
    vehicles: road,
    port: "Civitavecchia cruise port",
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Europcar", "Hertz", "National", "Sixt", "Thrifty"],
    carTypes: ["2/3 Door", "4 to 5 Door", "SUV", "Wagon/Estate", "Passenger Van", "Convertible", "Limousine", "Coupe", "2/4 Door"],
  },
  marrakech: {
    vehicles: road,
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Europcar", "Hertz", "National", "Sixt", "Thrifty"],
    carTypes: ["4-5 Door", "SUV", "2/4 Door", "Monospace", "2/3 Door", "Passenger Van", "Limousine", "Wagon/Estate", "Special"],
  },
  paris: {
    vehicles: road,
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Europcar", "Hertz", "National", "Sixt", "Thrifty"],
    carTypes: ["Passenger Van", "4 to 5 Door", "2/4 Door", "SUV", "2/3 Door", "Wagon/Estate", "Monospace", "Limousine"],
  },
  tokyo: {
    vehicles: road,
    port: "Tokyo International Cruise Terminal",
    companies: ["Alamo", "Avis", "Budget", "Enterprise", "Europcar", "Hertz", "National", "Sixt"],
    carTypes: ["2/4 Door", "SUV", "4 to 5 Door", "Wagon/Estate", "Passenger Van", "Monospace", "Pick Up Regular Cab"],
  },
  lisbon: {
    vehicles: road,
    port: "Lisbon Cruise Terminal",
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Europcar", "Hertz", "National", "Sixt", "Thrifty"],
    carTypes: ["4-5 Door", "2/4 Door", "SUV", "Wagon/Estate", "Monospace", "Passenger Van", "2/3 Door", "Convertible", "Sport"],
  },
  "cape-town": {
    vehicles: road,
    port: "Cape Town Cruise Terminal (V&A Waterfront)",
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Europcar", "Hertz", "National", "Sixt", "Thrifty"],
    carTypes: ["2/4 Door", "4 to 5 Door", "SUV", "Pick Up Regular Cab", "Passenger Van", "Pick Up extended Cab", "Special", "Monospace"],
  },
  brasov: {
    vehicles: ["Car", "SUV", "Minibus"],
    companies: ["Alamo", "Avis", "Budget", "Dollar", "Enterprise", "Europcar", "Hertz", "National", "Sixt", "Thrifty"],
    carTypes: ["4-5 Door", "Wagon/Estate", "SUV", "Passenger Van", "2/4 Door"],
  },
  sydney: {
    vehicles: road,
    port: "Overseas Passenger Terminal (Circular Quay)",
    companies: ["Avis", "Budget", "Dollar", "Europcar", "Hertz", "Sixt", "Thrifty"],
    carTypes: ["4-5 Door", "SUV", "Passenger Van", "Pick Up extended Cab", "Special", "2/4 Door", "Convertible", "Sport", "Pick Up Regular Cab"],
  },
};
