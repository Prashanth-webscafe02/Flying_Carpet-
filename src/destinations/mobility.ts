// Transfers and car rental: one shared info page per destination (no individual listings).
// Transfers: hero image, overview, vehicle types. Car rental: hero image, overview, rental car
// companies and car types.
// The vehicle types, rental companies and car types mirror the "Transfers for", "Rental Car
// Company" and "Type" groups on the booking portal. Dubai follows the portal reference
// (10 companies, 11 car types); the other destinations list the major brands usually found at
// their main airport. Replace them with the portal groups for each destination.

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
const coreTypes = ["2/4 Door", "4-5 Door", "SUV", "Wagon/Estate", "Minivan"];

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
    carTypes: [
      "2/4 Door",
      "4-5 Door",
      "SUV",
      "Coupe",
      "Convertible",
      "Wagon/Estate",
      "Minivan",
      "Van",
      "Pick up",
      "Sports car",
      "Crossover",
    ],
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
    carTypes: coreTypes,
  },
  bangkok: {
    vehicles: road,
    companies: ["Avis", "Budget", "Europcar", "Hertz", "Sixt", "Thrifty"],
    carTypes: ["2/4 Door", "4-5 Door", "SUV", "Pick up", "Minivan", "Van"],
  },
  bali: {
    vehicles: road,
    port: "Benoa cruise port",
    companies: ["Avis", "Hertz"],
    carTypes: ["4-5 Door", "SUV", "Minivan"],
  },
  istanbul: {
    vehicles: road,
    port: "Galataport cruise terminal",
    companies: ["Avis", "Budget", "Enterprise", "Europcar", "Hertz", "Sixt"],
    carTypes: coreTypes,
  },
  london: {
    vehicles: road,
    port: "Southampton and Dover cruise terminals",
    companies: globalBrands,
    carTypes: [...coreTypes, "Convertible", "Van"],
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
    carTypes: [...coreTypes, "Convertible", "Pick up", "Van"],
  },
  rajasthan: {
    vehicles: road,
    companies: ["Avis", "Europcar", "Hertz"],
    carTypes: ["4-5 Door", "SUV", "Minivan"],
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
    carTypes: [...coreTypes, "Convertible"],
  },
  marrakech: {
    vehicles: road,
    companies: ["Avis", "Budget", "Europcar", "Hertz", "Sixt"],
    carTypes: ["2/4 Door", "4-5 Door", "SUV", "Minivan"],
  },
  paris: {
    vehicles: road,
    companies: globalBrands,
    carTypes: [...coreTypes, "Convertible", "Van"],
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
    carTypes: ["2/4 Door", "4-5 Door", "SUV", "Wagon/Estate", "Minivan"],
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
    carTypes: [...coreTypes, "Convertible"],
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
    carTypes: ["2/4 Door", "4-5 Door", "SUV", "Pick up", "Minivan"],
  },
  brasov: {
    vehicles: ["Car", "SUV", "Minibus"],
    companies: ["Avis", "Enterprise", "Europcar", "Hertz", "Sixt"],
    carTypes: ["2/4 Door", "4-5 Door", "SUV", "Wagon/Estate"],
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
    carTypes: [...coreTypes, "Convertible", "Van"],
  },
};
