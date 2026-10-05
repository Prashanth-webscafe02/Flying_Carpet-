import type { Destination } from './data'
import { images, type Experience } from './details'
import { asia } from './itineraries/asia'
import { south } from './itineraries/south'
import { west } from './itineraries/west'

// Experience page content, keyed by experience title (see `details.ts`): overview, what's
// included / excluded, and the itinerary stops. Ticket type and languages default to the
// values below unless an experience sets its own. Final inclusions are confirmed with the quote.

export type ExperienceInfo = {
  overview: string
  included: string[]
  excluded: string[]
  /** Itinerary stops: [name, what happens there]. */
  stops: [string, string][]
  ticket?: string
  languages?: string
}

/** Card/hero image for an experience: its own photo, else one from a small rotating pool. */
export const experienceImage = (d: Destination, e: Experience, i: number) => e.img ?? [d.img, images.experiences, images.outdoors][i % 3]

export const defaultTicket = 'Mobile or paper ticket accepted'
export const defaultLanguages = 'English'

export const experienceInfo: Record<string, ExperienceInfo> = {
  // Dubai
  'Dubai Global Village Entry Ticket': {
    overview: 'A unique combination of two of Dubai’s best attractions: the world’s biggest collection of 50 million flowers at Miracle Garden and the fun of Global Village, with food, rides, shows, concerts and music. Global Village is a family entertainment and shopping destination with stage shows, street entertainment and replicas of world landmarks such as the Taj Mahal. Miracle Garden, a floral wonderland of 50 million flowers spread over 18 acres, is one of the UAE’s most original attractions.',
    included: ['Entrance ticket'],
    excluded: ['Personal expenses'],
    stops: [['Global Village', 'Explore the cultural pavilions, street food, rides and evening stage shows at Dubai’s seasonal multicultural festival park.']],
  },
  'Premium Desert Safari': {
    overview: 'Leave the city for the red dunes of the Arabian desert: dune bashing in a 4x4, sandboarding and camel rides, then sunset photos and a barbecue dinner with live entertainment at a traditional desert camp.',
    included: ['Hotel pick-up and drop-off', '4x4 dune bashing', 'Camel ride and sandboarding', 'Barbecue dinner with soft drinks', 'Live entertainment'],
    excluded: ['Quad biking', 'Alcoholic drinks', 'Personal expenses'],
    stops: [['Dune bashing', 'An exhilarating 4x4 drive over the dunes with an experienced driver.'], ['Sunset point', 'Stop on the dunes for photos as the sun sets over the desert.'], ['Desert camp', 'Camel rides, henna, a barbecue dinner and live shows under the stars.']],
  },
  'Burj Khalifa At The Top': {
    overview: 'Ride one of the world’s fastest lifts to the observation decks of the tallest building on Earth, with 360° views over Downtown Dubai, the desert and the Arabian Gulf, day or night.',
    included: ['Entry to At The Top (levels 124 and 125)', 'Skip the line access at your time slot'],
    excluded: ['Hotel transfers', 'Food and drinks', 'Access to level 148 (upgrade available)'],
    stops: [['The Dubai Mall entrance', 'Check in on the lower ground level of The Dubai Mall.'], ['At The Top, levels 124–125', 'Take in the views from the indoor and outdoor observation decks.']],
  },
  'Marina Dhow Cruise': {
    overview: 'Cruise Dubai Marina on a traditional wooden dhow as the skyline lights up, with an international buffet dinner and relaxed music on board.',
    included: ['2-hour dhow cruise', 'International buffet dinner', 'Soft drinks, water, tea and coffee'],
    excluded: ['Hotel transfers', 'Alcoholic drinks', 'Personal expenses'],
    stops: [['Dubai Marina Walk', 'Board your dhow at the marina.'], ['Marina and JBR skyline', 'Sail past the towers of Dubai Marina and Jumeirah Beach Residence while dinner is served.']],
  },
  'Old Dubai Walking Tour': {
    overview: 'Discover the Dubai that came before the skyscrapers: the wind tower houses of Al Fahidi, an abra ride across Dubai Creek and the spice and gold souks of Deira.',
    included: ['Professional guide', 'Abra (water taxi) ride', 'Arabic coffee and dates'],
    excluded: ['Hotel transfers', 'Lunch', 'Personal purchases in the souks'],
    stops: [['Al Fahidi Historical Neighbourhood', 'Walk the narrow lanes and wind tower houses of old Dubai.'], ['Dubai Creek', 'Cross the creek on a traditional abra.'], ['Spice and Gold Souks', 'Browse the aromatic spice stalls and glittering gold shops of Deira.']],
  },
  // Maldives
  'Private Sandbank Picnic': {
    overview: 'Escape to a private sandbank surrounded by turquoise water for a picnic, snorkelling and sunbathing, with nobody else in sight.',
    included: ['Return boat transfer from the resort', 'Picnic lunch and soft drinks', 'Snorkelling equipment', 'Shade umbrella and towels'],
    excluded: ['Alcoholic drinks', 'Personal expenses'],
    stops: [['Resort jetty', 'Board your boat at the resort.'], ['Private sandbank', 'Swim, snorkel and enjoy a picnic on your own strip of sand.']],
  },
  'Manta Ray Snorkelling': {
    overview: 'Snorkel with manta rays in Hanifaru Bay, a UNESCO Biosphere Reserve where mantas gather to feed during the south west monsoon (roughly June to November).',
    included: ['Return boat transfer', 'Marine guide', 'Snorkelling equipment', 'Hanifaru Bay entry fee'],
    excluded: ['Underwater photos', 'Personal expenses'],
    stops: [['Resort jetty', 'Depart by speedboat with your marine guide.'], ['Hanifaru Bay', 'Snorkel alongside feeding manta rays (sightings depend on the season and conditions).']],
  },
  'Sunset Dolphin Cruise': {
    overview: 'Sail out at golden hour to look for spinner dolphins playing in the waves, then watch the sun set over the Indian Ocean.',
    included: ['Sunset boat cruise', 'Soft drinks and snacks'],
    excluded: ['Alcoholic drinks', 'Personal expenses'],
    stops: [['Resort jetty', 'Board the boat in the late afternoon.'], ['Dolphin waters', 'Watch spinner dolphins around the atoll as the sun goes down.']],
  },
  'Malé City Tour': {
    overview: 'Discover the colourful Maldivian capital on foot: the old Friday Mosque, the fish and fruit markets, and the island’s busy harbour.',
    included: ['Local guide', 'Walking tour', 'Bottled water'],
    excluded: ['Boat or seaplane transfer to Malé', 'Lunch', 'Personal purchases'],
    stops: [['Malé Friday Mosque', 'See the 17th century coral stone mosque.'], ['Local markets', 'Walk through the lively fish and fruit markets.'], ['Republic Square', 'End by the harbour and the national flag.']],
  },
  // Singapore
  'Gardens by the Bay': {
    overview: 'Explore Singapore’s futuristic garden: the Flower Dome, the misty Cloud Forest with its indoor waterfall, and the iconic Supertree Grove.',
    included: ['Entry to Flower Dome and Cloud Forest'],
    excluded: ['OCBC Skyway (optional)', 'Hotel transfers', 'Food and drinks'],
    stops: [['Flower Dome', 'Stroll through the world’s largest glass greenhouse.'], ['Cloud Forest', 'See the 35 metre indoor waterfall and mountain plants.'], ['Supertree Grove', 'Walk among the Supertrees, lit up each evening.']],
  },
  'Universal Studios Singapore': {
    overview: 'A full day of rides, shows and film themed zones on Sentosa, from Hollywood and Madagascar to Jurassic Park and Transformers.',
    included: ['One day admission ticket'],
    excluded: ['Express pass', 'Hotel transfers', 'Food and drinks'],
    stops: [['Hollywood', 'Enter under the famous globe.'], ['Themed zones', 'Explore the seven zones at your own pace.']],
  },
  'Night Safari': {
    overview: 'The world’s first nocturnal zoo: ride a tram through habitats from the Himalayas to the Indian subcontinent and see animals active after dark.',
    included: ['Night Safari admission', 'Tram ride'],
    excluded: ['Hotel transfers', 'Dinner', 'Personal expenses'],
    stops: [['Night Safari entrance', 'Arrive at Mandai Wildlife Reserve at dusk.'], ['Tram safari', 'Ride through the geographic zones with live commentary.'], ['Walking trails', 'Explore the leopard, fishing cat and wallaby trails on foot.']],
  },
  'Singapore River Cruise': {
    overview: 'Board a traditional bumboat for an easy cruise past Clarke Quay, Boat Quay and Marina Bay, with views of the Merlion and the skyline.',
    included: ['River cruise ticket'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['Clarke Quay jetty', 'Board your bumboat.'], ['Marina Bay', 'Cruise past the Merlion and Marina Bay Sands.']],
  },
  // Bangkok
  'Grand Palace & Temples Tour': {
    overview: 'Visit Bangkok’s most sacred sites with a guide: the Grand Palace and the Temple of the Emerald Buddha, the giant Reclining Buddha at Wat Pho, and riverside Wat Arun.',
    included: ['Professional guide', 'Entrance fees', 'Hotel pick up and drop off'],
    excluded: ['Lunch', 'Tips', 'Personal expenses'],
    stops: [['Grand Palace', 'Explore the royal complex and the Emerald Buddha.'], ['Wat Pho', 'See the 46 metre Reclining Buddha.'], ['Wat Arun', 'Cross the river to the Temple of Dawn.']],
  },
  'Floating Market Day Trip': {
    overview: 'Head out of the city to Damnoen Saduak, Thailand’s most famous floating market, and glide between boats piled with fruit, snacks and souvenirs.',
    included: ['Return transport from Bangkok', 'Guide', 'Boat ride at the market'],
    excluded: ['Food and purchases at the market', 'Tips'],
    stops: [['Damnoen Saduak Floating Market', 'Explore the canals by longtail boat.'], ['Maeklong Railway Market', 'Watch the train pass through the market stalls (on selected tours).']],
  },
  'Chao Phraya Dinner Cruise': {
    overview: 'An evening cruise on the River of Kings with a buffet dinner, live music and views of the illuminated Grand Palace and Wat Arun.',
    included: ['Dinner cruise with buffet', 'Live music'],
    excluded: ['Hotel transfers', 'Drinks', 'Tips'],
    stops: [['River pier', 'Board at the riverside pier.'], ['Grand Palace and Wat Arun', 'Cruise past Bangkok’s landmarks lit up at night.']],
  },
  'Tuk-Tuk Street Food Tour': {
    overview: 'Zip through Bangkok by tuk tuk after dark, tasting the city’s best street food in Chinatown and the flower market.',
    included: ['Tuk-tuk transport', 'Local guide', 'Food tastings', 'Soft drinks'],
    excluded: ['Hotel transfers', 'Alcoholic drinks', 'Tips'],
    stops: [['Yaowarat (Chinatown)', 'Taste noodles, seafood and desserts from street stalls.'], ['Pak Khlong Talat', 'Visit the 24 hour flower market.']],
  },
  // Bali
  'Mount Batur Sunrise Trek': {
    overview: 'Climb the active Mount Batur volcano in the dark to watch the sun rise over Lake Batur and Mount Agung, with breakfast at the summit.',
    included: ['Hotel pick-up and drop-off', 'Certified trekking guide', 'Breakfast at the summit', 'Torch'],
    excluded: ['Hiking shoes', 'Tips', 'Personal expenses'],
    stops: [['Trailhead', 'Start hiking at around 4am with your guide.'], ['Summit', 'Watch the sunrise and enjoy breakfast cooked on volcanic steam.']],
  },
  'Ubud Rice Terraces & Temples': {
    overview: 'A day in Bali’s cultural heart: the Tegallalang rice terraces, the Sacred Monkey Forest and the holy spring temple of Tirta Empul.',
    included: ['Private driver', 'Entrance fees'],
    excluded: ['Lunch', 'Tips', 'Personal expenses'],
    stops: [['Tegallalang Rice Terraces', 'Walk among the emerald terraces.'], ['Sacred Monkey Forest', 'See the long tailed macaques in the jungle sanctuary.'], ['Tirta Empul', 'Visit the temple of holy spring water.']],
  },
  'Uluwatu Kecak Fire Dance': {
    overview: 'Watch the hypnotic Kecak fire dance at sunset on the clifftop of Uluwatu Temple, high above the Indian Ocean.',
    included: ['Kecak dance ticket', 'Temple entrance', 'Hotel pick up and drop off'],
    excluded: ['Dinner', 'Tips'],
    stops: [['Uluwatu Temple', 'Walk the clifftop temple before the show.'], ['Kecak amphitheatre', 'Watch the Kecak and fire dance as the sun sets.']],
  },
  'Nusa Penida Day Trip': {
    overview: 'Cross to Nusa Penida for its dramatic coastline: Kelingking Beach, Broken Beach and Angel’s Billabong, with snorkelling on the way.',
    included: ['Return fast-boat transfer', 'Island transport and driver', 'Snorkelling equipment', 'Lunch'],
    excluded: ['Tips', 'Personal expenses'],
    stops: [['Kelingking Beach', 'See the famous T-Rex-shaped cliff.'], ['Broken Beach and Angel’s Billabong', 'Visit the natural arch and rock pool.'], ['Snorkelling spot', 'Snorkel over coral reefs (conditions permitting).']],
  },
  // Istanbul
  'Bosphorus Cruise': {
    overview: 'Sail the strait that divides Europe and Asia, passing Ottoman palaces, waterfront mansions and the Rumeli Fortress.',
    included: ['Bosphorus cruise ticket', 'Audio commentary'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['Eminönü pier', 'Board your boat near the Galata Bridge.'], ['Dolmabahçe and Ortaköy', 'Pass the palace and the Ortaköy Mosque.'], ['Rumeli Fortress', 'Turn back near the fortress and the Bosphorus Bridge.']],
  },
  'Hagia Sophia & Blue Mosque Tour': {
    overview: 'A guided walk through Byzantine and Ottoman Istanbul: Hagia Sophia, the Blue Mosque and the Hippodrome.',
    included: ['Professional guide', 'Entrance fees where applicable'],
    excluded: ['Hotel transfers', 'Lunch', 'Tips'],
    stops: [['Hagia Sophia', 'Explore the great domed basilica turned mosque.'], ['Blue Mosque', 'See the famous blue Iznik tiles.'], ['Hippodrome', 'Walk the ancient chariot racing arena.']],
  },
  'Grand Bazaar & Spice Market Walk': {
    overview: 'Get lost in one of the world’s oldest covered markets, then taste your way through the aromatic Spice Bazaar.',
    included: ['Local guide', 'Tastings at the Spice Bazaar'],
    excluded: ['Hotel transfers', 'Personal purchases'],
    stops: [['Grand Bazaar', 'Wander more than 60 streets of shops.'], ['Spice Bazaar', 'Taste Turkish delight, spices and teas.']],
  },
  'Traditional Hammam': {
    overview: 'Relax in a historic Turkish bath with a traditional scrub and foam massage, followed by tea in the cooling room.',
    included: ['Hammam entry', 'Scrub and foam massage', 'Towels and slippers', 'Turkish tea'],
    excluded: ['Hotel transfers', 'Additional treatments'],
    stops: [['Hot room', 'Warm up on the heated marble stone.'], ['Scrub and foam massage', 'Enjoy the traditional kese scrub and foam wash.']],
  },
  // London
  'London Eye Fast Track': {
    overview: 'Skip the main queue for a 30 minute rotation on the London Eye, with views of Big Ben, St Paul’s and the Thames.',
    included: ['Fast-track entry ticket', '4D cinema experience'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['London Eye', 'Board at the South Bank for a full rotation.']],
  },
  'Tower of London & Crown Jewels': {
    overview: 'Explore 1,000 years of history at the Tower of London, see the Crown Jewels and join a Yeoman Warder tour.',
    included: ['Entry ticket', 'Crown Jewels exhibition', 'Yeoman Warder tour'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['White Tower', 'See the Norman fortress and royal armouries.'], ['Jewel House', 'View the Crown Jewels.']],
  },
  'West End Show': {
    overview: 'An evening in London’s Theatreland with tickets to a hit West End musical or play.',
    included: ['Show ticket'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['West End theatre', 'Enjoy the performance.']],
  },
  'Warner Bros. Studio Tour – Harry Potter': {
    overview: 'Go behind the scenes of the Harry Potter films: walk the Great Hall, Diagon Alley and Platform 9¾, and see original sets, props and costumes.',
    included: ['Studio tour ticket', 'Return coach from central London'],
    excluded: ['Food and drinks', 'Souvenirs'],
    stops: [['Central London', 'Board the coach to Leavesden.'], ['Studio tour', 'Explore the sets at your own pace.']],
  },
  // New York
  'Statue of Liberty & Ellis Island': {
    overview: 'Ferry across New York Harbor to Liberty Island and Ellis Island, with an audio guide on America’s immigrant story.',
    included: ['Round-trip ferry', 'Audio guide', 'Access to Liberty and Ellis islands'],
    excluded: ['Pedestal or crown access (upgrade)', 'Food and drinks'],
    stops: [['Battery Park', 'Board the ferry.'], ['Liberty Island', 'See the Statue of Liberty up close.'], ['Ellis Island', 'Visit the National Museum of Immigration.']],
  },
  'Top of the Rock Observation Deck': {
    overview: 'Take in Manhattan from three levels of observation decks at Rockefeller Center, with clear views of the Empire State Building and Central Park.',
    included: ['Observation deck ticket'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['Rockefeller Center', 'Enter at 30 Rockefeller Plaza.'], ['Observation decks', 'Enjoy views from the 67th to 70th floors.']],
  },
  'Broadway Show': {
    overview: 'Experience a Broadway musical or play in the heart of the Theater District.',
    included: ['Show ticket'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['Broadway theatre', 'Enjoy the performance.']],
  },
  'Central Park Bike Tour': {
    overview: 'Ride through Central Park with a guide, stopping at Strawberry Fields, Bethesda Fountain and Bow Bridge.',
    included: ['Bike and helmet', 'Guide'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['Strawberry Fields', 'Visit the John Lennon memorial.'], ['Bethesda Fountain', 'Stop at the park’s grand terrace.'], ['Bow Bridge', 'See the park’s most romantic bridge.']],
  },
  // Rajasthan
  'Amber Fort & Jaipur City Tour': {
    overview: 'Explore the Pink City with a guide: the hilltop Amber Fort, the City Palace, the Jantar Mantar observatory and the Hawa Mahal.',
    included: ['Guide', 'Private car and driver', 'Monument entrance fees'],
    excluded: ['Lunch', 'Tips', 'Camera fees'],
    stops: [['Amber Fort', 'Explore the palaces and mirror hall of the hilltop fort.'], ['City Palace', 'See the royal residence and museum.'], ['Hawa Mahal', 'Photograph the Palace of Winds.']],
  },
  'Lake Pichola Sunset Boat Ride': {
    overview: 'Cruise Lake Pichola at sunset past the City Palace and the Lake Palace, Udaipur’s most romantic views.',
    included: ['Boat ride ticket'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['City Palace jetty', 'Board your boat.'], ['Jag Mandir', 'Stop at the island palace (on selected cruises).']],
  },
  'Desert Camp & Camel Safari': {
    overview: 'Ride camels into the Thar Desert dunes at sunset, then spend the night at a desert camp with Rajasthani music and dinner.',
    included: ['Camel safari', 'Overnight tent stay', 'Dinner and breakfast', 'Folk music and dance'],
    excluded: ['Transfers from Jaisalmer', 'Drinks', 'Tips'],
    stops: [['Sam Sand Dunes', 'Ride camels across the dunes at sunset.'], ['Desert camp', 'Dinner, folk performances and a night under the stars.']],
  },
  'Mehrangarh Fort Walk': {
    overview: 'Explore one of India’s largest forts, rising above the blue city of Jodhpur, with its palaces, museum and ramparts.',
    included: ['Fort entrance', 'Audio guide'],
    excluded: ['Hotel transfers', 'Lunch', 'Tips'],
    stops: [['Mehrangarh Fort', 'Walk through the palaces and museum galleries.'], ['Ramparts', 'Look over the blue houses of the old city.']],
  },
  // Rome
  'Colosseum & Roman Forum': {
    overview: 'Skip the line into the Colosseum with a guide, then walk through the Roman Forum and Palatine Hill, the heart of ancient Rome.',
    included: ['Skip-the-line entry', 'Guide', 'Colosseum, Forum and Palatine Hill access'],
    excluded: ['Hotel transfers', 'Food and drinks', 'Tips'],
    stops: [['Colosseum', 'Explore the arena where gladiators fought.'], ['Roman Forum', 'Walk among temples and ancient government buildings.'], ['Palatine Hill', 'See where Rome’s emperors lived.']],
  },
  'Vatican Museums & Sistine Chapel': {
    overview: 'A guided tour through the Vatican Museums’ masterpieces, ending in Michelangelo’s Sistine Chapel.',
    included: ['Skip-the-line entry', 'Guide'],
    excluded: ['Hotel transfers', 'St Peter’s dome climb', 'Tips'],
    stops: [['Vatican Museums', 'See the Gallery of Maps and Raphael Rooms.'], ['Sistine Chapel', 'Admire Michelangelo’s ceiling and Last Judgement.']],
  },
  'Trastevere Food Tour': {
    overview: 'Taste Roman classics in the cobbled lanes of Trastevere: supplì, pizza, cured meats, cheese, pasta and gelato.',
    included: ['Local food guide', 'Food tastings', 'Wine with dinner'],
    excluded: ['Hotel transfers', 'Tips'],
    stops: [['Piazza di Santa Maria', 'Meet your guide in the heart of Trastevere.'], ['Local trattorias and shops', 'Taste Roman specialities along the way.']],
  },
  // Marrakech
  'Medina & Souks Guided Walk': {
    overview: 'Explore the Marrakech medina with a local guide: Jemaa el-Fna square, the souks, the Bahia Palace and the Koutoubia Mosque.',
    included: ['Licensed local guide'],
    excluded: ['Monument entrance fees', 'Hotel transfers', 'Personal purchases'],
    stops: [['Koutoubia Mosque', 'Start at the city’s landmark minaret.'], ['Bahia Palace', 'See the carved and painted palace rooms.'], ['Souks and Jemaa el-Fna', 'Wander the markets and the famous square.']],
  },
  'Atlas Mountains Day Trip': {
    overview: 'Leave the city for the High Atlas: Berber villages, mountain valleys and a walk near Imlil, with lunch in a local home.',
    included: ['Return transport from Marrakech', 'Guide', 'Lunch with a Berber family'],
    excluded: ['Tips', 'Personal expenses'],
    stops: [['Asni market', 'Stop at a Berber village market (on market days).'], ['Imlil', 'Walk through mountain villages below Toubkal.']],
  },
  'Agafay Desert Dinner': {
    overview: 'Watch the sun set over the stony Agafay desert, with the Atlas Mountains behind, then enjoy a Moroccan dinner under the stars.',
    included: ['Return transport from Marrakech', 'Moroccan dinner', 'Camel ride', 'Live music'],
    excluded: ['Drinks', 'Tips'],
    stops: [['Agafay desert', 'Camel ride and sunset over the desert.'], ['Desert camp', 'Dinner, music and stargazing.']],
  },
  'Jardin Majorelle Visit': {
    overview: 'Visit the cobalt blue garden created by Jacques Majorelle and restored by Yves Saint Laurent, along with the Berber Museum.',
    included: ['Garden entrance ticket'],
    excluded: ['YSL Museum entry', 'Hotel transfers'],
    stops: [['Jardin Majorelle', 'Walk among cacti, bamboo and the blue villa.'], ['Pierre Bergé Museum of Berber Arts', 'See Berber jewellery and crafts.']],
  },
  // Paris
  'Eiffel Tower Summit': {
    overview: 'Ride to the top of the Eiffel Tower for views across Paris, with stops on the second floor on the way.',
    included: ['Summit access by lift', 'Reserved entry time'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['Second floor', 'Take in the views over the Seine.'], ['Summit', 'Look over Paris from 276 metres.']],
  },
  'Louvre Guided Tour': {
    overview: 'See the Louvre’s highlights with an expert guide: the Mona Lisa, the Venus de Milo and the Winged Victory of Samothrace.',
    included: ['Reserved entry', 'Guide'],
    excluded: ['Hotel transfers', 'Tips'],
    stops: [['Louvre Pyramid', 'Meet your guide and enter the museum.'], ['Mona Lisa', 'See Leonardo’s masterpiece.'], ['Winged Victory', 'Admire the Hellenistic sculpture.']],
  },
  'Seine Dinner Cruise': {
    overview: 'Dine on a glass roofed boat as you glide past Notre-Dame, the Louvre and the illuminated Eiffel Tower.',
    included: ['Dinner cruise', 'Three course meal'],
    excluded: ['Hotel transfers', 'Drinks not listed in the menu'],
    stops: [['Eiffel Tower pier', 'Board your boat.'], ['River Seine', 'Cruise past the city’s landmarks as night falls.']],
  },
  'Palace of Versailles Day Trip': {
    overview: 'Visit the royal palace of Louis XIV: the Hall of Mirrors, the King’s State Apartments and the vast formal gardens.',
    included: ['Return transport from Paris', 'Skip the line palace entry', 'Guide'],
    excluded: ['Lunch', 'Tips'],
    stops: [['Hall of Mirrors', 'Walk through the palace’s most famous room.'], ['Gardens of Versailles', 'Explore the fountains and formal gardens.']],
  },
  // Tokyo
  'Mount Fuji & Hakone Day Trip': {
    overview: 'Travel from Tokyo to Mount Fuji’s fifth station (weather permitting), then cruise Lake Ashi and ride the Hakone ropeway.',
    included: ['Return coach from Tokyo', 'Guide', 'Lake Ashi cruise', 'Hakone ropeway'],
    excluded: ['Lunch', 'Personal expenses'],
    stops: [['Mount Fuji 5th Station', 'See Japan’s highest mountain up close.'], ['Lake Ashi', 'Cruise across the lake.'], ['Hakone Ropeway', 'Ride over the volcanic valley of Owakudani.']],
  },
  'Asakusa & Senso-ji Tour': {
    overview: 'Discover old Tokyo in Asakusa: the Kaminarimon gate, the Nakamise shopping street and Senso-ji, the city’s oldest temple.',
    included: ['Local guide'],
    excluded: ['Hotel transfers', 'Food and souvenirs'],
    stops: [['Kaminarimon', 'Pass through the Thunder Gate.'], ['Nakamise-dori', 'Browse traditional snacks and crafts.'], ['Senso-ji', 'Visit Tokyo’s oldest Buddhist temple.']],
  },
  'Shibuya & Harajuku Walk': {
    overview: 'Experience modern Tokyo: the Shibuya Crossing, youthful Takeshita Street and the calm of the Meiji Shrine.',
    included: ['Local guide'],
    excluded: ['Hotel transfers', 'Food and shopping'],
    stops: [['Shibuya Crossing', 'Cross the world’s busiest intersection.'], ['Takeshita Street', 'See Harajuku’s street fashion.'], ['Meiji Shrine', 'Walk through the forested shrine grounds.']],
  },
  'teamLab Planets': {
    overview: 'Walk barefoot through immersive digital art installations, including water rooms and a floating flower garden.',
    included: ['Timed entry ticket'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['teamLab Planets Toyosu', 'Explore the water and garden installations.']],
  },
  // Lisbon
  'Tram 28 & Alfama Walk': {
    overview: 'Ride the historic yellow Tram 28 and explore Alfama’s steep lanes, viewpoints and Lisbon Cathedral.',
    included: ['Local guide', 'Tram ticket'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['Tram 28', 'Ride the classic tram through the old town.'], ['Lisbon Cathedral', 'See the city’s oldest church.'], ['Miradouro de Santa Luzia', 'Enjoy views over the Alfama rooftops.']],
  },
  'Belém Monuments Tour': {
    overview: 'Visit Lisbon’s Age of Discovery landmarks: the Jerónimos Monastery, Belém Tower and the Monument to the Discoveries, plus a famous custard tart.',
    included: ['Guide', 'Jerónimos Monastery entry', 'Pastel de Belém tasting'],
    excluded: ['Hotel transfers', 'Belém Tower entry'],
    stops: [['Jerónimos Monastery', 'Admire the Manueline cloister.'], ['Belém Tower', 'See the riverside fortress.'], ['Pastéis de Belém', 'Taste the original custard tart.']],
  },
  'Sintra Palaces Day Trip': {
    overview: 'Explore fairy tale Sintra: the colourful Pena Palace, the historic town centre and the Atlantic cliffs of Cabo da Roca.',
    included: ['Return transport from Lisbon', 'Guide', 'Pena Palace entry'],
    excluded: ['Lunch', 'Tips'],
    stops: [['Pena Palace', 'Visit the hilltop Romanticist palace.'], ['Sintra town', 'Stroll the old centre.'], ['Cabo da Roca', 'Stand at mainland Europe’s westernmost point.']],
  },
  'Fado Dinner Show': {
    overview: 'An evening of fado, Portugal’s soulful music, with a traditional dinner in a Bairro Alto restaurant.',
    included: ['Fado show', 'Three course dinner'],
    excluded: ['Hotel transfers', 'Drinks'],
    stops: [['Fado house', 'Dinner and live fado performances.']],
  },
  // Cape Town
  'Table Mountain Cableway': {
    overview: 'Ride the rotating cable car to the top of Table Mountain for views over Cape Town, Robben Island and the Twelve Apostles.',
    included: ['Return cableway ticket'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['Lower cable station', 'Board the rotating car.'], ['Table Mountain summit', 'Walk the summit trails and viewpoints.']],
  },
  'Cape Peninsula & Boulders Penguins': {
    overview: 'Drive the Cape Peninsula via Chapman’s Peak to the Cape of Good Hope, then meet the African penguins at Boulders Beach.',
    included: ['Transport and guide', 'Cape Point and Boulders entry fees'],
    excluded: ['Lunch', 'Tips'],
    stops: [['Chapman’s Peak Drive', 'Follow one of the world’s great coastal roads.'], ['Cape Point', 'Visit the lighthouse and the Cape of Good Hope.'], ['Boulders Beach', 'See the African penguin colony.']],
  },
  'Winelands Tasting Day': {
    overview: 'Spend a day in the Cape Winelands, tasting wines at estates around Stellenbosch and Franschhoek.',
    included: ['Transport and guide', 'Wine tastings at three estates'],
    excluded: ['Lunch', 'Wine purchases', 'Tips'],
    stops: [['Stellenbosch', 'Tastings at historic wine estates.'], ['Franschhoek', 'Visit the valley and a boutique winery.']],
  },
  'Robben Island Tour': {
    overview: 'Take the ferry to Robben Island, where Nelson Mandela was imprisoned, with a tour led by a former political prisoner.',
    included: ['Return ferry', 'Guided island and prison tour'],
    excluded: ['Hotel transfers', 'Food and drinks'],
    stops: [['Nelson Mandela Gateway', 'Board the ferry at the V&A Waterfront.'], ['Robben Island', 'Tour the island and the maximum security prison.']],
  },
  // Brașov
  'Bran Castle & Râșnov Fortress': {
    overview: 'Visit Bran Castle, linked to the Dracula legend, and the hilltop Râșnov citadel above the Transylvanian countryside.',
    included: ['Transport and guide', 'Entrance fees'],
    excluded: ['Lunch', 'Tips'],
    stops: [['Râșnov Fortress', 'Explore the medieval peasant citadel.'], ['Bran Castle', 'Walk through “Dracula’s Castle”.']],
  },
  'Old Town Walking Tour': {
    overview: 'Discover Brașov’s medieval old town: Council Square, the Black Church and Rope Street, one of Europe’s narrowest streets.',
    included: ['Local guide'],
    excluded: ['Black Church entry', 'Hotel transfers'],
    stops: [['Council Square', 'Start in the old town’s main square.'], ['Black Church', 'See the largest Gothic church in the region.'], ['Rope Street', 'Squeeze through one of Europe’s narrowest streets.']],
  },
  'Libearty Bear Sanctuary': {
    overview: 'Visit the Libearty sanctuary near Zărnești, home to more than 100 rescued brown bears roaming in the forest.',
    included: ['Return transport', 'Sanctuary entrance and guided visit'],
    excluded: ['Lunch', 'Tips'],
    stops: [['Libearty Bear Sanctuary', 'Watch the rescued bears in their forest enclosures.']],
  },
  'Peleș Castle Day Trip': {
    overview: 'Travel to Sinaia to visit Peleș Castle, the ornate former royal summer residence in the Carpathian Mountains.',
    included: ['Return transport', 'Guide', 'Peleș Castle entry'],
    excluded: ['Lunch', 'Photo fee', 'Tips'],
    stops: [['Peleș Castle', 'Tour the neo Renaissance royal residence.'], ['Sinaia Monastery', 'Visit the historic monastery nearby.']],
  },
  // Sydney
  'Sydney Opera House Tour': {
    overview: 'Go inside the Sydney Opera House on a guided tour of its concert halls and learn the story behind its design.',
    included: ['Guided tour'],
    excluded: ['Hotel transfers', 'Performances'],
    stops: [['Sydney Opera House', 'Explore the foyers and performance halls.']],
  },
  'Harbour Bridge Climb': {
    overview: 'Climb to the top of the Sydney Harbour Bridge with a guide for 360° views over the harbour and the Opera House.',
    included: ['Guided climb', 'Climb suit and safety equipment', 'Group photo'],
    excluded: ['Hotel transfers', 'Personal cameras (not allowed on the climb)'],
    stops: [['BridgeClimb base, The Rocks', 'Safety briefing and gearing up.'], ['Bridge summit', 'Take in the views 134 metres above the harbour.']],
  },
  'Blue Mountains Day Trip': {
    overview: 'Head west from Sydney to the Blue Mountains to see the Three Sisters, ride Scenic World and spot native wildlife.',
    included: ['Return transport from Sydney', 'Guide', 'Scenic World ride'],
    excluded: ['Lunch', 'Tips'],
    stops: [['Echo Point', 'View the Three Sisters.'], ['Scenic World', 'Ride the Scenic Railway and Skyway.'], ['Featherdale Wildlife Park', 'Meet kangaroos and koalas (on selected tours).']],
  },
  'Bondi to Coogee Coastal Walk': {
    overview: 'Walk Sydney’s most famous clifftop trail from Bondi Beach past Tamarama, Bronte and Clovelly to Coogee.',
    included: ['Local guide'],
    excluded: ['Transport to Bondi', 'Food and drinks'],
    stops: [['Bondi Beach', 'Start at Sydney’s iconic beach.'], ['Bronte', 'Stop at the ocean pool and park.'], ['Coogee Beach', 'Finish with a swim or a coffee.']],
  },
}

// Full itineraries (every stop, each with a 4–5 line description) replace the short stop lists above.
for (const [title, stops] of Object.entries({ ...asia, ...west, ...south })) {
  if (experienceInfo[title]) experienceInfo[title].stops = stops
}
