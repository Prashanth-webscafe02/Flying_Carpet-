import type { ProductId } from "./destinations/data";

// The client's category descriptions (Appendix C of the changes document), word for word.
// Used by The platform (H7), the destination category tabs (D3) and the listing why boxes (L3).
export type Category = {
  id: ProductId;
  title: string;
  /** Opening line. */
  intro: string;
  /** "Title: text" points, in the client's order. */
  points: { title: string; text: string }[];
  /** A closing line with no title, where the client has one. */
  note?: string;
};

export const categories: Category[] = [
  {
    id: "flights",
    title: "Flights",
    intro:
      "Get negotiated, low cost and competitively priced fares from a wide range of airlines, including for last minute travel.",
    points: [
      { title: "Agency commissions", text: "Earn attractive agency commissions on selected airline fares." },
      { title: "NDC content", text: "Access NDC content through GDS, direct and consolidator sources." },
      { title: "Clear fare options", text: "Choose from multiple fare types with clear labels, fare families and descriptions." },
      { title: "Regional ultra low cost carriers", text: "Offer regional ultra low cost carriers for wider market coverage." },
      {
        title: "Extras on the platform",
        text: "Book seats, meals, baggage and other extras for your customers on the platform, for GDS and low cost carrier flights.",
      },
      { title: "Professional quotes", text: "Create professional quotes with upsell options." },
      {
        title: "Secure card payments",
        text: "Pay securely with PCI DSS compliant card payments, including card pass through accepted by airlines.",
      },
      {
        title: "Last minute and same day booking",
        text: "Search and book last minute and same day flights, right up to the day of departure.",
      },
    ],
  },
  {
    id: "hotels",
    title: "Hotels",
    intro:
      "Choose from a large inventory of properties across many destinations. You see the total price from the first page, with no hidden credit card or payment fees.",
    points: [
      { title: "Last minute stays", text: "Find and book rooms for your customers' last minute trips." },
      { title: "Wide coverage", text: "Find the right stay for your customers across a broad range of properties and destinations." },
      { title: "Clear pricing", text: "See the total price you pay us from the first page, with no hidden credit card or payment fees." },
      { title: "Flexible options", text: "Choose from many room types, with refundable and non refundable rates." },
      {
        title: "Clear cancellation policies",
        text: "See the cancellation and penalty terms on the platform before you book, so you and your customers know the terms up front.",
      },
    ],
    note: "City taxes and resort fees, where applicable, are shown separately and paid directly to the hotel.",
  },
  {
    id: "experiences",
    title: "Experiences",
    intro:
      "Offer your customers activities and experiences for every budget, from affordable options to premium and luxury.",
    points: [
      { title: "Last minute activities", text: "Find things to do for your customers, even at short notice." },
      { title: "Something for every budget", text: "Choose from affordable, premium and luxury experiences." },
      { title: "Wide range", text: "Find experiences across many destinations, lasting from one hour to several days." },
    ],
  },
  {
    id: "transfers",
    title: "Transfers",
    intro: "Book airport, train station, port and accommodation transfers for your customers, with upfront pricing.",
    points: [
      { title: "Last minute transfers", text: "Arrange a transfer for your customers, even close to travel time." },
      { title: "Every journey covered", text: "Book transfers to and from airports, train stations, ports and accommodations." },
      {
        title: "Wide range of vehicles",
        text: "Choose from cars, hybrid cars, SUVs, minibuses, shuttles and accessible vehicles.",
      },
      { title: "Standard, Premium and Luxury", text: "Pick the level that suits your customers." },
      { title: "Private or shared", text: "Book a private vehicle or a shared seat on a shuttle or bus." },
      { title: "Upfront pricing", text: "No hidden fees or surprises. The price you see is the price you pay." },
    ],
  },
  {
    id: "car-rentals",
    title: "Car rentals",
    intro:
      "Offer your customers car rental from leading brands, including Avis, Budget, Payless, Alamo, Enterprise, National, Sixt, Dollar, Europcar, Thrifty and Hertz.",
    points: [
      { title: "Last minute rentals", text: "Book a car for your customers' last minute plans." },
      {
        title: "Pay at pick up",
        text: "Your customers book through the platform and pay the supplier directly when they collect the car.",
      },
      { title: "Zero booking fee", text: "Your customers pay nothing to us at the time of booking. T&Cs apply." },
      {
        title: "Flexible cancellations",
        text: "Your customers can cancel free of charge before pick up, subject to the rental's cancellation policy.",
      },
      {
        title: "Card guarantee",
        text: "Your customers enter their credit card details at booking, but nothing is charged. Some suppliers require a card as a guarantee for certain vehicle types.",
      },
    ],
  },
];

export const categoryById = (id: ProductId) => categories.find((c) => c.id === id)!;
