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
  // client
  cancun: [
    "The beach trip clients ask for when they need a break, and need it soon.",
    "Flights, hotels and transfers in one place, plus self drive cars with zero booking fee. T&Cs apply.",
  ],
};

export const linesFor = (id: string): Lines | undefined => lines[id];
