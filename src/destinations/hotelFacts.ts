// Property facts for the hotel pages: street address, year built, room counts (total and by
// type), and optionally the exact amenities strip and facility list from the supplier.
// Figures come from each hotel's official site or well-sourced references (see `source`);
// where sources disagree or nothing is published, the field is left out and the page shows "—".
// Replace/extend with supplier data when available.

export type RoomCounts = {
  total?: number
  juniorSuites?: number
  /** Suites other than junior suites. */
  seniorSuites?: number
  executive?: number
  superior?: number
  accessible?: number
}

/** Row order and labels for the "Room count by type" list. */
export const roomRows: [keyof RoomCounts, string][] = [
  ['total', 'Total rooms'],
  ['juniorSuites', 'Junior suites'],
  ['seniorSuites', 'Senior suites'],
  ['executive', 'Executive rooms'],
  ['superior', 'Superior rooms'],
  ['accessible', 'Accessible rooms'],
]

export type FacilityData = { title: string; items: { label: string; paid?: boolean }[] }

export type HotelFacts = {
  /** Street address, without the city/country (the page adds those). */
  address?: string
  /** Year the hotel was built / opened. */
  opened?: number
  /** Room counts by type. Every hotel page lists all six; missing ones show "—". */
  rooms?: RoomCounts
  /** Exact top-amenities strip (otherwise built from the hotel's amenities). */
  strip?: string[]
  /** Exact grouped facilities (otherwise built from the hotel's amenities and category). */
  facilities?: FacilityData[]
  /** Where the room figures come from (for checking; not shown on the page). */
  source?: string
}

// Sample property facts (from the Avani Deira Dubai reference page), shown on EVERY hotel page
// while `useSampleRoomFacts` is true. Set it to false to show each hotel's own researched
// figures below (with "—" where unknown).
export const useSampleRoomFacts = true
export const sampleRoomFacts: { opened: number; rooms: RoomCounts } = {
  opened: 2010,
  rooms: { total: 216, juniorSuites: 13, seniorSuites: 12, executive: 35, superior: 119, accessible: 2 },
}

const paid = (label: string) => ({ label, paid: true })
const free = (...labels: string[]) => labels.map((label) => ({ label }))

export const hotelFacts: Record<string, HotelFacts> = {
  // Dubai
  'Atlantis The Palm': { address: 'Crescent Road, The Palm Jumeirah', opened: 2008, rooms: { total: 1544 }, source: 'https://en.wikipedia.org/wiki/Atlantis,_The_Palm' },
  'Address Downtown': { address: 'Sheikh Mohammed bin Rashid Boulevard, Downtown Dubai', opened: 2008, rooms: { total: 220 }, source: 'https://www.addresshotels.com/en/hotels/address-downtown/' },
  'Jumeirah Beach Hotel': { address: 'Jumeirah Street, Umm Suqeim 3', opened: 1997, rooms: { total: 617 }, source: 'https://en.wikipedia.org/wiki/Jumeirah_Beach_Hotel (598 rooms and suites + 19 villas)' },
  'JA Ocean View Hotel': { address: 'The Walk, Jumeirah Beach Residence', rooms: { total: 346 }, source: 'https://www.jaresortshotels.com/dubai/ja-ocean-view-hotel' },
  // From the Flying Carpet reference hotel page.
  'Avani Deira Dubai Hotel': {
    address: 'Corner Abu Bakker Al Siddique and Sallahuddin Road',
    opened: 2010,
    rooms: { total: 216, juniorSuites: 13, seniorSuites: 12, executive: 35, superior: 119, accessible: 2 },
    strip: ['Restaurant', 'Wheelchair-accessible', '24-hour reception', 'Car park', 'Gym', 'Multilingual staff', 'Wi-Fi'],
    facilities: [
      { title: 'Amenities and Services', items: free('Wheelchair-accessible', 'Car park', '24-hour reception', 'Check-in hour from 15:00 to 05:30', 'Check-out hour from 12:00 to 12:00', 'Multilingual staff') },
      { title: 'Restaurant Service', items: free('Café', 'Bar', 'Restaurant', 'Smoking area', 'Highchairs') },
      { title: 'Meals', items: free('Breakfast buffet', 'Buffet lunch', 'Buffet dinner') },
      { title: 'Business', items: [...free('Conference room (7)', 'Meeting room (7)'), paid('Projector'), paid('Printer'), paid('Photocopier')] },
      { title: 'Internet Access', items: free('Wi-Fi') },
      { title: 'Entertainment', items: free('Outdoor freshwater pool (1)', 'Children’s swimming area (1)', 'Sun loungers') },
      { title: 'Health and Beauty', items: [...free('Sauna', 'Steam bath'), paid('Massage'), paid('Hairdressing salon'), paid('Beauty salon')] },
      { title: 'Sustainable Certification', items: free('Green Growth 2050 to 22 Nov 2027') },
      { title: 'Activities', items: free('Fitness', 'Billiards') },
      { title: 'To take into account', items: free('Deposit on arrival', 'Identification card at arrival') },
      { title: 'Cards Accepted', items: free('American Express', 'JCB', 'Diners Club', 'MasterCard', 'Visa') },
    ],
    source: 'Flying Carpet reference hotel page (supplier data)',
  },
  'Rove Downtown': { opened: 2016, rooms: { total: 420 }, source: 'https://www.rovehotels.com/en/hotels/downtown/' },
  // Maldives
  'Soneva Fushi': { address: 'Kunfunadhoo Island, Baa Atoll', opened: 1995, source: 'https://en.wikipedia.org/wiki/Soneva (current villa count not published consistently)' },
  'Kurumba Maldives': { address: 'Vihamanaafushi, North Malé Atoll', opened: 1972, rooms: { total: 180 }, source: 'https://en.wikipedia.org/wiki/Kurumba_Maldives' },
  'Sun Siyam Olhuveli': { address: 'Olhuveli Island, South Malé Atoll', rooms: { total: 328 }, source: 'https://www.sunsiyam.com/sun-siyam-olhuveli/accommodation/' },
  'Adaaran Select Hudhuranfushi': { address: 'Hudhuranfushi Island, North Malé Atoll', rooms: { total: 192 }, source: 'https://www.adaaran.com/selecthudhuranfushi/accommodation.html' },
  // Singapore
  'Marina Bay Sands': { address: '10 Bayfront Avenue', opened: 2010, rooms: { total: 2561 }, source: 'https://www.marinabaysands.com/hotel/rooms-suites.html' },
  'Raffles Singapore': { address: '1 Beach Road', opened: 1887, rooms: { total: 115 }, source: 'https://en.wikipedia.org/wiki/Raffles_Hotel (all 115 are suites)' },
  'Shangri-La Rasa Sentosa': { address: '101 Siloso Road, Sentosa', opened: 1993, rooms: { total: 454 }, source: 'https://www.shangri-la.com/en/singapore/rasasentosaresort/rooms-suites/' },
  'Hotel Boss': { address: '500 Jalan Sultan', opened: 2015, rooms: { total: 1500 }, source: 'https://www.wwhotels.com/hotel-boss/' },
  // Bangkok
  'Mandarin Oriental Bangkok': { address: '48 Oriental Avenue, Charoen Krung Road', opened: 1876, source: 'https://en.wikipedia.org/wiki/Mandarin_Oriental,_Bangkok (room totals differ between sources)' },
  'Siam Kempinski Hotel': { address: '991/9 Rama I Road, Pathumwan', opened: 2010, rooms: { total: 397 }, source: 'Kempinski press kit 2024' },
  'Novotel Bangkok on Siam Square': { address: 'Siam Square Soi 6, Rama I Road', rooms: { total: 425 }, source: 'https://www.novotelbkk.com/guest-rooms/' },
  'ibis Bangkok Riverside': { address: '27 Charoen Nakhon Road, Khlong San', opened: 2009, rooms: { total: 266 }, source: 'https://all.accor.com/hotel/7026/index.en.shtml' },
  // Bali
  'The Mulia Bali': { address: 'Jalan Raya Nusa Dua Selatan, Nusa Dua', opened: 2012, rooms: { total: 111 }, source: 'https://www.themulia.com/bali/themulia (The Mulia: 111 suites)' },
  'Alila Villas Uluwatu': { address: 'Jalan Belimbing Sari, Pecatu', opened: 2009, source: 'villa count differs between sources' },
  'COMO Uma Ubud': { address: 'Jalan Raya Sanggingan, Ubud', opened: 2004, rooms: { total: 46 }, source: 'https://www.comohotels.com/bali/como-uma-ubud/accommodation' },
  'Courtyard by Marriott Bali Seminyak': { address: 'Jalan Camplung Tanduk 103, Seminyak', opened: 2014, rooms: { total: 290 }, source: 'https://www.hotelnewsresource.com/article79285.html' },
  // Istanbul
  'Çırağan Palace Kempinski': { address: 'Çırağan Caddesi 32, Beşiktaş', rooms: { total: 313, seniorSuites: 31 }, source: 'https://www.cornucopia.net/guide/listings/hotels/ciragan-palace-kempinski/ (20 hotel + 11 palace suites)' },
  'Pera Palace Hotel': { address: 'Meşrutiyet Caddesi 52, Tepebaşı', opened: 1892, rooms: { total: 115, seniorSuites: 16 }, source: 'https://en.wikipedia.org/wiki/Pera_Palace_Hotel' },
  // London
  'The Savoy': { address: 'Strand, WC2R 0EZ', opened: 1889, rooms: { total: 267 }, source: 'https://www.fairmont.com/en/hotels/london/the-savoy/rooms.html' },
  'The Langham, London': { address: '1C Portland Place, Regent Street, W1B 1JA', opened: 1865, rooms: { total: 380 }, source: 'https://en.wikipedia.org/wiki/Langham_Hotel,_London' },
  'Park Plaza Westminster Bridge': { address: '200 Westminster Bridge Road, SE1 7UT', opened: 2010, rooms: { total: 1023, seniorSuites: 63, accessible: 53 }, source: 'https://www.radissonhotels.com/en-us/hotels/park-plaza-westminster-bridge-london/rooms' },
  'Premier Inn London County Hall': { address: 'Belvedere Road, SE1 7PB', rooms: { total: 316 }, source: 'https://www.premierinn.com/gb/en/hotels/england/greater-london/london/london-county-hall.html' },
  // New York
  'The Plaza': { address: '768 Fifth Avenue', opened: 1907, rooms: { total: 282, seniorSuites: 102 }, source: 'https://www.fairmont.com/en/hotels/new-york-city/the-plaza/rooms.html' },
  'Lotte New York Palace': { address: '455 Madison Avenue', opened: 1980, rooms: { total: 909, superior: 330 }, source: 'https://en.wikipedia.org/wiki/Lotte_New_York_Palace_Hotel' },
  'The Standard, High Line': { address: '848 Washington Street', opened: 2009, rooms: { total: 338 }, source: 'https://en.wikipedia.org/wiki/The_Standard,_High_Line' },
  'citizenM New York Times Square': { address: '218 West 50th Street', opened: 2014, rooms: { total: 230 }, source: 'https://www.e-architect.com/new-york/citizenm-hotel-new-york-times-square' },
  // Rajasthan
  'Rambagh Palace': { address: 'Bhawani Singh Road, Jaipur', rooms: { total: 78, seniorSuites: 33 }, source: 'https://www.tajhotels.com/en-in/hotels/rambagh-palace-jaipur/rooms-and-suites (41 palace + 5 luxury rooms, 33 suites)' },
  'The Oberoi Udaivilas': { address: 'Haridasji Ki Magri, Udaipur', opened: 2002, rooms: { total: 87 }, source: 'https://www.theworlds50best.com/discovery/Establishments/India/Udaipur/The-Oberoi-Udaivilas.html' },
  'Umaid Bhawan Palace': { address: 'Circuit House Road, Jodhpur', opened: 1943, rooms: { total: 64, seniorSuites: 39 }, source: 'https://www.heritagehotelsofindia.com/rajasthan/taj-umaid-bhawan-palace-jodhpur.html' },
  'Suryagarh': { address: 'Kahala Phata, Sam Road, Jaisalmer', source: 'room count differs between sources' },
  'Alsisar Haveli': { address: 'Sansar Chandra Road, Jaipur', rooms: { total: 45 }, source: 'https://www.historichotels.org/hotels-resorts/alsisar-haveli/accommodations.php' },
  // Rome
  'Hotel Hassler Roma': { address: 'Piazza della Trinità dei Monti 6', opened: 1893, source: 'room/suite split differs between sources' },
  'Hotel de Russie': { address: 'Via del Babuino 9', rooms: { total: 120, seniorSuites: 34 }, source: 'https://www.roccofortehotels.com/hotels-and-resorts/hotel-de-russie/hotel-information/' },
  'Hotel Artemide': { address: 'Via Nazionale 22', rooms: { total: 91, juniorSuites: 8, seniorSuites: 2, accessible: 1 }, source: 'https://www.hotelartemide.it/rooms-suites-hotel-rome' },
  // Marrakech
  'La Mamounia': { address: 'Avenue Bab Jdid', opened: 1923, rooms: { total: 209, seniorSuites: 71 }, source: 'https://mamounia.com/en/accommodation/ (135 rooms, 71 suites, 3 riads)' },
  'Royal Mansour': { address: 'Rue Abou Abbas El Sebti', opened: 2010, rooms: { total: 53 }, source: 'https://www.royalmansour.com/en/marrakech/riads/ (53 private riads)' },
  'Riad Kniza': { address: '34 Derb l’Hôtel, Bab Doukala', rooms: { total: 11, juniorSuites: 2, seniorSuites: 4, superior: 2 }, source: 'https://www.riadkniza.com/' },
  // Paris
  'The Peninsula Paris': { address: '19 Avenue Kléber', opened: 2014, rooms: { total: 200 }, source: 'https://en.wikipedia.org/wiki/The_Peninsula_Paris' },
  'Le Meurice': { address: '228 Rue de Rivoli', opened: 1835, rooms: { total: 160 }, source: 'https://www.dorchestercollection.com/paris/le-meurice/rooms-suites' },
  'Pullman Paris Tour Eiffel': { address: '18 Avenue de Suffren', rooms: { total: 430 }, source: 'https://pullman.accor.com/en/hotels/paris/7229/rooms.html' },
  'Generator Paris': { address: '9–11 Place du Colonel Fabien', opened: 2015, source: 'published as 916 beds, not rooms' },
  // Tokyo
  'Park Hyatt Tokyo': { address: '3-7-1-2 Nishi-Shinjuku, Shinjuku', opened: 1994, rooms: { total: 171 }, source: 'https://newsroom.hyatt.com/120925-Park-Hyatt-Tokyo-Reopens-Following-19-Month-Renovation (171 after 2025 reopening)' },
  'The Peninsula Tokyo': { address: '1-8-1 Yurakucho, Chiyoda', opened: 2007, rooms: { total: 302, seniorSuites: 47 }, source: 'https://www.peninsula.com/en/newsroom/tokyo' },
  'Hotel Gracery Shinjuku': { address: '1-19-1 Kabukicho, Shinjuku', opened: 2015, rooms: { total: 970 }, source: 'https://www.prnewswire.com/news-releases/hotel-gracery-shinjuku-opening-2015-now-taking-reservations-271955781.html' },
  // Lisbon
  'Four Seasons Hotel Ritz Lisbon': { address: 'Rua Rodrigo da Fonseca 88', opened: 1959, rooms: { total: 282, seniorSuites: 40 }, source: 'https://press.fourseasons.com/lisbon/hotel-facts/' },
  'Pestana Palace': { address: 'Rua Jau 54', opened: 2001, rooms: { total: 190, seniorSuites: 13 }, source: 'https://stories.pestana.com/en/pestana-palace-lisboa/' },
  'Memmo Alfama': { address: 'Travessa das Merceeiras 27', opened: 2013, rooms: { total: 42 }, source: 'https://www.frommers.com/destinations/lisbon/hotels/memmo-alfama/' },
  // Cape Town
  'One&Only Cape Town': { address: 'Dock Road, V&A Waterfront', opened: 2009, rooms: { total: 131, seniorSuites: 53 }, source: 'https://www.discoverafrica.com/accommodation/oneonly-cape-town-cape-town-va-waterfront-south-africa/ (78 rooms, 53 suites)' },
  'The Silo Hotel': { address: 'Silo Square, V&A Waterfront', opened: 2017, rooms: { total: 28 }, source: 'https://www.theroyalportfolio.com/the-silo-hotel/' },
  'The Marly': { address: '201 The Promenade, Victoria Road, Camps Bay', rooms: { total: 38, seniorSuites: 11 }, source: 'https://www.uyaphi.com/south-africa/cape-town/hotels/camps-bay/marly-camps-bay' },
  'Southern Sun Waterfront': { address: '1 Lower Buitengracht', rooms: { total: 537 }, source: 'https://www.southernsun.com/southern-sun-waterfront-cape-town/accommodation' },
  // Brașov
  'Aro Palace': { address: 'Bulevardul Eroilor 27', source: 'room count differs between sources' },
  'Casa Wagner': { address: 'Piața Sfatului 5', source: 'room count differs between sources' },
  'Teleferic Grand Hotel': { address: 'Strada Poiana Soarelui 243', rooms: { total: 127 }, source: 'https://www.poiana-brasov.com/en/accommodation/hotels/teleferic_grand_hotel.html' },
  // Sydney
  'Park Hyatt Sydney': { address: '7 Hickson Road, The Rocks', opened: 1990, rooms: { total: 155 }, source: 'https://www.hyatt.com/park-hyatt/en-US/sydph-park-hyatt-sydney' },
  'Shangri-La Sydney': { address: '176 Cumberland Street, The Rocks', rooms: { total: 565 }, source: 'https://www.shangri-la.com/sydney/shangrila/rooms-suites/' },
  'QT Sydney': { address: '49 Market Street', opened: 2012, source: 'room count differs between sources (198 / 200)' },
  'ibis Sydney Darling Harbour': { address: '70 Murray Street, Pyrmont', rooms: { total: 256 }, source: 'https://www.sydney.com/destinations/sydney/sydney-city/darling-harbour/accommodation/ibis-sydney-darling-harbour' },
}
