const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const nav = [
  { label: "Partner With Us", href: "#journeys" },
  { label: "Destinations", href: "#destinations" },
  { label: "Partners", href: "#partners" },
  { label: "Contacts", href: "#contact" },
];

export const offers = [
  {
    title: "Flights",
    stat: "1000+",
    unit: "Airlines",
    img: "/images/flights.jpg",
  },
  { title: "Hotels", stat: "56+", unit: "countries", img: "/images/hotel.jpg" },
  {
    title: "Experiences",
    stat: "3000+",
    unit: "Activities",
    img: "/images/activities.jpg",
  },
];

export const stats = [
  { value: 100, suffix: "+", label: "Total countries presence" },
  { value: 1400, suffix: "+", label: "Total travel agents" },
];

export const destinations = [
  {
    name: "Romania",
    img: "/location/romania.webp",
    text: "From the medieval charm of Transylvania to the wild landscapes of the Carpathian Mountains, Romania is a journey through castles, forests, and centuries of history. Wander through the cobbled streets of Brașov, explore the legendary Bran Castle, or lose yourself in the peaceful villages of Maramureș. For nature lovers, hike through the Carpathians, discover hidden waterfalls, and experience the dramatic beauty of the Danube Delta.",
  },
  {
    name: "Italy",
    img: "/location/italy.webp",
    text: "Italy is a feast for the senses, where ancient history, extraordinary food, and breathtaking landscapes come together at every turn. Explore the timeless streets of Rome, wander through the rolling vineyards of Tuscany, or discover colorful villages along the Amalfi Coast. From Renaissance art and historic piazzas to fresh pasta, local wines, and Mediterranean sunsets, Italy invites you to slow down and savor every moment.",
  },
  {
    name: "India",
    img: "/location/india.webp",
    text: "India is a world of contrasts, colors, flavors, and ancient traditions stretching from the Himalayas to the tropical coast. Explore the grand forts and palaces of Rajasthan, wander through the spiritual streets of Varanasi, or drift through the tranquil backwaters of Kerala. Taste regional cuisines, discover centuries-old temples, and experience a culture where every city, village, and landscape tells a different story.",
  },
  {
    name: "Morocco",
    img: "/location/morocco.webp",
    text: "Morocco is a sensory journey through bustling medinas, golden deserts, rugged mountains, and Atlantic coastlines. Get lost among the colorful souks of Marrakech, wander the blue-painted streets of Chefchaouen, or ride into the Sahara beneath a sky full of stars. Along the way, discover ancient kasbahs, fragrant tagines, mint tea rituals, and welcoming communities shaped by centuries of Berber, Arab, and Mediterranean culture.",
  },
  {
    name: "Portugal",
    img: "/location/portugal.webp",
    text: "Portugal blends sun-drenched coastlines, historic cities, rolling vineyards, and a relaxed Atlantic spirit. Wander through Lisbon's tiled streets, explore the colorful lanes of Porto, or follow the dramatic cliffs of the Algarve. Taste fresh seafood, sip wine in the Douro Valley, and discover quiet fishing villages where old-world traditions meet a laid-back modern culture.",
  },
  {
    name: "Bali",
    img: "/location/bali.webp",
    text: "Bali is an island of lush rice terraces, volcanic landscapes, sacred temples, and tropical shores. Watch the sunrise from Mount Batur, wander through the emerald terraces of Ubud, or slow down beside the beaches of the south. Explore hidden waterfalls, swim in crystal-clear waters, and experience Balinese ceremonies and traditions woven into everyday life across the island.",
  },
];

export const platform = [
  {
    n: "01",
    title: "Flights",
    img: "/images/flights.jpg",
    text: "Transparent routes into destinations most travelers never reach first.",
  },
  {
    n: "02",
    title: "Hotels",
    img: "/images/hotel.jpg",
    text: "Stays with character — boutique lodges, coastal riads, and jungle hideaways.",
  },
  {
    n: "03",
    title: "Experiences",
    img: u("photo-1476514525535-07fb3b4ae5f1"),
    text: "Immersive days with local hosts: safaris, spice gardens, lagoon crossings.",
  },
  {
    n: "04",
    title: "Transfers",
    img: u("photo-1449965408869-eaa3f722e40d"),
    text: "The quiet logistics that make a journey feel seamless from the first mile.",
  },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    role: "Founder, Wanderlust Holidays",
    location: "Mumbai, India",
    avatar: u("photo-1531123897727-8f129e1688ce", 400),
    trip: "Italy",
    tripImg: "/location/italy.webp",
    rating: 5,
    quote:
      "Flying Carpet turned a complicated three-city Italy itinerary into something my clients still talk about. Flights, boutique stays and transfers all in one place — I quoted in an hour instead of a week.",
  },
  {
    name: "Daniel Brooks",
    role: "Senior Travel Consultant",
    location: "Toronto, Canada",
    avatar: u("photo-1507003211169-0a1dd7228f2d", 400),
    trip: "Morocco",
    tripImg: "/location/morocco.webp",
    rating: 5,
    quote:
      "The Sahara camp and riad stays were exactly as promised. My honeymoon couple came back glowing, and the support team answered every question before my clients even thought to ask.",
  },
  {
    name: "Aisha Rahman",
    role: "Owner, Blue Horizon Travels",
    location: "Dubai, UAE",
    avatar: u("photo-1524504388940-b1c1722653e1", 400),
    trip: "Bali",
    tripImg: "/location/bali.webp",
    rating: 5,
    quote:
      "Our group of 24 had a flawless week in Bali — villas in Ubud, a sunrise trek up Mount Batur and seamless transfers. Commission was paid on time, which says everything about the partnership.",
  },
  {
    name: "Marco Rossi",
    role: "Travel Agent, Rossi Viaggi",
    location: "Milan, Italy",
    avatar: u("photo-1506794778202-cad84cf45f1d", 400),
    trip: "Portugal",
    tripImg: "/location/portugal.webp",
    rating: 5,
    quote:
      "From Lisbon's trams to wine tastings in the Douro, every detail was handled. The destination guides help me sell with confidence, and my repeat bookings have grown steadily since we joined.",
  },
];

export const testimonialStats = [
  { value: "4.9", suffix: "/5", label: "Average agent rating" },
  { value: "1400", suffix: "+", label: "Travel agents onboard" },
  { value: "98", suffix: "%", label: "Would recommend us" },
];

export const agentsImg = u("photo-1509316785289-025f5b846b35", 1600);
export const footerImg = u("photo-1469474968028-56623f02e42e", 2400);
