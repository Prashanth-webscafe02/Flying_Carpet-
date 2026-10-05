// FOR CLIENT REVIEW: the two lines for each destination (Appendix B), shown on its card (H6) and at
// the top of its page (D1). The client wrote the six marked "client"; we wrote the rest following
// their rules (to the agent, about 30 words, no prices, no airline or hotel names, no dashes).
// Keyed by destination id (see src/destinations/markets.ts).

export type Lines = [moment: string, book: string];

export const lines: Record<string, Lines> = {
  // client
  dubai: [
    "The trip clients ask for at short notice: a long weekend, a wedding, a stopover.",
    "Flight, hotel, airport transfer and experiences on one login, with your own markup on each.",
  ],
  // client
  bangkok: [
    "An easy yes when a client decides late and wants value for money.",
    "Flights and hotels in one search, then add transfers and experiences while your client is still on the call.",
  ],
  // client
  paris: [
    "The first stop on many of the Europe trips your clients plan.",
    "Hotels across the city for every budget, with transfers and experiences to complete the trip.",
  ],
  // client
  "new-york": [
    "Clients flying into New York often travel on within the US. Book those onward flights from home too.",
    "The long haul flight, the onward flights and the hotels on one login.",
  ],
  // client
  mauritius: [
    "A regular request for honeymoons and family beach breaks.",
    "Flights, resort stays and airport transfers in one booking, with experiences to fill the days.",
  ],
  // India list (ours)
  antalya: [
    "The summer beach request from families who want sea, sun and an easy all inclusive week.",
    "Flights, beach resorts and airport transfers on one login, with boat trips and old town tours to add.",
  ],
  cappadocia: [
    "Clients add it for the balloon sunrise they have seen online, often as two nights after Istanbul.",
    "Cave hotels, transfers from the airport and balloon flights booked together, so the add on takes minutes.",
  ],
  istanbul: [
    "A city break or a stopover that clients stretch into a few days once they see what is there.",
    "Flights, hotels on both sides of the Bosphorus, transfers and guided tours, all on one login.",
  ],
  "abu-dhabi": [
    "Families and theme park fans ask for it, often paired with a few days in Dubai.",
    "Flights, beach and city hotels, park tickets and the transfer between the two cities in one booking.",
  ],
  phuket: [
    "The beach week clients want when they need warm water and good value at short notice.",
    "Flights, beach resorts, island day trips and airport transfers on one login, quoted while your client waits.",
  ],
  bali: [
    "Honeymooners and wellness seekers ask for it, and many decide only weeks before travel.",
    "Villas and resorts across the island, private transfers and day tours, with your own markup on each.",
  ],
  singapore: [
    "A short city break for families, or a stopover your clients want to make more of.",
    "Flights, hotels, attraction tickets and airport transfers together, so the whole stay is ready in one search.",
  ],
  maldives: [
    "The honeymoon and anniversary request that usually comes with a date and a budget already in mind.",
    "Flights, island resorts and the seaplane or speedboat transfer in one booking, with experiences to add.",
  ],
  zurich: [
    "The way in for clients heading to the Swiss mountains, lakes and scenic trains.",
    "Flights, city and mountain hotels, rail friendly transfers and day trips, all on one login.",
  ],
  interlaken: [
    "Clients want the snow peaks and lake views, often as the centre of a Switzerland trip.",
    "Hotels with mountain views, transfers from Zurich and excursions to the peaks, booked in one place.",
  ],
  london: [
    "Summer holidays, family visits and theatre weekends make it a year round request.",
    "Flights, hotels across the city, airport transfers and attraction tickets, with your own markup on each.",
  ],
  rome: [
    "Clients ask for it as a first taste of Italy or as part of a longer Europe trip.",
    "Hotels near the sights, skip the queue tours and transfers, with flights in the same search.",
  ],
  barcelona: [
    "A city and beach combination clients choose for summer, football weekends and family trips.",
    "Flights, central hotels, attraction tickets and airport transfers on one login.",
  ],
  orlando: [
    "The theme park trip families plan around school holidays, and often book late.",
    "Flights, hotels near the parks, park tickets and self drive cars with zero booking fee. T&Cs apply.",
  ],
  "las-vegas": [
    "Celebrations, shows and road trip starts bring clients here, often with a few days of notice.",
    "Flights, Strip hotels, show tickets and canyon tours on one login, ready while your client is on the call.",
  ],
  "los-angeles": [
    "The start of many West Coast trips, with studios, beaches and the drive along the coast.",
    "Flights, hotels, studio tickets and self drive cars with zero booking fee. T&Cs apply.",
  ],
  "san-francisco": [
    "Clients add it to a West Coast trip or fly in for the bay, the bridge and the wine country.",
    "Flights, city hotels, day tours and car rentals in one booking, with your own markup on each.",
  ],
  "rio-de-janeiro": [
    "The bucket list request for beaches, the mountain views and the carnival season.",
    "Flights, beachfront hotels, transfers and guided tours booked together on one login.",
  ],
  "cusco-and-machu-picchu": [
    "Clients plan it as a once in a lifetime trip and need every step to connect.",
    "Flights into Cusco, hotels, the train and the entry to Machu Picchu arranged in one booking.",
  ],
  "buenos-aires": [
    "Clients come for the food, the tango and as the start of a longer South America trip.",
    "Flights, hotels in the best neighbourhoods, transfers and city tours on one login.",
  ],
  "iguazu-falls": [
    "Usually two nights added to a Brazil or Argentina trip, booked once clients see the falls.",
    "Hotels near the falls, park transfers and guided visits on both sides, with flights in the same search.",
  ],
  "galapagos-islands": [
    "A nature trip clients plan carefully, often for a milestone birthday or anniversary.",
    "Flights via the mainland, island stays, transfers and guided experiences booked together.",
  ],
  "gold-coast": [
    "Families and friends ask for its beaches and theme parks, often as part of an Australia trip.",
    "Flights, beach hotels, theme park tickets and airport transfers on one login.",
  ],
  sydney: [
    "The first stop on most Australia trips, and the city clients ask about first.",
    "Flights, harbour hotels, attraction tickets and transfers, with your own markup on each.",
  ],
  queenstown: [
    "Adventure seekers and honeymooners ask for its lakes, peaks and scenic drives.",
    "Flights, lakeside hotels, adventure experiences and self drive cars with zero booking fee. T&Cs apply.",
  ],
  melbourne: [
    "Clients come for the food, the sport and the coastal drive just outside the city.",
    "Flights, city hotels, day tours along the coast and airport transfers on one login.",
  ],
  fiji: [
    "Honeymooners and families ask for its islands when they want a calm beach escape.",
    "Flights, island resorts, boat transfers and experiences in one booking.",
  ],
  "cape-town": [
    "Clients ask for the mountain, the winelands and the coast, often with a safari after.",
    "Flights, hotels, winelands tours and self drive cars with zero booking fee. T&Cs apply.",
  ],
  "masai-mara": [
    "The safari request, timed by many clients around the great migration.",
    "Safari camps and lodges, light aircraft or road transfers and game drives booked together.",
  ],
  serengeti: [
    "Clients plan it for the wildlife and the migration, often with a beach stay to finish.",
    "Lodges and camps, transfers and game drives, with Zanzibar to add in the same booking.",
  ],
  "victoria-falls": [
    "Clients add the falls to a safari or plan a short trip around the view and the adventure.",
    "Hotels near the falls, transfers, river cruises and tours booked together on one login.",
  ],

  // client
  cancun: [
    "The beach trip clients ask for when they need a break, and need it soon.",
    "Flights, hotels and transfers in one place, plus self drive cars with zero booking fee. T&Cs apply.",
  ],
};

export const linesFor = (id: string): Lines | undefined => lines[id];
