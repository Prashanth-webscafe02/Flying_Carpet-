// Destination detail content: flights, hotels, experiences, transfers and travel-guide material
// for each destination in `data.ts`. No live fares: cards invite the agent to enquire for rates.

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export type HotelCategory = 'luxury' | 'upscale' | 'midscale' | 'boutique' | 'budget'

export type Airline = { name: string; via?: string }
export type Hotel = { name: string; area: string; category: HotelCategory; stars: number; text: string; amenities: string[]; tag?: string }
export type Experience = { title: string; place: string; duration: string; tags: string[]; img?: string }

export type Detail = {
  subtitle: string
  intro: string
  /** Arrival airport shown in routes, e.g. "DXB". */
  airport: string
  airportName: string
  airlines: Airline[]
  areas: string[]
  hotels: Hotel[]
  experiences: Experience[]
  bestTime: string
  /** Transfer style shown on the transfers tab (the Maldives uses boats and seaplanes). */
  transferMode?: 'road' | 'sea'
}

export const images = {
  flights: u('photo-1570710891163-6d3b5c47248b'),
  hotels: u('photo-1582719478250-c89cae4dc85b'),
  experiences: '/images/activities.webp',
  transfers: u('photo-1449965408869-eaa3f722e40d'),
  chauffeur: u('photo-1503376780353-7e6692767b70'),
  wing: u('photo-1436491865332-7a61a109cc05'),
  shopping: u('photo-1582672060674-bc2bd808a8b5'),
  desert: u('photo-1473580044384-7ba9967e16a0'),
  outdoors: u('photo-1476514525535-07fb3b4ae5f1'),
}

// Hotel photos rotate through a small set of generic stays.
export const hotelImages = [
  u('photo-1571896349842-33c89424de2d'),
  u('photo-1520250497591-112f2f40a3f4'),
  u('photo-1566073771259-6a8506099945'),
  u('photo-1551882547-ff40c63fe5fa'),
  u('photo-1582719478250-c89cae4dc85b'),
]

// Where the agent's clients fly from, by the market picked in get-started.
export const origins: Record<string, { city: string; code: string }> = {
  in: { city: 'Delhi', code: 'DEL' },
  za: { city: 'Johannesburg', code: 'JNB' },
  us: { city: 'New York', code: 'JFK' },
  ca: { city: 'Toronto', code: 'YYZ' },
}

const doha = 'Doha (DOH)'
const dubai = 'Dubai (DXB)'
const istanbul = 'Istanbul (IST)'
const singapore = 'Singapore (SIN)'

export const details: Record<string, Detail> = {
  dubai: {
    subtitle: 'A city of possibilities',
    intro: 'From iconic skylines to golden deserts, world-class shopping to unforgettable experiences, Dubai offers something for every traveller.',
    airport: 'DXB', airportName: 'Dubai International',
    airlines: [{ name: 'Emirates' }, { name: 'flydubai' }, { name: 'Air India' }, { name: 'IndiGo' }, { name: 'Qatar Airways', via: doha }, { name: 'Etihad Airways', via: 'Abu Dhabi (AUH)' }],
    areas: ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Jumeirah Beach', 'Deira'],
    hotels: [
      { name: 'Atlantis The Palm', area: 'Palm Jumeirah', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'A world-famous resort with exceptional dining, entertainment and beachfront experiences. Ideal for families and leisure travellers.', amenities: ['Pool', 'Spa', 'Family friendly', 'Multiple dining'] },
      { name: 'Address Downtown', area: 'Downtown Dubai', category: 'luxury', stars: 5, text: 'A premium city hotel with stunning views of the Burj Khalifa and Dubai Fountain. Ideal for business and leisure travellers.', amenities: ['Pool', 'Spa', 'Business facilities', 'Fine dining'] },
      { name: 'Jumeirah Beach Hotel', area: 'Jumeirah Beach', category: 'upscale', stars: 5, text: 'A stylish beachfront hotel with world-class amenities, ideal for families and couples.', amenities: ['Beach access', 'Pool', 'Spa', 'Family friendly'] },
      { name: 'JA Ocean View Hotel', area: 'Dubai Marina', category: 'upscale', stars: 4, text: 'A vibrant beachfront hotel with spacious rooms, popular with families and groups.', amenities: ['Pool', 'Family friendly', 'Water sports'] },
      { name: 'Rove Downtown', area: 'Downtown Dubai', category: 'midscale', stars: 3, text: 'Contemporary, comfortable and great value, with an easy central location.', amenities: ['Free Wi-Fi', 'Gym', 'Metro access'] },
    ],
    experiences: [
      { title: 'Premium Desert Safari', place: 'Dubai desert', duration: '6 hours', tags: ['Sunset', 'Dinner', 'Private option'], img: images.desert },
      { title: 'Burj Khalifa At The Top', place: 'Downtown Dubai', duration: '2 hours', tags: ['Skip the line', 'Day or night'] },
      { title: 'Marina Dhow Cruise', place: 'Dubai Marina', duration: '3 hours', tags: ['Dinner', 'Family'] },
      { title: 'Old Dubai Walking Tour', place: 'Al Fahidi', duration: '4 hours', tags: ['Culture', 'Small group'] },
    ],
    bestTime: 'November to March, when days are warm and evenings are cool.',
  },
  maldives: {
    subtitle: 'Islands made for unforgettable stays',
    intro: 'Overwater villas, house reefs and endless turquoise lagoons make the Maldives the ultimate escape for honeymooners, families and luxury travellers.',
    airport: 'MLE', airportName: 'Velana International, Malé',
    airlines: [{ name: 'Air India' }, { name: 'IndiGo' }, { name: 'SriLankan Airlines', via: 'Colombo (CMB)' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }, { name: 'Singapore Airlines', via: singapore }],
    areas: ['North Malé Atoll', 'South Malé Atoll', 'Baa Atoll', 'Ari Atoll'],
    hotels: [
      { name: 'Soneva Fushi', area: 'Baa Atoll', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'Barefoot luxury in a UNESCO biosphere reserve, with private villas, outdoor cinema and superb dining.', amenities: ['Private pools', 'Spa', 'Kids club', 'Snorkelling'] },
      { name: 'Kurumba Maldives', area: 'North Malé Atoll', category: 'upscale', stars: 5, text: 'A short speedboat ride from the airport, with eight restaurants and lush gardens. Great for short stays.', amenities: ['Beach access', 'Spa', 'Multiple dining'] },
      { name: 'Sun Siyam Olhuveli', area: 'South Malé Atoll', category: 'upscale', stars: 4, text: 'A lively resort with water villas, a long lagoon and plenty of activities for couples and families.', amenities: ['Water villas', 'Diving', 'Spa'] },
      { name: 'Adaaran Select Hudhuranfushi', area: 'North Malé Atoll', category: 'midscale', stars: 4, text: 'An all-inclusive favourite with a famous surf break and easy airport access.', amenities: ['All inclusive', 'Surfing', 'Pool'] },
    ],
    experiences: [
      { title: 'Private Sandbank Picnic', place: 'Resort lagoon', duration: '3 hours', tags: ['Romantic', 'Private'] },
      { title: 'Manta Ray Snorkelling', place: 'Hanifaru Bay, Baa Atoll', duration: 'Half day', tags: ['Seasonal', 'Marine life'] },
      { title: 'Sunset Dolphin Cruise', place: 'Most atolls', duration: '2 hours', tags: ['Sunset', 'Family'] },
      { title: 'Malé City Tour', place: 'Malé', duration: '3 hours', tags: ['Culture', 'Markets'] },
    ],
    bestTime: 'November to April, the dry season with calm seas and clear water.',
    transferMode: 'sea',
  },
  singapore: {
    subtitle: 'A global city with endless possibilities',
    intro: 'Gleaming skylines, garden-filled streets, hawker food and theme parks make Singapore an easy win for families, couples and business travellers.',
    airport: 'SIN', airportName: 'Changi Airport',
    airlines: [{ name: 'Singapore Airlines' }, { name: 'Scoot' }, { name: 'Air India' }, { name: 'IndiGo' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }],
    areas: ['Marina Bay', 'Orchard Road', 'Sentosa', 'Civic District', 'Kampong Glam'],
    hotels: [
      { name: 'Marina Bay Sands', area: 'Marina Bay', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'The iconic skyline resort with its famous rooftop infinity pool, shopping and dining.', amenities: ['Infinity pool', 'Spa', 'Casino', 'Fine dining'] },
      { name: 'Raffles Singapore', area: 'Civic District', category: 'luxury', stars: 5, text: 'A legendary colonial-era hotel, home of the Singapore Sling, with all-suite accommodation.', amenities: ['Butler service', 'Spa', 'Heritage'] },
      { name: 'Shangri-La Rasa Sentosa', area: 'Sentosa', category: 'upscale', stars: 5, text: 'Singapore’s only beachfront resort, steps from Universal Studios. Perfect for families.', amenities: ['Beach access', 'Kids club', 'Pool'] },
      { name: 'Hotel Boss', area: 'Kampong Glam', category: 'midscale', stars: 3, text: 'Modern, great-value rooms near the MRT, the Arab Quarter and Little India.', amenities: ['Pool', 'Metro access', 'Free Wi-Fi'] },
    ],
    experiences: [
      { title: 'Gardens by the Bay', place: 'Marina Bay', duration: '3 hours', tags: ['Supertrees', 'Cloud Forest'] },
      { title: 'Universal Studios Singapore', place: 'Sentosa', duration: 'Full day', tags: ['Family', 'Theme park'] },
      { title: 'Night Safari', place: 'Mandai', duration: '4 hours', tags: ['Wildlife', 'Evening'] },
      { title: 'Singapore River Cruise', place: 'Clarke Quay', duration: '1 hour', tags: ['Skyline', 'Easy add-on'] },
    ],
    bestTime: 'February to April, the driest and sunniest months; great year-round.',
  },
  bangkok: {
    subtitle: 'Vibrant culture and amazing value',
    intro: 'Golden temples, floating markets, rooftop bars and legendary street food make Bangkok one of Asia’s most exciting and affordable cities.',
    airport: 'BKK', airportName: 'Suvarnabhumi Airport',
    airlines: [{ name: 'Thai Airways' }, { name: 'Air India' }, { name: 'IndiGo' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }],
    areas: ['Riverside', 'Sukhumvit', 'Siam', 'Silom'],
    hotels: [
      { name: 'Mandarin Oriental Bangkok', area: 'Riverside', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'A riverside legend for over a century, with celebrated dining and an award-winning spa.', amenities: ['River views', 'Spa', 'Fine dining'] },
      { name: 'Siam Kempinski Hotel', area: 'Siam', category: 'luxury', stars: 5, text: 'A garden resort in the heart of the shopping district, next to Siam Paragon.', amenities: ['Pool', 'Spa', 'Shopping access'] },
      { name: 'Novotel Bangkok on Siam Square', area: 'Siam', category: 'midscale', stars: 4, text: 'Reliable comfort in a central location, close to the Skytrain.', amenities: ['Pool', 'Skytrain access', 'Family friendly'] },
      { name: 'ibis Bangkok Riverside', area: 'Riverside', category: 'budget', stars: 3, text: 'Great-value river-view rooms with a free shuttle boat.', amenities: ['Pool', 'Shuttle boat', 'Free Wi-Fi'] },
    ],
    experiences: [
      { title: 'Grand Palace & Temples Tour', place: 'Rattanakosin', duration: '4 hours', tags: ['Culture', 'Guided'] },
      { title: 'Floating Market Day Trip', place: 'Damnoen Saduak', duration: '6 hours', tags: ['Markets', 'Boat ride'] },
      { title: 'Chao Phraya Dinner Cruise', place: 'Riverside', duration: '2 hours', tags: ['Dinner', 'Evening'] },
      { title: 'Tuk-Tuk Street Food Tour', place: 'Chinatown', duration: '4 hours', tags: ['Food', 'Night'] },
    ],
    bestTime: 'November to February, the cool and dry season.',
  },
  bali: {
    subtitle: 'Natural beauty and rich culture',
    intro: 'Rice terraces, volcanoes, temples and surf beaches — Bali blends wellness, adventure and island culture for every kind of traveller.',
    airport: 'DPS', airportName: 'Ngurah Rai International, Denpasar',
    airlines: [{ name: 'Garuda Indonesia' }, { name: 'Singapore Airlines', via: singapore }, { name: 'Malaysia Airlines', via: 'Kuala Lumpur (KUL)' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }],
    areas: ['Seminyak', 'Ubud', 'Nusa Dua', 'Uluwatu', 'Canggu'],
    hotels: [
      { name: 'The Mulia Bali', area: 'Nusa Dua', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'A grand beachfront resort with some of the island’s best dining and spa facilities.', amenities: ['Beach access', 'Spa', 'Multiple pools'] },
      { name: 'Alila Villas Uluwatu', area: 'Uluwatu', category: 'luxury', stars: 5, text: 'Clifftop pool villas with dramatic ocean views and award-winning design.', amenities: ['Private pools', 'Spa', 'Ocean views'] },
      { name: 'COMO Uma Ubud', area: 'Ubud', category: 'boutique', stars: 5, text: 'A calm retreat above the Tjampuhan valley, perfect for wellness and culture.', amenities: ['Yoga', 'Spa', 'Valley views'] },
      { name: 'Courtyard by Marriott Bali Seminyak', area: 'Seminyak', category: 'upscale', stars: 4, text: 'A relaxed, family-friendly resort close to Seminyak’s beaches, cafés and boutiques.', amenities: ['Pool', 'Family friendly', 'Spa'] },
    ],
    experiences: [
      { title: 'Mount Batur Sunrise Trek', place: 'Kintamani', duration: '8 hours', tags: ['Adventure', 'Sunrise'], img: images.outdoors },
      { title: 'Ubud Rice Terraces & Temples', place: 'Ubud', duration: '6 hours', tags: ['Culture', 'Nature'] },
      { title: 'Uluwatu Kecak Fire Dance', place: 'Uluwatu', duration: '3 hours', tags: ['Sunset', 'Culture'] },
      { title: 'Nusa Penida Day Trip', place: 'Nusa Penida', duration: 'Full day', tags: ['Beaches', 'Snorkelling'] },
    ],
    bestTime: 'April to October, the dry season with sunny days.',
  },
  istanbul: {
    subtitle: 'Where East meets West',
    intro: 'Byzantine domes, Ottoman palaces, bazaars and Bosphorus views — Istanbul straddles two continents and centuries of history.',
    airport: 'IST', airportName: 'Istanbul Airport',
    airlines: [{ name: 'Turkish Airlines' }, { name: 'Pegasus Airlines' }, { name: 'IndiGo' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }],
    areas: ['Sultanahmet', 'Beyoğlu', 'Beşiktaş', 'Kadıköy'],
    hotels: [
      { name: 'Çırağan Palace Kempinski', area: 'Beşiktaş', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'A restored Ottoman palace on the Bosphorus with an infinity pool at the water’s edge.', amenities: ['Bosphorus views', 'Spa', 'Pool'] },
      { name: 'Pera Palace Hotel', area: 'Beyoğlu', category: 'boutique', stars: 5, text: 'A historic 1892 hotel built for Orient Express passengers, full of old-world glamour.', amenities: ['Heritage', 'Spa', 'Fine dining'] },
      { name: 'Sura Hagia Sophia Hotel', area: 'Sultanahmet', category: 'midscale', stars: 4, text: 'Comfortable rooms steps from Hagia Sophia, the Blue Mosque and the Grand Bazaar.', amenities: ['Central location', 'Hammam', 'Free Wi-Fi'] },
    ],
    experiences: [
      { title: 'Bosphorus Cruise', place: 'Eminönü', duration: '2 hours', tags: ['Sightseeing', 'Easy add-on'] },
      { title: 'Hagia Sophia & Blue Mosque Tour', place: 'Sultanahmet', duration: '4 hours', tags: ['History', 'Guided'] },
      { title: 'Grand Bazaar & Spice Market Walk', place: 'Old City', duration: '3 hours', tags: ['Shopping', 'Food'] },
      { title: 'Traditional Hammam', place: 'Sultanahmet', duration: '2 hours', tags: ['Wellness', 'Culture'] },
    ],
    bestTime: 'April to May and September to November, for mild weather and fewer crowds.',
  },
  london: {
    subtitle: 'Iconic sights and timeless experiences',
    intro: 'Royal palaces, world-class museums, West End theatre and leafy parks — London is a timeless favourite for families, couples and first-timers.',
    airport: 'LHR', airportName: 'Heathrow Airport',
    airlines: [{ name: 'British Airways' }, { name: 'Virgin Atlantic' }, { name: 'Air India' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }],
    areas: ['Westminster', 'Covent Garden', 'South Bank', 'Marylebone', 'Kensington'],
    hotels: [
      { name: 'The Savoy', area: 'Covent Garden', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'London’s most famous hotel on the Strand, with Thames views and legendary afternoon tea.', amenities: ['River views', 'Spa', 'Fine dining'] },
      { name: 'The Langham, London', area: 'Marylebone', category: 'luxury', stars: 5, text: 'Grand Victorian elegance near Oxford Street and Regent’s Park.', amenities: ['Spa', 'Pool', 'Afternoon tea'] },
      { name: 'Park Plaza Westminster Bridge', area: 'South Bank', category: 'upscale', stars: 4, text: 'Modern rooms opposite Big Ben and next to the London Eye. Great for families.', amenities: ['Pool', 'Spa', 'Family friendly'] },
      { name: 'Premier Inn London County Hall', area: 'South Bank', category: 'budget', stars: 3, text: 'Reliable value right beside the London Eye and Westminster Bridge.', amenities: ['Central location', 'Family rooms'] },
    ],
    experiences: [
      { title: 'London Eye Fast Track', place: 'South Bank', duration: '1 hour', tags: ['Views', 'Skip the line'] },
      { title: 'Tower of London & Crown Jewels', place: 'Tower Hill', duration: '3 hours', tags: ['History', 'Family'] },
      { title: 'West End Show', place: 'Theatreland', duration: '3 hours', tags: ['Evening', 'Theatre'] },
      { title: 'Warner Bros. Studio Tour – Harry Potter', place: 'Leavesden', duration: '7 hours', tags: ['Family', 'Film'] },
    ],
    bestTime: 'May to September, for long days and outdoor events.',
  },
  'new-york': {
    subtitle: 'A city that never stops inspiring',
    intro: 'Skyscrapers, Broadway, museums and neighbourhoods with their own personalities — New York packs a lifetime of experiences into one trip.',
    airport: 'JFK', airportName: 'John F. Kennedy International',
    airlines: [{ name: 'Delta Air Lines' }, { name: 'American Airlines' }, { name: 'Air India' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }],
    areas: ['Midtown', 'Times Square', 'Central Park', 'Meatpacking District'],
    hotels: [
      { name: 'The Plaza', area: 'Central Park', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'The legendary Fifth Avenue landmark overlooking Central Park.', amenities: ['Spa', 'Fine dining', 'Heritage'] },
      { name: 'Lotte New York Palace', area: 'Midtown', category: 'luxury', stars: 5, text: 'Grand rooms opposite St Patrick’s Cathedral, close to Rockefeller Center.', amenities: ['Fitness centre', 'Fine dining', 'City views'] },
      { name: 'The Standard, High Line', area: 'Meatpacking District', category: 'boutique', stars: 4, text: 'Stylish rooms straddling the High Line with floor-to-ceiling views.', amenities: ['Rooftop bar', 'City views', 'Design'] },
      { name: 'citizenM New York Times Square', area: 'Times Square', category: 'midscale', stars: 4, text: 'Smart, compact rooms and a rooftop bar in the heart of the action.', amenities: ['Rooftop bar', 'Free Wi-Fi', 'Central location'] },
    ],
    experiences: [
      { title: 'Statue of Liberty & Ellis Island', place: 'Battery Park', duration: '4 hours', tags: ['Icons', 'Ferry'] },
      { title: 'Top of the Rock Observation Deck', place: 'Midtown', duration: '2 hours', tags: ['Views', 'Day or night'] },
      { title: 'Broadway Show', place: 'Theater District', duration: '3 hours', tags: ['Evening', 'Theatre'] },
      { title: 'Central Park Bike Tour', place: 'Central Park', duration: '2 hours', tags: ['Outdoors', 'Family'] },
    ],
    bestTime: 'April to June and September to November, for comfortable weather.',
  },
  rajasthan: {
    subtitle: 'Forts, palaces and desert colour',
    intro: 'Palace hotels, hilltop forts, lake cities and desert camps — Rajasthan is India’s royal heartland and a showstopper for culture and heritage.',
    airport: 'JAI', airportName: 'Jaipur International',
    airlines: [{ name: 'Air India' }, { name: 'IndiGo' }, { name: 'SpiceJet' }, { name: 'Air India Express' }, { name: 'Emirates', via: 'Delhi (DEL)' }],
    areas: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer'],
    hotels: [
      { name: 'Rambagh Palace', area: 'Jaipur', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'The former residence of the Maharaja of Jaipur, with peacock-filled gardens.', amenities: ['Heritage', 'Spa', 'Pool'] },
      { name: 'The Oberoi Udaivilas', area: 'Udaipur', category: 'luxury', stars: 5, text: 'Domes, courtyards and lake views on the banks of Lake Pichola.', amenities: ['Lake views', 'Spa', 'Private pools'] },
      { name: 'Umaid Bhawan Palace', area: 'Jodhpur', category: 'luxury', stars: 5, text: 'One of the world’s largest private residences, now a spectacular palace hotel.', amenities: ['Heritage', 'Spa', 'Pool'] },
      { name: 'Suryagarh', area: 'Jaisalmer', category: 'boutique', stars: 5, text: 'A golden-stone fortress hotel on the edge of the Thar desert.', amenities: ['Desert experiences', 'Spa', 'Pool'] },
      { name: 'Alsisar Haveli', area: 'Jaipur', category: 'boutique', stars: 3, text: 'A charming 19th-century haveli with courtyard pool, close to the old city.', amenities: ['Heritage', 'Pool', 'Great value'] },
    ],
    experiences: [
      { title: 'Amber Fort & Jaipur City Tour', place: 'Jaipur', duration: '6 hours', tags: ['Heritage', 'Guided'] },
      { title: 'Lake Pichola Sunset Boat Ride', place: 'Udaipur', duration: '1 hour', tags: ['Sunset', 'Romantic'] },
      { title: 'Desert Camp & Camel Safari', place: 'Jaisalmer', duration: 'Overnight', tags: ['Desert', 'Adventure'], img: images.desert },
      { title: 'Mehrangarh Fort Walk', place: 'Jodhpur', duration: '3 hours', tags: ['History', 'Views'] },
    ],
    bestTime: 'October to March, when the desert days are pleasant.',
  },
  rome: {
    subtitle: 'History, art and la dolce vita',
    intro: 'Ancient ruins, Renaissance masterpieces, piazzas and trattorias — Rome is an open-air museum where every street tells a story.',
    airport: 'FCO', airportName: 'Leonardo da Vinci–Fiumicino',
    airlines: [{ name: 'ITA Airways' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }, { name: 'Turkish Airlines', via: istanbul }, { name: 'Lufthansa', via: 'Frankfurt (FRA)' }],
    areas: ['Centro Storico', 'Spanish Steps', 'Vatican', 'Trastevere', 'Monti'],
    hotels: [
      { name: 'Hotel Hassler Roma', area: 'Spanish Steps', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'Family-run luxury at the top of the Spanish Steps with sweeping city views.', amenities: ['City views', 'Fine dining', 'Spa'] },
      { name: 'Hotel de Russie', area: 'Spanish Steps', category: 'luxury', stars: 5, text: 'An elegant retreat with a secret terraced garden near Piazza del Popolo.', amenities: ['Garden', 'Spa', 'Fine dining'] },
      { name: 'Hotel Artemide', area: 'Monti', category: 'upscale', stars: 4, text: 'A welcoming Art Nouveau hotel on Via Nazionale, walkable to the main sights.', amenities: ['Rooftop terrace', 'Spa', 'Central location'] },
    ],
    experiences: [
      { title: 'Colosseum & Roman Forum', place: 'Centro Storico', duration: '3 hours', tags: ['History', 'Skip the line'] },
      { title: 'Vatican Museums & Sistine Chapel', place: 'Vatican', duration: '3 hours', tags: ['Art', 'Guided'] },
      { title: 'Trastevere Food Tour', place: 'Trastevere', duration: '4 hours', tags: ['Food', 'Evening'] },
    ],
    bestTime: 'April to June and September to October, for warm days without peak crowds.',
  },
  marrakech: {
    subtitle: 'Souks, riads and Saharan skies',
    intro: 'Colourful souks, tranquil riads, Atlas mountain views and desert dinners — Marrakech is an instant hit for couples, groups and culture lovers.',
    airport: 'RAK', airportName: 'Marrakech Menara',
    airlines: [{ name: 'Royal Air Maroc', via: 'Casablanca (CMN)' }, { name: 'Turkish Airlines', via: istanbul }, { name: 'Emirates', via: 'Casablanca (CMN)' }],
    areas: ['Medina', 'Hivernage', 'Gueliz', 'Palmeraie'],
    hotels: [
      { name: 'La Mamounia', area: 'Hivernage', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'Marrakech’s legendary palace hotel, set in century-old gardens beside the Medina.', amenities: ['Gardens', 'Spa', 'Pool'] },
      { name: 'Royal Mansour', area: 'Medina', category: 'luxury', stars: 5, text: 'Private riads with rooftop plunge pools and extraordinary craftsmanship.', amenities: ['Private riads', 'Spa', 'Butler service'] },
      { name: 'Riad Kniza', area: 'Medina', category: 'boutique', stars: 4, text: 'An intimate 18th-century riad known for warm hospitality and courtyard dining.', amenities: ['Courtyard pool', 'Heritage', 'Rooftop'] },
    ],
    experiences: [
      { title: 'Medina & Souks Guided Walk', place: 'Medina', duration: '3 hours', tags: ['Culture', 'Shopping'] },
      { title: 'Atlas Mountains Day Trip', place: 'Imlil', duration: '8 hours', tags: ['Nature', 'Villages'], img: images.outdoors },
      { title: 'Agafay Desert Dinner', place: 'Agafay', duration: '5 hours', tags: ['Sunset', 'Dinner'], img: images.desert },
      { title: 'Jardin Majorelle Visit', place: 'Gueliz', duration: '2 hours', tags: ['Gardens', 'Easy add-on'] },
    ],
    bestTime: 'March to May and September to November, for warm, comfortable days.',
  },
  paris: {
    subtitle: 'The art of living, elevated',
    intro: 'Boulevards, cafés, couture and the world’s greatest museums — Paris is romance, culture and gastronomy in one unforgettable city.',
    airport: 'CDG', airportName: 'Paris Charles de Gaulle',
    airlines: [{ name: 'Air France' }, { name: 'Air India' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }],
    areas: ['Champs-Élysées', 'Louvre', 'Eiffel Tower', 'Canal Saint-Martin'],
    hotels: [
      { name: 'The Peninsula Paris', area: 'Champs-Élysées', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'A palace hotel near the Arc de Triomphe with a rooftop restaurant overlooking the city.', amenities: ['Spa', 'Pool', 'Rooftop dining'] },
      { name: 'Le Meurice', area: 'Louvre', category: 'luxury', stars: 5, text: 'Palace-hotel grandeur facing the Tuileries Garden, steps from the Louvre.', amenities: ['Fine dining', 'Spa', 'Garden views'] },
      { name: 'Pullman Paris Tour Eiffel', area: 'Eiffel Tower', category: 'upscale', stars: 4, text: 'Modern rooms, many with Eiffel Tower views, a short walk from the Seine.', amenities: ['Tower views', 'Family rooms', 'Bar'] },
      { name: 'Generator Paris', area: 'Canal Saint-Martin', category: 'budget', stars: 2, text: 'A design-led hostel-hotel with private rooms and a rooftop terrace.', amenities: ['Rooftop', 'Groups', 'Great value'] },
    ],
    experiences: [
      { title: 'Eiffel Tower Summit', place: 'Champ de Mars', duration: '2 hours', tags: ['Views', 'Skip the line'] },
      { title: 'Louvre Guided Tour', place: 'Louvre', duration: '3 hours', tags: ['Art', 'Guided'] },
      { title: 'Seine Dinner Cruise', place: 'River Seine', duration: '2.5 hours', tags: ['Dinner', 'Romantic'] },
      { title: 'Palace of Versailles Day Trip', place: 'Versailles', duration: '6 hours', tags: ['History', 'Gardens'] },
    ],
    bestTime: 'April to June and September to October, for mild weather.',
  },
  tokyo: {
    subtitle: 'Tradition meeting tomorrow',
    intro: 'Neon districts, serene shrines, extraordinary food and day trips to Mount Fuji — Tokyo is endlessly fascinating for every traveller.',
    airport: 'HND', airportName: 'Tokyo Haneda',
    airlines: [{ name: 'Japan Airlines' }, { name: 'ANA' }, { name: 'Air India' }, { name: 'Singapore Airlines', via: singapore }, { name: 'Emirates', via: dubai }],
    areas: ['Shinjuku', 'Shibuya', 'Ginza', 'Asakusa'],
    hotels: [
      { name: 'Park Hyatt Tokyo', area: 'Shinjuku', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'Sky-high rooms and the famous New York Bar with views to Mount Fuji.', amenities: ['City views', 'Pool', 'Spa'] },
      { name: 'The Peninsula Tokyo', area: 'Ginza', category: 'luxury', stars: 5, text: 'Refined luxury opposite the Imperial Palace gardens, close to Ginza’s shopping.', amenities: ['Spa', 'Pool', 'Fine dining'] },
      { name: 'Hotel Gracery Shinjuku', area: 'Shinjuku', category: 'midscale', stars: 3, text: 'Famous for its Godzilla head, with compact rooms in the heart of Shinjuku.', amenities: ['Central location', 'Family rooms', 'Free Wi-Fi'] },
    ],
    experiences: [
      { title: 'Mount Fuji & Hakone Day Trip', place: 'Hakone', duration: '10 hours', tags: ['Nature', 'Guided'], img: images.outdoors },
      { title: 'Asakusa & Senso-ji Tour', place: 'Asakusa', duration: '3 hours', tags: ['Culture', 'Temples'] },
      { title: 'Shibuya & Harajuku Walk', place: 'Shibuya', duration: '3 hours', tags: ['City', 'Shopping'] },
      { title: 'teamLab Planets', place: 'Toyosu', duration: '2 hours', tags: ['Digital art', 'Family'] },
    ],
    bestTime: 'March to May for cherry blossom, and October to November for autumn colour.',
  },
  lisbon: {
    subtitle: 'Tiled streets and Atlantic light',
    intro: 'Hilltop viewpoints, historic trams, pastéis de nata and easy day trips to Sintra — Lisbon is relaxed, affordable and full of charm.',
    airport: 'LIS', airportName: 'Humberto Delgado Airport',
    airlines: [{ name: 'TAP Air Portugal' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }, { name: 'Turkish Airlines', via: istanbul }],
    areas: ['Baixa', 'Alfama', 'Chiado', 'Belém'],
    hotels: [
      { name: 'Four Seasons Hotel Ritz Lisbon', area: 'Baixa', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'Art-filled luxury above Eduardo VII Park with a celebrated rooftop running track.', amenities: ['Spa', 'Pool', 'City views'] },
      { name: 'Pestana Palace', area: 'Belém', category: 'upscale', stars: 5, text: 'A 19th-century palace with tropical gardens, close to Belém’s monuments.', amenities: ['Gardens', 'Pool', 'Heritage'] },
      { name: 'Memmo Alfama', area: 'Alfama', category: 'boutique', stars: 4, text: 'A design hotel with a rooftop pool overlooking the Tagus river and Alfama roofs.', amenities: ['Rooftop pool', 'River views', 'Design'] },
    ],
    experiences: [
      { title: 'Tram 28 & Alfama Walk', place: 'Alfama', duration: '3 hours', tags: ['Culture', 'Viewpoints'] },
      { title: 'Belém Monuments Tour', place: 'Belém', duration: '3 hours', tags: ['History', 'Pastries'] },
      { title: 'Sintra Palaces Day Trip', place: 'Sintra', duration: '8 hours', tags: ['Palaces', 'Nature'] },
      { title: 'Fado Dinner Show', place: 'Bairro Alto', duration: '3 hours', tags: ['Music', 'Dinner'] },
    ],
    bestTime: 'March to June and September to October, for sunshine without peak heat.',
  },
  'cape-town': {
    subtitle: 'Where mountain meets ocean',
    intro: 'Table Mountain, penguin beaches, winelands and scenic coastal drives — Cape Town is one of the world’s most beautiful cities.',
    airport: 'CPT', airportName: 'Cape Town International',
    airlines: [{ name: 'South African Airways' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }, { name: 'Turkish Airlines', via: istanbul }],
    areas: ['V&A Waterfront', 'Camps Bay', 'City Bowl', 'Constantia'],
    hotels: [
      { name: 'One&Only Cape Town', area: 'V&A Waterfront', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'Island villas and Table Mountain views at the heart of the Waterfront.', amenities: ['Spa', 'Pool', 'Mountain views'] },
      { name: 'The Silo Hotel', area: 'V&A Waterfront', category: 'boutique', stars: 5, text: 'A converted grain silo with jewel-like windows above the Zeitz MOCAA museum.', amenities: ['Rooftop pool', 'Design', 'Art'] },
      { name: 'The Marly', area: 'Camps Bay', category: 'boutique', stars: 5, text: 'Stylish suites facing Camps Bay beach and the Twelve Apostles.', amenities: ['Beach views', 'Spa', 'Rooftop pool'] },
      { name: 'Southern Sun Waterfront', area: 'City Bowl', category: 'midscale', stars: 4, text: 'Comfortable, central and great value, with a shuttle to the Waterfront.', amenities: ['Pool', 'Shuttle', 'Family friendly'] },
    ],
    experiences: [
      { title: 'Table Mountain Cableway', place: 'Table Mountain', duration: '3 hours', tags: ['Views', 'Icon'] },
      { title: 'Cape Peninsula & Boulders Penguins', place: 'Cape Point', duration: '9 hours', tags: ['Wildlife', 'Scenic drive'], img: images.outdoors },
      { title: 'Winelands Tasting Day', place: 'Stellenbosch', duration: '8 hours', tags: ['Wine', 'Food'] },
      { title: 'Robben Island Tour', place: 'V&A Waterfront', duration: '4 hours', tags: ['History', 'Ferry'] },
    ],
    bestTime: 'November to March, the warm and dry summer.',
  },
  brasov: {
    subtitle: 'Castles, forests and old-world charm',
    intro: 'Medieval squares, Bran Castle, bears in the Carpathian forests and ski slopes nearby — Brașov is Transylvania’s most charming base.',
    airport: 'OTP', airportName: 'Bucharest Henri Coandă (then 2.5 hours by road)',
    airlines: [{ name: 'TAROM' }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }, { name: 'Turkish Airlines', via: istanbul }],
    areas: ['Old Town', 'Poiana Brașov', 'Bran'],
    hotels: [
      { name: 'Aro Palace', area: 'Old Town', category: 'upscale', stars: 5, text: 'A classic grand hotel overlooking the park, a short walk from Council Square.', amenities: ['Spa', 'Pool', 'Central location'] },
      { name: 'Casa Wagner', area: 'Old Town', category: 'boutique', stars: 3, text: 'A cosy 15th-century townhouse inn right beside Council Square.', amenities: ['Heritage', 'Breakfast', 'Great value'] },
      { name: 'Teleferic Grand Hotel', area: 'Poiana Brașov', category: 'upscale', stars: 4, text: 'A mountain resort hotel at the foot of the ski slopes above Brașov.', amenities: ['Ski access', 'Spa', 'Pool'] },
    ],
    experiences: [
      { title: 'Bran Castle & Râșnov Fortress', place: 'Bran', duration: '6 hours', tags: ['Castles', 'Legend'] },
      { title: 'Old Town Walking Tour', place: 'Old Town', duration: '2 hours', tags: ['History', 'Easy add-on'] },
      { title: 'Libearty Bear Sanctuary', place: 'Zărnești', duration: '4 hours', tags: ['Wildlife', 'Family'], img: images.outdoors },
      { title: 'Peleș Castle Day Trip', place: 'Sinaia', duration: '8 hours', tags: ['Palaces', 'Mountains'] },
    ],
    bestTime: 'May to September for hiking and castles, December to March for skiing.',
  },
  sydney: {
    subtitle: 'Harbour city, endless light',
    intro: 'The Opera House, Harbour Bridge, golden beaches and the Blue Mountains nearby — Sydney is sunshine, style and the great outdoors.',
    airport: 'SYD', airportName: 'Sydney Kingsford Smith',
    airlines: [{ name: 'Qantas' }, { name: 'Air India' }, { name: 'Singapore Airlines', via: singapore }, { name: 'Emirates', via: dubai }, { name: 'Qatar Airways', via: doha }],
    areas: ['The Rocks', 'Circular Quay', 'Darling Harbour', 'Bondi'],
    hotels: [
      { name: 'Park Hyatt Sydney', area: 'The Rocks', category: 'luxury', stars: 5, tag: 'Bestseller', text: 'Front-row views of the Opera House from the water’s edge, with a rooftop pool.', amenities: ['Harbour views', 'Spa', 'Rooftop pool'] },
      { name: 'Shangri-La Sydney', area: 'The Rocks', category: 'upscale', stars: 5, text: 'Panoramic harbour views from every room, close to Circular Quay.', amenities: ['Harbour views', 'Spa', 'Pool'] },
      { name: 'QT Sydney', area: 'Circular Quay', category: 'boutique', stars: 5, text: 'Playful design in two heritage buildings in the heart of the city.', amenities: ['Design', 'Spa', 'Bar'] },
      { name: 'ibis Sydney Darling Harbour', area: 'Darling Harbour', category: 'budget', stars: 3, text: 'Great-value rooms with harbour views close to attractions and dining.', amenities: ['Harbour views', 'Free Wi-Fi'] },
    ],
    experiences: [
      { title: 'Sydney Opera House Tour', place: 'Bennelong Point', duration: '1 hour', tags: ['Icon', 'Guided'] },
      { title: 'Harbour Bridge Climb', place: 'The Rocks', duration: '3.5 hours', tags: ['Adventure', 'Views'] },
      { title: 'Blue Mountains Day Trip', place: 'Katoomba', duration: '9 hours', tags: ['Nature', 'Wildlife'], img: images.outdoors },
      { title: 'Bondi to Coogee Coastal Walk', place: 'Bondi', duration: '3 hours', tags: ['Beaches', 'Outdoors'] },
    ],
    bestTime: 'September to November and March to May, for warm days and fewer crowds.',
  },
}

export const categoryLabel: Record<HotelCategory, string> = {
  luxury: 'Luxury',
  upscale: 'Upscale',
  midscale: 'Midscale',
  boutique: 'Boutique',
  budget: 'Budget',
}
