// Transfers and car rental: one shared info page per destination (no individual listings).
// Transfers: hero image, overview, vehicle types. Car rental: hero image, overview, rental car
// companies and car types.
// The vehicle types, rental companies and car types mirror the "Transfers for", "Rental Car
// Company" and "Type" groups on the booking portal. Dubai follows the portal reference
// (10 companies); the other destinations list the major brands usually found at their main
// airport. Replace them with the portal groups for each destination. Car types are the portal's
// nine everywhere.

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type HeroPhoto = { src: string; label: string };

// One hero image per page, showing the vehicle / car types usually available.
export const transferHero: Record<"road" | "sea", HeroPhoto> = {
  road: {
    src: u("photo-1787028331201-75a0abb8ab0e", 1800),
    label: "Shuttle van and SUV at an airport drop-off",
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
// Car types use the booking portal's own car pictures (cut-outs on white, saved in /public/images/cars).
const car = (file: string) => `/images/cars/${file}.webp`;
export const carTypePhotos: Record<string, string> = {
  "2/4 Door": car("2-4-door"),
  "4-5 Door": car("4-5-door"),
  SUV: car("suv"),
  "Open Air all terrain": car("open-air"),
  Limousine: car("limousine"),
  Special: car("special"),
  "2/3 Door": car("2-3-door"),
  "Passenger Van": car("passenger-van"),
  Convertible: car("convertible"),
};

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
const globalBrands = [
  "Alamo",
  "Avis",
  "Budget",
  "Enterprise",
  "Europcar",
  "Hertz",
  "National",
  "Sixt",
  "Thrifty",
];
// The booking portal's "Type" group, in its order. Every destination with car rental lists all nine.
const portalTypes = [
  "2/4 Door",
  "4-5 Door",
  "SUV",
  "Open Air all terrain",
  "Limousine",
  "Special",
  "2/3 Door",
  "Passenger Van",
  "Convertible",
];

export const mobility: Record<string, Mobility> = {
  dubai: {
    vehicles: road,
    port: "Dubai Harbour and Port Rashid cruise terminals",
    companies: [
      "Alamo",
      "Avis",
      "Budget",
      "Dollar",
      "Enterprise",
      "Europcar",
      "Hertz",
      "National",
      "Sixt",
      "Thrifty",
    ],
    carTypes: portalTypes,
  },
  maldives: {
    vehicles: ["Speedboat", "Seaplane", "Domestic flight"],
    companies: [],
    carTypes: [],
  },
  singapore: {
    vehicles: road,
    port: "Marina Bay Cruise Centre",
    companies: ["Avis", "Budget", "Europcar", "Hertz", "Sixt"],
    carTypes: portalTypes,
  },
  bangkok: {
    vehicles: road,
    companies: ["Avis", "Budget", "Europcar", "Hertz", "Sixt", "Thrifty"],
    carTypes: portalTypes,
  },
  bali: {
    vehicles: road,
    port: "Benoa cruise port",
    companies: ["Avis", "Hertz"],
    carTypes: portalTypes,
  },
  istanbul: {
    vehicles: road,
    port: "Galataport cruise terminal",
    companies: ["Avis", "Budget", "Enterprise", "Europcar", "Hertz", "Sixt"],
    carTypes: portalTypes,
  },
  london: {
    vehicles: road,
    port: "Southampton and Dover cruise terminals",
    companies: globalBrands,
    carTypes: portalTypes,
  },
  "new-york": {
    vehicles: road,
    port: "Manhattan and Brooklyn cruise terminals",
    companies: [
      "Alamo",
      "Avis",
      "Budget",
      "Dollar",
      "Enterprise",
      "Hertz",
      "National",
      "Sixt",
      "Thrifty",
    ],
    carTypes: portalTypes,
  },
  rajasthan: {
    vehicles: road,
    companies: ["Avis", "Europcar", "Hertz"],
    carTypes: portalTypes,
  },
  rome: {
    vehicles: road,
    port: "Civitavecchia cruise port",
    companies: [
      "Avis",
      "Budget",
      "Enterprise",
      "Europcar",
      "Hertz",
      "Maggiore",
      "Sixt",
    ],
    carTypes: portalTypes,
  },
  marrakech: {
    vehicles: road,
    companies: ["Avis", "Budget", "Europcar", "Hertz", "Sixt"],
    carTypes: portalTypes,
  },
  paris: {
    vehicles: road,
    companies: globalBrands,
    carTypes: portalTypes,
  },
  tokyo: {
    vehicles: road,
    port: "Tokyo International Cruise Terminal",
    companies: [
      "Nippon Rent-A-Car",
      "Nissan Rent a Car",
      "Orix Rent-A-Car",
      "Times Car Rental",
      "Toyota Rent a Car",
    ],
    carTypes: portalTypes,
  },
  lisbon: {
    vehicles: road,
    port: "Lisbon Cruise Terminal",
    companies: [
      "Avis",
      "Budget",
      "Enterprise",
      "Europcar",
      "Goldcar",
      "Hertz",
      "Sixt",
    ],
    carTypes: portalTypes,
  },
  "cape-town": {
    vehicles: road,
    port: "Cape Town Cruise Terminal (V&A Waterfront)",
    companies: [
      "Avis",
      "Budget",
      "Europcar",
      "First Car Rental",
      "Hertz",
      "Tempest Car Hire",
    ],
    carTypes: portalTypes,
  },
  brasov: {
    vehicles: ["Car", "SUV", "Minibus"],
    companies: ["Avis", "Enterprise", "Europcar", "Hertz", "Sixt"],
    carTypes: portalTypes,
  },
  sydney: {
    vehicles: road,
    port: "Overseas Passenger Terminal (Circular Quay)",
    companies: [
      "Avis",
      "Budget",
      "East Coast Car Rentals",
      "Europcar",
      "Hertz",
      "Sixt",
      "Thrifty",
    ],
    carTypes: portalTypes,
  },
};
