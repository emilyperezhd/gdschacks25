// constants.ts
export const TRAVEL_DESTINATIONS = [
  {
    id: 1,
    slug: "copenhagen",
    destination: "Copenhagen, Denmark",
    heroImage: "/GettyImages-1587697699.jpg.webp",
    overview: `
      Copenhagen is Denmark’s capital and most populous city.  
      Famous for its canals, colorful waterfront houses at Nyhavn,  
      and the Tivoli Gardens (one of the oldest amusement parks in the world).
    `.trim(),
    bestTimeToVisit: "May–September",
    topAttractions: [
      "Nyhavn Canal",
      "Tivoli Gardens",
      "The Little Mermaid Statue",
      "Christiansborg Palace",
    ],
    tips: [
      "Pick up a Copenhagen Card for free public transport and attraction entry.",
      "Rent a bike — the city is built for cycling.",
      "Don’t miss the street food at Reffen market.",
    ],
    transportation: "Bikes, Metro, Ferries",
    foodPlan: { title: "Nordic Green Cuisine" },
    ecoRating: "★★★★★",
  },
  {
    id: 2,
    slug: "costa-rica",
    destination: "Costa Rica",
    heroImage: "/Costa-Rica-waterfall-family-main.jpg.avif",
    overview: `
      Costa Rica is a biodiversity hotspot in Central America.  
      Zip-line above cloud forests, stay within off-grid eco-lodges,  
      and help support reforestation projects along the way.
    `.trim(),
    bestTimeToVisit: "December–April",
    topAttractions: [
      "Arenal Volcano",
      "Monteverde Cloud Forest",
      "Manuel Antonio National Park",
      "La Fortuna Waterfall",
    ],
    tips: [
      "Pack light rain gear — afternoon showers are common year-round.",
      "Support local guides for wildlife tours.",
      "Use refillable water bottles; many hotels have filtered stations.",
    ],
    transportation: "Electric shuttles, Walking",
    foodPlan: { title: "Organic Farm-to-Table" },
    ecoRating: "★★★★☆",
  },
  {
    id: 3,
    slug: "kyoto",
    destination: "Kyoto, Japan",
    heroImage: "/kyoto.webp",
    overview: `
      Kyoto was Japan’s capital for over a thousand years,  
      home to 17 UNESCO World Heritage sites.  
      Wander ancient temples, stroll bamboo groves,  
      and stay in traditional green ryokans.
    `.trim(),
    bestTimeToVisit: "March–May & October–November",
    topAttractions: [
      "Fushimi Inari Shrine",
      "Arashiyama Bamboo Grove",
      "Kinkaku-ji Temple (Golden Pavilion)",
      "Gion Geisha District",
    ],
    tips: [
      "Buy a JR Rail Pass to save on inter-city travel.",
      "Book ryokan stays months in advance, especially in spring.",
      "Respect temple etiquette: remove shoes, stay quiet in halls.",
    ],
    transportation: "Trains, Buses",
    foodPlan: { title: "Plant-Based Cuisine" },
    ecoRating: "★★★★☆",
  },
]
