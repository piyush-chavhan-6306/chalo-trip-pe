export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  bestTime: string;
  highlights: string[];
  rating: number;
  color: string;
}

export const destinations: Destination[] = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    tagline: "Whitewashed cliffs above an azure sea",
    description:
      "Wander through narrow cobblestone paths, watch the sun melt into the caldera, and let the blue-domed churches frame your perfect weekend escape.",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80&auto=format&fit=crop",
    price: 420,
    duration: "3 days",
    bestTime: "May – October",
    highlights: ["Oia sunset", "Red Beach", "Wine tasting"],
    rating: 4.9,
    color: "#4A90D9",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    tagline: "Zen gardens and ancient temples",
    description:
      "Stroll through bamboo groves, discover centuries-old shrines, and savor the quiet beauty of Japan's cultural heart in a weekend of contemplation and wonder.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&auto=format&fit=crop",
    price: 580,
    duration: "3 days",
    bestTime: "March – May",
    highlights: ["Bamboo grove", "Kinkaku-ji", "Tea ceremony"],
    rating: 4.8,
    color: "#6B8E6B",
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    tagline: "Spice-scented souks and golden light",
    description:
      "Lose yourself in the labyrinthine medina, sip mint tea on a rooftop terrace, and watch the evening sky blush over the Atlas Mountains.",
    image:
      "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=800&q=80&auto=format&fit=crop",
    price: 350,
    duration: "3 days",
    bestTime: "March – May",
    highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Hammam"],
    rating: 4.7,
    color: "#D4A574",
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    tagline: "Pastel villages cascading to the sea",
    description:
      "Drive winding coastal roads, swim in hidden coves, and feast on fresh limoncello and seafood while the Mediterranean breeze carries your worries away.",
    image:
      "https://images.unsplash.com/photo-1633321702518-7fecdafb94d5?w=800&q=80&auto=format&fit=crop",
    price: 510,
    duration: "4 days",
    bestTime: "April – September",
    highlights: ["Positano stroll", "Lemon groves", "Coastal drive"],
    rating: 4.8,
    color: "#E8B86D",
  },
  {
    id: "banff",
    name: "Banff",
    country: "Canada",
    tagline: "Turquoise lakes beneath towering peaks",
    description:
      "Breathe in crisp mountain air, kayak across impossible blue water, and find stillness among the dramatic landscapes of the Canadian Rockies.",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80&auto=format&fit=crop",
    price: 390,
    duration: "3 days",
    bestTime: "June – September",
    highlights: ["Lake Louise", "Moraine Lake", "Gondola ride"],
    rating: 4.9,
    color: "#2E8B57",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    tagline: "Tile-clad streets and golden hour charm",
    description:
      "Ride vintage trams through pastel neighborhoods, listen to fado echoing from tiny taverns, and taste the city's legendary pastéis de nata.",
    image:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80&auto=format&fit=crop",
    price: 320,
    duration: "3 days",
    bestTime: "March – October",
    highlights: ["Alfama district", "Belém Tower", "Time Out Market"],
    rating: 4.7,
    color: "#C4956A",
  },
];
