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

  // South Africa list (ours)
  zanzibar: [
    "The beach finish clients want after a safari, or a short island escape on its own.",
    "Flights, beach resorts, spice and stone town tours and airport transfers on one login.",
  ],
  bazaruto: [
    "A quiet island request for honeymoons and anglers who want empty beaches and warm water.",
    "Flights to the coast, island lodges and the boat or light aircraft transfer arranged together.",
  ],
  namibia: [
    "Clients who want dunes, desert lodges and a self drive adventure ask for it by name.",
    "Flights, lodges along the route and self drive cars with zero booking fee. T&Cs apply.",
  ],
  amsterdam: [
    "A short city break by the canals, often added to a longer Europe trip.",
    "Flights, canal side hotels, museum tickets and airport transfers on one login.",
  ],
  miami: [
    "Beach weekends, cruise departures and city breaks make it a frequent short notice request.",
    "Flights, beach hotels, port transfers and self drive cars with zero booking fee. T&Cs apply.",
  ],
  doha: [
    "A stopover clients stretch into a short break, or a quick trip for events and family visits.",
    "Flights, city hotels, desert tours and airport transfers booked together on one login.",
  ],
  // US list (ours)
  "french-riviera": [
    "Clients ask for the coast, the hilltop villages and a summer of sea and sun.",
    "Flights to Nice, seaside hotels, transfers along the coast and day trips on one login.",
  ],
  venice: [
    "A bucket list stop clients add to an Italy trip, often for two or three nights.",
    "Hotels by the canals, water taxi transfers and guided walks, with flights in the same search.",
  ],
  florence: [
    "Art lovers and food lovers ask for it, usually as part of an Italy trip with Tuscany.",
    "City hotels, gallery tickets, wine country tours and train friendly transfers in one booking.",
  ],
  athens: [
    "The first stop for clients heading to the Greek islands, with a day or two for the sights.",
    "Flights, city hotels, guided visits and port transfers for the island ferries on one login.",
  ],
  santorini: [
    "The honeymoon and sunset request, usually booked as part of a Greek islands trip.",
    "Cliffside hotels, ferry or flight connections, transfers and boat trips arranged together.",
  ],
  mykonos: [
    "Clients ask for its beaches and nights out, often paired with Santorini.",
    "Beach hotels, island connections, transfers and boat days booked in one place.",
  ],
  "los-cabos": [
    "A beach and golf request from clients who want a short, warm break.",
    "Flights, beach resorts, airport transfers and boat trips on one login, with your own markup.",
  ],
  "puerto-vallarta": [
    "Families and couples ask for its beaches and old town charm when they want sun soon.",
    "Flights, beach resorts, transfers and day tours booked together while your client is on the call.",
  ],
  hawaii: [
    "Honeymoons, family holidays and milestone trips often come with more than one island in mind.",
    "Flights, island hotels, inter island connections and self drive cars with zero booking fee. T&Cs apply.",
  ],
  tokyo: [
    "Clients ask for the food, the culture and the cherry blossom or autumn seasons.",
    "Flights, city hotels, rail friendly transfers and guided tours on one login.",
  ],
  kyoto: [
    "The temples and gardens clients add to a Japan trip, usually by train from Tokyo.",
    "Traditional and modern hotels, guided visits and transfers, booked with the rest of the trip.",
  ],
  osaka: [
    "Food lovers and families add it to a Japan trip for the street food and the theme park.",
    "City hotels, park tickets, food tours and airport transfers in one booking.",
  ],
  "chiang-mai": [
    "Clients add the north of Thailand for temples, elephants and a slower pace.",
    "Flights, boutique hotels, ethical elephant experiences and transfers on one login.",
  ],
  jamaica: [
    "A beach and music request from couples and families who want an easy island break.",
    "Flights, beach resorts, airport transfers and island tours booked together.",
  ],
  "punta-cana": [
    "The all inclusive beach week clients ask for when they want to switch off, and soon.",
    "Flights, beach resorts and airport transfers in one booking, with excursions to add.",
  ],
  aruba: [
    "Clients choose it for steady sunshine and calm beaches at almost any time of year.",
    "Flights, beach hotels, transfers and snorkel trips on one login.",
  ],
  "turks-and-caicos": [
    "A quiet luxury beach request, often for honeymoons and special birthdays.",
    "Flights, beach resorts, airport transfers and boat days arranged in one booking.",
  ],
  "us-virgin-islands": [
    "An easy island trip for clients who want beaches and sailing close to home.",
    "Flights, island hotels, ferry transfers and sailing trips booked together.",
  ],
  cartagena: [
    "Clients ask for its colourful old town and nearby islands for a warm city and beach break.",
    "Flights, old town hotels, island boat trips and transfers on one login.",
  ],
  patagonia: [
    "Hikers and nature lovers plan it for glaciers and peaks, often months ahead.",
    "Flights, lodges, transfers and guided excursions arranged together, step by step.",
  ],
  "costa-rica": [
    "Families and nature lovers ask for rainforest, volcanoes and two coasts in one trip.",
    "Flights, eco lodges, transfers and self drive cars with zero booking fee. T&Cs apply.",
  ],
  belize: [
    "Divers and adventurers ask for the reef, the jungle and the Mayan ruins.",
    "Flights, island and jungle lodges, transfers and dive trips booked together.",
  ],
  guatemala: [
    "Clients come for the lake, the volcanoes and the colonial town of Antigua.",
    "Flights, hotels, transfers between the highlights and guided tours on one login.",
  ],
  panama: [
    "A city and island trip clients choose for the canal, the beaches and easy connections.",
    "Flights, city and island hotels, canal tours and transfers in one booking.",
  ],
  roatan: [
    "Divers and beach lovers ask for its reef and calm Caribbean water.",
    "Flights, beach resorts, airport transfers and dive trips arranged together.",
  ],
  jordan: [
    "Clients plan it around Petra and the desert, often with a night at the Dead Sea.",
    "Flights, hotels and camps, private transfers and guided visits on one login.",
  ],
  israel: [
    "Faith, history and food bring clients here, often with a set list of places to see.",
    "Flights, hotels in each city, transfers and guided tours booked in one place.",
  ],
  oman: [
    "Clients ask for desert camps, mountain villages and quiet beaches in one trip.",
    "Flights, hotels and desert camps, transfers and self drive cars with zero booking fee. T&Cs apply.",
  ],
  kruger: [
    "The safari clients ask for when they want the big five on a short trip.",
    "Safari lodges, airport transfers and game drives booked together, with flights in the same search.",
  ],
  "cairo-and-the-nile": [
    "Clients plan it for the pyramids and a Nile cruise, often as one trip.",
    "Flights, Cairo hotels, the cruise, transfers and guided visits arranged in one booking.",
  ],
  "nairobi-and-mombasa": [
    "A safari and beach combination clients ask for in one easy trip.",
    "Flights, safari lodges, beach hotels and transfers between them on one login.",
  ],
  marrakech: [
    "Clients ask for the souks, the riads and a night in the desert.",
    "Flights, riads and hotels, airport transfers and desert or mountain tours booked together.",
  ],
  tahiti: [
    "The overwater honeymoon request, usually with another island in the plan.",
    "Flights, island resorts, inter island connections and transfers in one booking.",
  ],
  "great-barrier-reef": [
    "Divers and families ask for the reef as part of an Australia trip.",
    "Flights, reef side hotels, boat trips and transfers arranged together on one login.",
  ],
  auckland: [
    "The way in for New Zealand trips, with harbour days before the road trip starts.",
    "Flights, city hotels, day tours and self drive cars with zero booking fee. T&Cs apply.",
  ],
  perth: [
    "Clients come for the beaches, the wine region and the start of a west coast drive.",
    "Flights, city and beach hotels, day tours and car rentals in one booking.",
  ],

  // client
  cancun: [
    "The beach trip clients ask for when they need a break, and need it soon.",
    "Flights, hotels and transfers in one place, plus self drive cars with zero booking fee. T&Cs apply.",
  ],
};

export const linesFor = (id: string): Lines | undefined => lines[id];
