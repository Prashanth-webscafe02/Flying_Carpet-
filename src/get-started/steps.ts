import {
  BedDouble, Building2, CarFront, Castle, Crown, Gem, Landmark, Mountain, Package, PawPrint,
  Plane, Star, Sun, Ticket, TreePalm, Users, Wallet, Waves, type LucideIcon,
} from 'lucide-react'

export type Choice = {
  id: string
  title: string
  text: string
  /** Short label shown in the tile's badge (e.g. a country code); otherwise `icon` is used. */
  code?: string
  icon?: LucideIcon
  meta?: string
}

export type StepId = 'market' | 'destinations' | 'specialise' | 'hotels'

export type Step = {
  id: StepId
  label: string
  eyebrow: string
  title: [string, string]
  intro: string
  tagline: string
  multi: boolean
  /** Set on optional steps: what happens if the agent skips. */
  skipHint?: string
  next: string
  choices: Choice[]
}

export const steps: Step[] = [
  {
    id: 'market',
    label: 'Your market',
    eyebrow: "Let's personalise your experience",
    title: ['Where do you', 'sell from?'],
    intro: 'This helps us show you the most relevant destinations, products and opportunities for your business.',
    tagline: 'Same world. More possibilities.',
    multi: false,
    next: 'Next',
    choices: [
      { id: 'in', code: 'IN', title: 'India', text: 'From vibrant cities to extraordinary escapes' },
      { id: 'za', code: 'ZA', title: 'South Africa', text: 'Unique destinations closer to home' },
      { id: 'us', code: 'US', title: 'United States', text: 'Iconic places, endless opportunities' },
      { id: 'ca', code: 'CA', title: 'Canada', text: 'Extraordinary journeys across the globe' },
    ],
  },
  {
    id: 'destinations',
    label: 'Destinations',
    eyebrow: "Let's personalise your experience",
    title: ['Which regions', 'do you sell most?'],
    intro: 'Select all that apply. This helps us show you the most relevant destinations, products and opportunities.',
    tagline: 'Same world. More possibilities.',
    multi: true,
    skipHint: "We'll show you popular destinations for your market",
    next: 'Next',
    choices: [
      { id: 'sea', icon: TreePalm, title: 'Southeast Asia', meta: '12 destinations', text: 'Beaches, culture, food and unforgettable experiences' },
      { id: 'me', icon: Landmark, title: 'Middle East', meta: '10 destinations', text: 'Modern cities, luxury and unique landscapes' },
      { id: 'eu', icon: Castle, title: 'Europe', meta: '20 destinations', text: 'History, art, and incredible diversity' },
      { id: 'af', icon: PawPrint, title: 'Africa', meta: '14 destinations', text: 'Wildlife, nature and extraordinary journeys' },
      { id: 'na', icon: Building2, title: 'North America', meta: '12 destinations', text: 'Iconic cities and breathtaking natural wonders' },
      { id: 'sa', icon: Mountain, title: 'South America', meta: '8 destinations', text: 'Vibrant cultures and extraordinary landscapes' },
      { id: 'oc', icon: Waves, title: 'Oceania', meta: '6 destinations', text: 'Stunning coastlines and unique adventures' },
      { id: 'is', icon: Sun, title: 'Indian Subcontinent', meta: '8 destinations', text: 'Rich culture, heritage and diverse experiences' },
    ],
  },
  {
    id: 'specialise',
    label: 'What you sell',
    eyebrow: 'Tailored for your business',
    title: ['What do you', 'specialise in?'],
    intro: "Choose all that apply. We'll show you destinations and products that match your expertise.",
    tagline: 'More ways to sell. More journeys to create.',
    multi: true,
    skipHint: "We'll show a mix of popular options",
    next: 'Next',
    choices: [
      { id: 'flights', icon: Plane, title: 'Flights', text: 'International and domestic flight bookings' },
      { id: 'hotels', icon: BedDouble, title: 'Hotels', text: 'Hotel bookings for leisure and business travel' },
      { id: 'experiences', icon: Ticket, title: 'Experiences', text: 'Tours, activities and unique local experiences' },
      { id: 'transfers', icon: CarFront, title: 'Transfers', text: 'Airport and local transfers' },
      { id: 'packages', icon: Package, title: 'Packages', text: 'Holiday packages and dynamic itineraries' },
      { id: 'groups', icon: Users, title: 'Groups', text: 'Group travel, MICE and special interest' },
    ],
  },
  {
    id: 'hotels',
    label: 'Hotel category',
    eyebrow: 'Almost there',
    title: ['What hotel category', 'do you sell most?'],
    intro: "Choose all that apply. We'll tailor your recommendations to the hotels your travellers love.",
    tagline: 'Every traveller finds their perfect stay.',
    multi: true,
    skipHint: "We'll show a mix of hotel options",
    next: 'Show my destinations',
    choices: [
      { id: 'luxury', icon: Crown, title: 'Luxury', meta: 'Ideal for high-value travellers', text: '5-star and ultra-luxury properties, premium resorts and exclusive experiences.' },
      { id: 'upscale', icon: Star, title: 'Upscale', meta: 'Perfect for business and leisure', text: '4-star hotels with excellent amenities and popular brands.' },
      { id: 'midscale', icon: Building2, title: 'Midscale', meta: 'Most popular worldwide', text: '3-star hotels offering great comfort and value for a wide range of travellers.' },
      { id: 'boutique', icon: Gem, title: 'Boutique & Heritage', meta: 'For one-of-a-kind stays', text: 'Unique, character-filled properties with local charm and authentic experiences.' },
      { id: 'budget', icon: Wallet, title: 'Budget', meta: 'Great for groups and long stays', text: 'Reliable and comfortable stays for value-conscious travellers.' },
    ],
  },
]
