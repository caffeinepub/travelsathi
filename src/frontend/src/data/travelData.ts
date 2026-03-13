export type DestinationCategory =
  | "beach"
  | "mountain"
  | "heritage"
  | "spiritual"
  | "nature"
  | "adventure";

export interface Attraction {
  name: string;
  description: string;
  entryFee: string;
  type: "top" | "hidden";
}

export interface Route {
  mode: "flight" | "train" | "bus";
  from: string;
  duration: string;
  cost: string;
  details: string;
}

export interface Stay {
  id: string;
  name: string;
  type: "hotel" | "hostel" | "homestay" | "resort";
  pricePerNight: number;
  rating: number;
  amenities: string[];
  location: string;
  destination: string;
}

export interface FoodPlace {
  id: string;
  name: string;
  type: "restaurant" | "street_food" | "cafe";
  cuisine: string;
  priceRange: "budget" | "mid" | "luxury";
  specialty: string;
  location: string;
  destination: string;
  rating: number;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  state: string;
  category: DestinationCategory;
  image: string;
  rating: number;
  reviewCount: number;
  bestSeason: string;
  avgBudgetPerDay: number;
  description: string;
  attractions: Attraction[];
  routes: Route[];
  tips: string[];
  stays: Stay[];
  food: FoodPlace[];
  trending: boolean;
  budgetFriendly: boolean;
}

export interface LocalTip {
  id: string;
  name: string;
  destination: string;
  description: string;
  category: string;
  submittedBy: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "goa",
    name: "Goa",
    tagline: "Sun, Sand & Soul",
    state: "Goa",
    category: "beach",
    image: "/assets/generated/dest-goa.dim_800x500.jpg",
    rating: 4.6,
    reviewCount: 12400,
    bestSeason: "November – February",
    avgBudgetPerDay: 1800,
    description:
      "India's beach paradise — a vibrant blend of Portuguese heritage, golden beaches, fresh seafood, and legendary nightlife.",
    attractions: [
      {
        name: "Baga Beach",
        description:
          "Bustling North Goa beach famous for nightlife, shacks, and water sports",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Calangute Beach",
        description:
          "North Goa's most popular beach with vibrant shacks, nightlife, and water sports",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Anjuna Beach",
        description:
          "Famous for its weekly flea market and laid-back beach cafes",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Palolem Beach",
        description:
          "South Goa's scenic crescent beach with white sand and dolphin spotting trips",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Basilica of Bom Jesus",
        description:
          "UNESCO World Heritage site housing St. Francis Xavier's remains, built in 1605",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Se Cathedral",
        description:
          "One of Asia's largest churches, a UNESCO World Heritage site in Old Goa",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Fort Aguada",
        description:
          "Iconic 17th-century Portuguese fort with a lighthouse overlooking the Arabian Sea",
        entryFee: "₹25",
        type: "top",
      },
      {
        name: "Chapora Fort",
        description:
          "Panoramic views of North Goa; made famous by the Bollywood film Dil Chahta Hai",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Dudhsagar Falls",
        description:
          "One of India's tallest and most spectacular four-tiered waterfalls",
        entryFee: "₹400",
        type: "top",
      },
      {
        name: "Club Tito's & Nightlife",
        description:
          "Legendary nightlife strip in Baga with Club Tito's, Shiva Valley (trance), and LPK",
        entryFee: "Varies",
        type: "top",
      },
      {
        name: "Morjim Beach",
        description:
          "Known as 'Little Russia' — serene North Goa beach great for spotting Olive Ridley turtles",
        entryFee: "Free",
        type: "hidden",
      },
      {
        name: "Agonda Beach",
        description:
          "Secluded, peaceful South Goa beach away from the crowds — perfect for relaxation",
        entryFee: "Free",
        type: "hidden",
      },
      {
        name: "Cola Beach",
        description:
          "Unique hidden beach featuring a freshwater lagoon right next to the sea",
        entryFee: "Free",
        type: "hidden",
      },
      {
        name: "Divar Island",
        description:
          "Scenic river island with old Goan homes and paddy fields — barely touristy",
        entryFee: "Free",
        type: "hidden",
      },
      {
        name: "Reis Magos Fort",
        description:
          "One of Goa's oldest forts with great views of the Mandovi River",
        entryFee: "₹25",
        type: "hidden",
      },
      {
        name: "Thalassa Restaurant",
        description:
          "Iconic Greek cuisine restaurant in Siolim with stunning sunset views over the sea",
        entryFee: "Free",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "flight",
        from: "Mumbai",
        duration: "1 hr",
        cost: "₹2,500–₹6,000",
        details: "Fly to Goa (GOI) – Dabolim/Mopa airport",
      },
      {
        mode: "flight",
        from: "Delhi",
        duration: "2 hrs",
        cost: "₹3,500–₹8,000",
        details: "Multiple daily flights from IGI airport",
      },
      {
        mode: "train",
        from: "Mumbai",
        duration: "9–12 hrs",
        cost: "₹400–₹1,800",
        details: "Mandovi/Jan Shatabdi Express to Madgaon",
      },
      {
        mode: "bus",
        from: "Mumbai",
        duration: "12–14 hrs",
        cost: "₹600–₹1,200",
        details: "Luxury overnight sleeper buses available",
      },
    ],
    tips: [
      "Rent a scooter (₹300–₹400/day) to explore freely",
      "North Goa for parties; South Goa for peace",
      "Avoid peak season (Dec 20–Jan 5) — prices triple",
      "Try local bebinca dessert and Goan fish curry",
      "Visit November to February for the best beach weather — this is peak season",
      "Plan 5–7 days to experience both lively North Goa and tranquil South Goa",
    ],
    stays: [
      {
        id: "goa-h1",
        name: "The Leela Goa",
        type: "resort",
        pricePerNight: 12000,
        rating: 4.8,
        amenities: ["Pool", "Spa", "Beach Access", "WiFi"],
        location: "Cavelossim",
        destination: "goa",
      },
      {
        id: "goa-h2",
        name: "Zostel Goa",
        type: "hostel",
        pricePerNight: 500,
        rating: 4.3,
        amenities: ["WiFi", "Common Kitchen", "Lockers", "AC"],
        location: "Anjuna",
        destination: "goa",
      },
      {
        id: "goa-h3",
        name: "Villa Santana",
        type: "homestay",
        pricePerNight: 1800,
        rating: 4.5,
        amenities: ["AC", "WiFi", "Breakfast", "Garden"],
        location: "Calangute",
        destination: "goa",
      },
      {
        id: "goa-h4",
        name: "Lemon Tree Amarante",
        type: "hotel",
        pricePerNight: 4500,
        rating: 4.4,
        amenities: ["Pool", "Restaurant", "WiFi", "AC"],
        location: "Candolim",
        destination: "goa",
      },
      {
        id: "goa-h5",
        name: "Palolem Beach Resort",
        type: "resort",
        pricePerNight: 3200,
        rating: 4.2,
        amenities: ["Beach Front", "Restaurant", "WiFi", "Yoga"],
        location: "Palolem",
        destination: "goa",
      },
    ],
    food: [
      {
        id: "goa-f1",
        name: "Britto's",
        type: "restaurant",
        cuisine: "Goan Seafood",
        priceRange: "mid",
        specialty: "Fish Thali & Prawn Curry",
        location: "Baga Beach",
        destination: "goa",
        rating: 4.4,
      },
      {
        id: "goa-f2",
        name: "Infantaria Bakery",
        type: "cafe",
        cuisine: "Bakery & Café",
        priceRange: "budget",
        specialty: "Croissants & Local Bebinca",
        location: "Calangute",
        destination: "goa",
        rating: 4.5,
      },
      {
        id: "goa-f3",
        name: "Puneet Fish Corner",
        type: "street_food",
        cuisine: "Konkani Street Food",
        priceRange: "budget",
        specialty: "Fried Pomfret & Sol Kadhi",
        location: "Mapusa Market",
        destination: "goa",
        rating: 4.3,
      },
      {
        id: "goa-f4",
        name: "Fisherman's Wharf",
        type: "restaurant",
        cuisine: "Coastal Goan",
        priceRange: "luxury",
        specialty: "Lobster & Tiger Prawns",
        location: "Cavelossim",
        destination: "goa",
        rating: 4.6,
      },
    ],
    trending: true,
    budgetFriendly: true,
  },
  {
    id: "manali",
    name: "Manali",
    tagline: "Where Heaven Meets Earth",
    state: "Himachal Pradesh",
    category: "mountain",
    image: "/assets/generated/dest-manali.dim_800x500.jpg",
    rating: 4.7,
    reviewCount: 9800,
    bestSeason: "October – June",
    avgBudgetPerDay: 2200,
    description:
      "A Himalayan gem with snow-capped peaks, ancient temples, apple orchards, and adrenaline-pumping adventure sports.",
    attractions: [
      {
        name: "Rohtang Pass",
        description:
          "Scenic high-altitude mountain pass at 3,978m with snow year-round",
        entryFee: "₹550 (permit)",
        type: "top",
      },
      {
        name: "Solang Valley",
        description:
          "Adventure hub for skiing, paragliding and zorbing against mountain backdrop",
        entryFee: "Activities: ₹500–₹2,000",
        type: "top",
      },
      {
        name: "Hadimba Temple",
        description: "500-year-old pagoda-style temple in a cedar forest",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Old Manali",
        description:
          "Charming village with cafes, craft shops, and a hippie vibe",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Hamta Pass Trek",
        description:
          "Multi-day Himalayan trek through meadows and glaciers — offbeat paradise",
        entryFee: "Free (guide ₹1,500)",
        type: "hidden",
      },
      {
        name: "Naggar Castle",
        description:
          "500-year-old stone castle with Himalayan views, barely visited",
        entryFee: "₹30",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "flight",
        from: "Delhi",
        duration: "1.5 hrs",
        cost: "₹4,000–₹9,000",
        details: "Fly to Kullu-Manali airport (KUU), then 1 hr drive",
      },
      {
        mode: "bus",
        from: "Delhi",
        duration: "14–16 hrs",
        cost: "₹700–₹1,800",
        details: "HRTC Volvo overnight buses from ISBT Kashmiri Gate",
      },
      {
        mode: "train",
        from: "Delhi",
        duration: "12 hrs train + 3 hrs bus",
        cost: "₹600–₹1,500",
        details: "Train to Chandigarh/Ambala, then bus to Manali",
      },
    ],
    tips: [
      "Book Rohtang Pass permit online 1–2 days in advance",
      "Carry warm layers — nights drop below 5°C even in summer",
      "Best snow: Dec–Feb; Best trekking: May–June, Sep–Oct",
      "Try local siddu (stuffed bread) and trout fish",
    ],
    stays: [
      {
        id: "manali-h1",
        name: "Span Resort",
        type: "resort",
        pricePerNight: 8000,
        rating: 4.6,
        amenities: ["Riverside", "Spa", "Restaurant", "WiFi"],
        location: "Kullu",
        destination: "manali",
      },
      {
        id: "manali-h2",
        name: "Zostel Manali",
        type: "hostel",
        pricePerNight: 450,
        rating: 4.4,
        amenities: ["Mountain View", "WiFi", "Common Room", "Café"],
        location: "Old Manali",
        destination: "manali",
      },
      {
        id: "manali-h3",
        name: "Apple Country Homestay",
        type: "homestay",
        pricePerNight: 1200,
        rating: 4.6,
        amenities: ["Home Food", "WiFi", "Orchard", "Heater"],
        location: "Naggar",
        destination: "manali",
      },
      {
        id: "manali-h4",
        name: "Hotel Snow Valley",
        type: "hotel",
        pricePerNight: 2800,
        rating: 4.3,
        amenities: ["Mountain View", "Restaurant", "WiFi", "Heater"],
        location: "Mall Road",
        destination: "manali",
      },
    ],
    food: [
      {
        id: "manali-f1",
        name: "Drifter's Inn",
        type: "cafe",
        cuisine: "Continental & Indian",
        priceRange: "budget",
        specialty: "Wood-fired Pizza & Momos",
        location: "Old Manali",
        destination: "manali",
        rating: 4.4,
      },
      {
        id: "manali-f2",
        name: "Johnson's Café",
        type: "restaurant",
        cuisine: "Multi-cuisine",
        priceRange: "mid",
        specialty: "Trout Fish & Apple Pie",
        location: "Circuit House Road",
        destination: "manali",
        rating: 4.5,
      },
      {
        id: "manali-f3",
        name: "Sher-E-Punjab",
        type: "restaurant",
        cuisine: "North Indian",
        priceRange: "budget",
        specialty: "Dal Makhani & Butter Naan",
        location: "Mall Road",
        destination: "manali",
        rating: 4.2,
      },
    ],
    trending: true,
    budgetFriendly: false,
  },
  {
    id: "jaipur",
    name: "Jaipur",
    tagline: "The Pink City",
    state: "Rajasthan",
    category: "heritage",
    image: "/assets/generated/dest-jaipur.dim_800x500.jpg",
    rating: 4.5,
    reviewCount: 15200,
    bestSeason: "October – March",
    avgBudgetPerDay: 1600,
    description:
      "India's most regal city — a living museum of Rajput palaces, vibrant bazaars, and world-class cuisine.",
    attractions: [
      {
        name: "Amber Fort",
        description:
          "Magnificent hilltop fort with stunning Indo-Saracenic architecture",
        entryFee: "₹100 (Indian)",
        type: "top",
      },
      {
        name: "Hawa Mahal",
        description:
          'Iconic "Palace of Winds" with 953 intricately carved windows',
        entryFee: "₹50",
        type: "top",
      },
      {
        name: "City Palace",
        description:
          "Royal residence complex housing museums and grand courtyards",
        entryFee: "₹200",
        type: "top",
      },
      {
        name: "Jantar Mantar",
        description:
          "UNESCO astronomical observatory with giant stone instruments",
        entryFee: "₹50",
        type: "top",
      },
      {
        name: "Galta Ji Temple",
        description:
          'Monkey temple in natural gorge — locals call it the "Monkey Temple"',
        entryFee: "Free",
        type: "hidden",
      },
      {
        name: "Chandpole Bazaar",
        description:
          "Authentic local market away from tourists — best for blue pottery",
        entryFee: "Free",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "flight",
        from: "Mumbai",
        duration: "1.5 hrs",
        cost: "₹3,000–₹7,000",
        details: "Fly to Jaipur International Airport (JAI)",
      },
      {
        mode: "train",
        from: "Delhi",
        duration: "4–5 hrs",
        cost: "₹200–₹800",
        details: "Shatabdi/Intercity Express from New Delhi/Hazrat Nizamuddin",
      },
      {
        mode: "bus",
        from: "Delhi",
        duration: "5–6 hrs",
        cost: "₹350–₹700",
        details: "RSRTC Volvo buses from ISBT Sarai Kale Khan",
      },
    ],
    tips: [
      "Pink City Pass (₹300) covers 6 major monuments",
      "Rickshaw ride through old city is a must",
      "Bargain hard at Johri Bazaar for gemstones",
      "Try dal baati churma and ghewar sweet",
    ],
    stays: [
      {
        id: "jaipur-h1",
        name: "Rambagh Palace",
        type: "resort",
        pricePerNight: 25000,
        rating: 4.9,
        amenities: ["Heritage Pool", "Spa", "Fine Dining", "Tennis"],
        location: "Bhawani Singh Road",
        destination: "jaipur",
      },
      {
        id: "jaipur-h2",
        name: "Moustache Hostel",
        type: "hostel",
        pricePerNight: 400,
        rating: 4.5,
        amenities: ["Rooftop Café", "WiFi", "AC", "Lockers"],
        location: "Civil Lines",
        destination: "jaipur",
      },
      {
        id: "jaipur-h3",
        name: "Madhuban Homestay",
        type: "homestay",
        pricePerNight: 1500,
        rating: 4.6,
        amenities: ["Home-cooked Meals", "WiFi", "Heritage Décor", "AC"],
        location: "Bani Park",
        destination: "jaipur",
      },
      {
        id: "jaipur-h4",
        name: "Hotel Pearl Palace",
        type: "hotel",
        pricePerNight: 1800,
        rating: 4.4,
        amenities: ["Rooftop Restaurant", "WiFi", "AC", "Tour Desk"],
        location: "Hathroi Fort",
        destination: "jaipur",
      },
    ],
    food: [
      {
        id: "jaipur-f1",
        name: "Laxmi Misthan Bhandar",
        type: "restaurant",
        cuisine: "Rajasthani",
        priceRange: "budget",
        specialty: "Dal Baati Churma & Kachori",
        location: "Johari Bazaar",
        destination: "jaipur",
        rating: 4.5,
      },
      {
        id: "jaipur-f2",
        name: "Masala Chowk",
        type: "street_food",
        cuisine: "Rajasthani Street Food",
        priceRange: "budget",
        specialty: "Pyaaz Kachori & Lassi",
        location: "Ram Niwas Garden",
        destination: "jaipur",
        rating: 4.4,
      },
      {
        id: "jaipur-f3",
        name: "1135 AD",
        type: "restaurant",
        cuisine: "Royal Rajasthani",
        priceRange: "luxury",
        specialty: "Laal Maas & Safed Maas",
        location: "Amber Fort Complex",
        destination: "jaipur",
        rating: 4.7,
      },
    ],
    trending: true,
    budgetFriendly: true,
  },
  {
    id: "kerala",
    name: "Kerala Backwaters",
    tagline: "God's Own Country",
    state: "Kerala",
    category: "nature",
    image: "/assets/generated/dest-kerala.dim_800x500.jpg",
    rating: 4.8,
    reviewCount: 11600,
    bestSeason: "September – March",
    avgBudgetPerDay: 2400,
    description:
      "Serene backwater canals, lush coconut groves, Ayurveda retreats, and spice-scented cooking — Kerala is pure magic.",
    attractions: [
      {
        name: "Alleppey Backwaters",
        description:
          "Overnight houseboat cruise through scenic canals and rice fields",
        entryFee: "Houseboat ₹6,000–₹15,000",
        type: "top",
      },
      {
        name: "Periyar Wildlife Sanctuary",
        description: "Tiger reserve with boat safari on scenic lake",
        entryFee: "₹150",
        type: "top",
      },
      {
        name: "Munnar Tea Gardens",
        description: "Rolling hills covered in emerald tea plantations",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Varkala Cliff Beach",
        description: "Dramatic red cliff beach with natural springs",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Kumarakom Bird Sanctuary",
        description: "Lake-side bird paradise with rare migratory species",
        entryFee: "₹50",
        type: "hidden",
      },
      {
        name: "Kumbalanghi Eco Village",
        description:
          "Traditional fishing village — experience authentic Kerala life",
        entryFee: "Free",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "flight",
        from: "Mumbai",
        duration: "2 hrs",
        cost: "₹3,500–₹8,000",
        details: "Fly to Kochi (COK) or Thiruvananthapuram (TRV)",
      },
      {
        mode: "train",
        from: "Mumbai",
        duration: "24–32 hrs",
        cost: "₹700–₹2,500",
        details: "Netravati/Kerala Express to Kottayam/Alappuzha",
      },
      {
        mode: "flight",
        from: "Delhi",
        duration: "3 hrs",
        cost: "₹4,000–₹9,000",
        details: "Direct flights to Kochi International Airport",
      },
    ],
    tips: [
      "Book houseboats directly at boat jetty for better rates",
      "Try Ayurvedic massage packages (from ₹800)",
      "Kerala sadya (banana leaf feast) is a must on Sundays",
      "Carry mosquito repellent for backwater areas",
    ],
    stays: [
      {
        id: "kerala-h1",
        name: "Kumarakom Lake Resort",
        type: "resort",
        pricePerNight: 18000,
        rating: 4.9,
        amenities: ["Backwater View", "Pool", "Ayurveda", "Restaurant"],
        location: "Kumarakom",
        destination: "kerala",
      },
      {
        id: "kerala-h2",
        name: "Zostel Alleppey",
        type: "hostel",
        pricePerNight: 600,
        rating: 4.4,
        amenities: ["Canal View", "WiFi", "Kayak Rental", "Café"],
        location: "Alleppey",
        destination: "kerala",
      },
      {
        id: "kerala-h3",
        name: "Abad Whispering Palms",
        type: "resort",
        pricePerNight: 5500,
        rating: 4.5,
        amenities: ["Pool", "Backwater Cruise", "WiFi", "Restaurant"],
        location: "Kumarakom",
        destination: "kerala",
      },
      {
        id: "kerala-h4",
        name: "Coconut Creek Homestay",
        type: "homestay",
        pricePerNight: 2200,
        rating: 4.7,
        amenities: ["Home Food", "Canoe", "WiFi", "AC"],
        location: "Alleppey",
        destination: "kerala",
      },
    ],
    food: [
      {
        id: "kerala-f1",
        name: "Arya Bhavan",
        type: "restaurant",
        cuisine: "Kerala Vegetarian",
        priceRange: "budget",
        specialty: "Kerala Sadya & Appam Stew",
        location: "Kochi",
        destination: "kerala",
        rating: 4.4,
      },
      {
        id: "kerala-f2",
        name: "Kashi Art Café",
        type: "cafe",
        cuisine: "Fusion & Kerala",
        priceRange: "mid",
        specialty: "Karimeen Fish Fry & Filter Coffee",
        location: "Fort Kochi",
        destination: "kerala",
        rating: 4.6,
      },
      {
        id: "kerala-f3",
        name: "Paragon Restaurant",
        type: "restaurant",
        cuisine: "Malabar",
        priceRange: "mid",
        specialty: "Malabar Biryani & Kozhikodan Halwa",
        location: "Kozhikode",
        destination: "kerala",
        rating: 4.5,
      },
    ],
    trending: false,
    budgetFriendly: false,
  },
  {
    id: "varanasi",
    name: "Varanasi",
    tagline: "The City of Light",
    state: "Uttar Pradesh",
    category: "spiritual",
    image: "/assets/generated/dest-varanasi.dim_800x500.jpg",
    rating: 4.6,
    reviewCount: 10200,
    bestSeason: "October – March",
    avgBudgetPerDay: 1200,
    description:
      "One of the world's oldest living cities — witness Ganga Aarti, ancient ghats, silk weavers, and profound spirituality.",
    attractions: [
      {
        name: "Dashashwamedh Ghat",
        description:
          "Spectacular evening Ganga Aarti ceremony with fire rituals",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Kashi Vishwanath Temple",
        description: "Most sacred Shiva temple, rebuilt in gold-plated dome",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Sarnath",
        description:
          "Where Buddha gave his first sermon — Buddhist excavation site",
        entryFee: "₹15",
        type: "top",
      },
      {
        name: "Morning Boat Ride",
        description:
          "Sunrise boat ride past 88 ghats — most memorable India experience",
        entryFee: "₹200–₹400",
        type: "top",
      },
      {
        name: "Assi Ghat",
        description: "Most serene ghat for yoga at dawn, away from crowds",
        entryFee: "Free",
        type: "hidden",
      },
      {
        name: "Vishwanath Gali",
        description:
          "Labyrinthine silk-weaver lanes with authentic Banarasi workshops",
        entryFee: "Free",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "flight",
        from: "Delhi",
        duration: "1.5 hrs",
        cost: "₹3,000–₹7,000",
        details: "Fly to Lal Bahadur Shastri Airport (VNS), Varanasi",
      },
      {
        mode: "train",
        from: "Delhi",
        duration: "8–12 hrs",
        cost: "₹300–₹1,200",
        details: "Shiv Ganga/Kashi Express from New Delhi station",
      },
      {
        mode: "bus",
        from: "Lucknow",
        duration: "4–5 hrs",
        cost: "₹200–₹400",
        details: "Regular UP Roadways buses from Lucknow",
      },
    ],
    tips: [
      "Attend Ganga Aarti at 7 PM daily — arrive by 6:30 PM for good spot",
      "Morning boat ride starts at 5:30 AM — magical at sunrise",
      "Banarasi paan and thandai are local specialties",
      "Carry cash — most ghat shops don't accept cards",
    ],
    stays: [
      {
        id: "varanasi-h1",
        name: "BrijRama Palace",
        type: "resort",
        pricePerNight: 15000,
        rating: 4.8,
        amenities: ["Ganga View", "Heritage Décor", "Yoga", "Restaurant"],
        location: "Darbhanga Ghat",
        destination: "varanasi",
      },
      {
        id: "varanasi-h2",
        name: "Stops Hostel",
        type: "hostel",
        pricePerNight: 380,
        rating: 4.3,
        amenities: ["Ghat Nearby", "WiFi", "Common Area", "Tours"],
        location: "Assi Ghat",
        destination: "varanasi",
      },
      {
        id: "varanasi-h3",
        name: "Ganges View Homestay",
        type: "homestay",
        pricePerNight: 1600,
        rating: 4.5,
        amenities: ["River View", "Home Meals", "WiFi", "AC"],
        location: "Shivala Ghat",
        destination: "varanasi",
      },
      {
        id: "varanasi-h4",
        name: "Hotel Surya",
        type: "hotel",
        pricePerNight: 2400,
        rating: 4.2,
        amenities: ["Rooftop View", "Restaurant", "WiFi", "AC"],
        location: "The Mall",
        destination: "varanasi",
      },
    ],
    food: [
      {
        id: "varanasi-f1",
        name: "Kashi Chat Bhandar",
        type: "street_food",
        cuisine: "Banarasi Street Food",
        priceRange: "budget",
        specialty: "Tamatar Chaat & Dahi Puri",
        location: "Godaulia Chowk",
        destination: "varanasi",
        rating: 4.6,
      },
      {
        id: "varanasi-f2",
        name: "Blue Lassi Shop",
        type: "cafe",
        cuisine: "Drinks & Snacks",
        priceRange: "budget",
        specialty: "Fruit Lassi & Thandai",
        location: "Vishwanath Gali",
        destination: "varanasi",
        rating: 4.7,
      },
      {
        id: "varanasi-f3",
        name: "Keshari Restaurant",
        type: "restaurant",
        cuisine: "North Indian",
        priceRange: "budget",
        specialty: "Banarasi Kachori & Sabzi",
        location: "Luxa Road",
        destination: "varanasi",
        rating: 4.3,
      },
    ],
    trending: false,
    budgetFriendly: true,
  },
  {
    id: "ladakh",
    name: "Ladakh",
    tagline: "Land of High Passes",
    state: "Jammu & Kashmir",
    category: "adventure",
    image: "/assets/generated/dest-ladakh.dim_800x500.jpg",
    rating: 4.9,
    reviewCount: 8400,
    bestSeason: "June – September",
    avgBudgetPerDay: 2800,
    description:
      "Earth's rooftop — dramatic moonscapes, turquoise lakes, ancient monasteries, and the world's highest motorable roads.",
    attractions: [
      {
        name: "Pangong Tso Lake",
        description:
          "Surreal high-altitude lake changing colors from blue to green to red",
        entryFee: "₹400 (permit)",
        type: "top",
      },
      {
        name: "Nubra Valley",
        description:
          "Sand dunes with double-humped camels against Himalayan backdrop",
        entryFee: "Permit required",
        type: "top",
      },
      {
        name: "Thiksey Monastery",
        description: "Hilltop monastery resembling Potala Palace in Lhasa",
        entryFee: "₹50",
        type: "top",
      },
      {
        name: "Magnetic Hill",
        description: "Optical illusion where vehicles appear to roll uphill",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Tso Moriri Lake",
        description:
          "Pristine high-altitude lake visited by few — crystal clear and isolated",
        entryFee: "Free",
        type: "hidden",
      },
      {
        name: "Hemis National Park",
        description:
          "Best place to spot snow leopards in winter — offbeat wildlife expedition",
        entryFee: "₹200",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "flight",
        from: "Delhi",
        duration: "1.5 hrs",
        cost: "₹5,000–₹12,000",
        details: "Direct flights to Kushok Bakula Rimpochee Airport, Leh",
      },
      {
        mode: "bus",
        from: "Manali",
        duration: "18–20 hrs",
        cost: "₹700–₹1,200",
        details: "HRTC bus via Manali-Leh Highway (open June–Sep only)",
      },
    ],
    tips: [
      "Acclimatize for 2 days before any high-altitude activity",
      "Inner Line Permits needed for Pangong, Nubra, Tso Moriri",
      "Carry warm clothes even in summer — nights below 0°C",
      "Momos and thukpa (noodle soup) are must-tries",
    ],
    stays: [
      {
        id: "ladakh-h1",
        name: "The Grand Dragon",
        type: "hotel",
        pricePerNight: 7500,
        rating: 4.7,
        amenities: ["Mountain View", "Restaurant", "WiFi", "Oxygen Bar"],
        location: "Upper Tukcha",
        destination: "ladakh",
      },
      {
        id: "ladakh-h2",
        name: "Stok Palace Heritage",
        type: "resort",
        pricePerNight: 12000,
        rating: 4.8,
        amenities: ["Palace Grounds", "Restaurant", "Heritage Tours", "WiFi"],
        location: "Stok Village",
        destination: "ladakh",
      },
      {
        id: "ladakh-h3",
        name: "Ladakhi House",
        type: "homestay",
        pricePerNight: 1800,
        rating: 4.7,
        amenities: [
          "Home Food",
          "Mountain View",
          "Cultural Experience",
          "WiFi",
        ],
        location: "Leh Old Town",
        destination: "ladakh",
      },
      {
        id: "ladakh-h4",
        name: "Snow Lion Hostel",
        type: "hostel",
        pricePerNight: 550,
        rating: 4.3,
        amenities: ["Common Kitchen", "WiFi", "Rooftop", "Travel Desk"],
        location: "Leh",
        destination: "ladakh",
      },
    ],
    food: [
      {
        id: "ladakh-f1",
        name: "Gesmo Restaurant",
        type: "restaurant",
        cuisine: "Tibetan & Ladakhi",
        priceRange: "budget",
        specialty: "Thukpa & Butter Tea",
        location: "Fort Road, Leh",
        destination: "ladakh",
        rating: 4.4,
      },
      {
        id: "ladakh-f2",
        name: "The Tibetan Kitchen",
        type: "restaurant",
        cuisine: "Tibetan",
        priceRange: "mid",
        specialty: "Thenthuk & Skyu Soup",
        location: "Main Bazaar, Leh",
        destination: "ladakh",
        rating: 4.3,
      },
      {
        id: "ladakh-f3",
        name: "Bon Appetit",
        type: "cafe",
        cuisine: "Multi-cuisine",
        priceRange: "mid",
        specialty: "Organic Meals & Tibetan Bread",
        location: "Changspa, Leh",
        destination: "ladakh",
        rating: 4.5,
      },
    ],
    trending: true,
    budgetFriendly: false,
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    tagline: "Yoga Capital of the World",
    state: "Uttarakhand",
    category: "adventure",
    image: "/assets/generated/dest-rishikesh.dim_800x500.jpg",
    rating: 4.5,
    reviewCount: 9100,
    bestSeason: "February – November",
    avgBudgetPerDay: 1400,
    description:
      "Where the Ganges roars, yoga blooms, and adventure awaits — white-water rafting, bungee jumping, and spiritual retreat all in one.",
    attractions: [
      {
        name: "Laxman Jhula",
        description:
          "Iconic suspension bridge over Ganges with temple-lined banks",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "White Water Rafting",
        description: "16–36 km Ganges rafting through Grade 3–4 rapids",
        entryFee: "₹600–₹1,500",
        type: "top",
      },
      {
        name: "Triveni Ghat",
        description:
          "Largest ghat in Rishikesh for evening Ganga Aarti ceremony",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Beatles Ashram",
        description:
          "Abandoned ashram where the Beatles meditated in 1968 — stunning murals",
        entryFee: "₹150",
        type: "top",
      },
      {
        name: "Kunjapuri Temple Trek",
        description:
          "Pre-dawn hike to ridge-top temple for Himalayan sunrise panorama",
        entryFee: "Free",
        type: "hidden",
      },
      {
        name: "Neelkanth Mahadev Temple",
        description:
          "Mountain temple 32 km from Rishikesh — serene and crowd-free",
        entryFee: "Free",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "train",
        from: "Delhi",
        duration: "5–6 hrs",
        cost: "₹200–₹600",
        details: "Train to Haridwar, then bus/taxi 30 mins to Rishikesh",
      },
      {
        mode: "bus",
        from: "Delhi",
        duration: "6–7 hrs",
        cost: "₹350–₹700",
        details: "Direct Volvo buses from ISBT Kashmiri Gate",
      },
      {
        mode: "flight",
        from: "Delhi",
        duration: "1 hr + 45 min drive",
        cost: "₹3,000–₹7,000",
        details: "Fly to Jolly Grant Airport, Dehradun",
      },
    ],
    tips: [
      "Book rafting packages in advance during peak season",
      "Camp on Ganges banks for unforgettable experience (₹800–₹1,500)",
      "Wear modest clothing near temples and ashrams",
      "Try the famous Chotiwala restaurant near Laxman Jhula",
    ],
    stays: [
      {
        id: "rishikesh-h1",
        name: "Aloha on the Ganges",
        type: "resort",
        pricePerNight: 6000,
        rating: 4.6,
        amenities: ["River View", "Yoga Classes", "Pool", "Restaurant"],
        location: "Tapovan",
        destination: "rishikesh",
      },
      {
        id: "rishikesh-h2",
        name: "Zostel Rishikesh",
        type: "hostel",
        pricePerNight: 420,
        rating: 4.5,
        amenities: ["Ganges View", "WiFi", "Café", "Yoga Sessions"],
        location: "Laxman Jhula",
        destination: "rishikesh",
      },
      {
        id: "rishikesh-h3",
        name: "Parmarth Niketan Ashram",
        type: "homestay",
        pricePerNight: 800,
        rating: 4.4,
        amenities: [
          "Yoga Classes",
          "Sattvic Meals",
          "Aarti Access",
          "Ganges View",
        ],
        location: "Ram Jhula",
        destination: "rishikesh",
      },
      {
        id: "rishikesh-h4",
        name: "Glasshouse on the Ganges",
        type: "resort",
        pricePerNight: 9000,
        rating: 4.7,
        amenities: ["Riverside", "Spa", "Wildlife Walks", "Restaurant"],
        location: "Shivpuri",
        destination: "rishikesh",
      },
    ],
    food: [
      {
        id: "rishikesh-f1",
        name: "Chotiwala Restaurant",
        type: "restaurant",
        cuisine: "North Indian Vegetarian",
        priceRange: "budget",
        specialty: "Aloo Puri & Halwa",
        location: "Swarg Ashram",
        destination: "rishikesh",
        rating: 4.2,
      },
      {
        id: "rishikesh-f2",
        name: "Rishikesh Yog Peeth Café",
        type: "cafe",
        cuisine: "Organic & Healthy",
        priceRange: "mid",
        specialty: "Smoothie Bowls & Herbal Teas",
        location: "Tapovan",
        destination: "rishikesh",
        rating: 4.5,
      },
      {
        id: "rishikesh-f3",
        name: "Little Buddha Café",
        type: "cafe",
        cuisine: "Multi-cuisine",
        priceRange: "mid",
        specialty: "Israeli Shakshuka & Wood-fire Pizza",
        location: "Laxman Jhula",
        destination: "rishikesh",
        rating: 4.4,
      },
    ],
    trending: false,
    budgetFriendly: true,
  },
  {
    id: "hampi",
    name: "Hampi",
    tagline: "Where Ruins Tell Stories",
    state: "Karnataka",
    category: "heritage",
    image: "/assets/generated/dest-hampi.dim_800x500.jpg",
    rating: 4.7,
    reviewCount: 7200,
    bestSeason: "October – February",
    avgBudgetPerDay: 1100,
    description:
      "An ancient capital frozen in time — stunning boulder-strewn landscape, 500-year-old ruins, and otherworldly sunsets.",
    attractions: [
      {
        name: "Virupaksha Temple",
        description:
          "7th century living temple dedicated to Lord Shiva — still active",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Vittala Temple & Stone Chariot",
        description:
          "Iconic musical pillars and ancient stone chariot — UNESCO Heritage",
        entryFee: "₹40",
        type: "top",
      },
      {
        name: "Hampi Bazaar",
        description: "Ancient market street lined with ruins and boulders",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Lotus Mahal",
        description:
          "Exquisite blend of Hindu and Islamic architecture in zenana enclosure",
        entryFee: "₹40",
        type: "top",
      },
      {
        name: "Anegundi Village",
        description:
          "Ancient village across the river — Kishkinda from Ramayana — barely touristy",
        entryFee: "Boat ₹20",
        type: "hidden",
      },
      {
        name: "Sanapur Lake",
        description:
          "Coracle rides on a serene lake surrounded by banana plantations",
        entryFee: "Free",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "train",
        from: "Bangalore",
        duration: "6–7 hrs",
        cost: "₹200–₹500",
        details: "Train to Hosapete, then 30-min bus to Hampi",
      },
      {
        mode: "bus",
        from: "Bangalore",
        duration: "8–9 hrs",
        cost: "₹500–₹900",
        details: "Overnight KSRTC sleeper buses to Hospete/Hampi",
      },
      {
        mode: "train",
        from: "Hyderabad",
        duration: "5–6 hrs",
        cost: "₹200–₹500",
        details: "Train to Guntakal, then Hosapete connection",
      },
    ],
    tips: [
      "Rent a bicycle (₹100–₹200/day) or moped for exploring ruins",
      "Sunrise from Matanga Hill is absolutely spectacular",
      "Coracle boat ride across Tungabhadra river is a highlight",
      "Carry water and sunscreen — very hot from March–May",
    ],
    stays: [
      {
        id: "hampi-h1",
        name: "Evolve Back Kamalapura",
        type: "resort",
        pricePerNight: 14000,
        rating: 4.8,
        amenities: ["Heritage View", "Pool", "Ayurveda", "Cultural Activities"],
        location: "Kamalapura",
        destination: "hampi",
      },
      {
        id: "hampi-h2",
        name: "Goan Corner Hostel",
        type: "hostel",
        pricePerNight: 350,
        rating: 4.4,
        amenities: ["Rooftop", "WiFi", "Hampi Views", "Common Kitchen"],
        location: "Virupapur Gadde",
        destination: "hampi",
      },
      {
        id: "hampi-h3",
        name: "Kishkinda Heritage Resort",
        type: "resort",
        pricePerNight: 4500,
        rating: 4.3,
        amenities: ["Pool", "Restaurant", "Heritage Tours", "WiFi"],
        location: "Anegundi",
        destination: "hampi",
      },
      {
        id: "hampi-h4",
        name: "Mowgli Guesthouse",
        type: "homestay",
        pricePerNight: 900,
        rating: 4.5,
        amenities: ["Bicycle Rental", "WiFi", "Home Meals", "Garden"],
        location: "Hampi Bazaar",
        destination: "hampi",
      },
    ],
    food: [
      {
        id: "hampi-f1",
        name: "Mango Tree Restaurant",
        type: "restaurant",
        cuisine: "Multi-cuisine & South Indian",
        priceRange: "budget",
        specialty: "Masala Dosa & Banana Leaf Meals",
        location: "Hampi Bazaar",
        destination: "hampi",
        rating: 4.4,
      },
      {
        id: "hampi-f2",
        name: "Laughing Buddha",
        type: "cafe",
        cuisine: "Fusion & Israeli",
        priceRange: "budget",
        specialty: "Falafel & Hummus with River View",
        location: "Virupapur Gadde",
        destination: "hampi",
        rating: 4.5,
      },
      {
        id: "hampi-f3",
        name: "Raju's Corner",
        type: "street_food",
        cuisine: "Local Karnataka",
        priceRange: "budget",
        specialty: "Jolada Rotti & Badnekai Palya",
        location: "Hampi Bazaar",
        destination: "hampi",
        rating: 4.2,
      },
    ],
    trending: false,
    budgetFriendly: true,
  },
  {
    id: "andaman",
    name: "Andaman Islands",
    tagline: "Paradise Untouched",
    state: "Andaman & Nicobar",
    category: "beach",
    image: "/assets/generated/dest-andaman.dim_800x500.jpg",
    rating: 4.8,
    reviewCount: 6700,
    bestSeason: "November – May",
    avgBudgetPerDay: 3200,
    description:
      "India's best-kept island secret — pristine beaches, world-class scuba diving, bioluminescent bays, and untouched rainforests.",
    attractions: [
      {
        name: "Radhanagar Beach",
        description:
          "Voted Asia's best beach — pure white sand, turquoise water",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Cellular Jail",
        description:
          "Historic colonial prison — powerful sound and light show at night",
        entryFee: "₹30",
        type: "top",
      },
      {
        name: "Scuba Diving at North Bay",
        description:
          "Colorful coral reefs with turtles, reef sharks, and tropical fish",
        entryFee: "₹3,500–₹7,000",
        type: "top",
      },
      {
        name: "Ross Island",
        description:
          "Abandoned British capital with ruins overtaken by deer and wildlife",
        entryFee: "₹50",
        type: "top",
      },
      {
        name: "Barren Island Volcano",
        description:
          "India's only active volcano — accessible by boat from Port Blair",
        entryFee: "Boat ₹2,500",
        type: "hidden",
      },
      {
        name: "Baratang Island",
        description:
          "Limestone caves and mangrove creeks with bioluminescent plankton",
        entryFee: "Permit required",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "flight",
        from: "Delhi",
        duration: "4 hrs (via Chennai)",
        cost: "₹6,000–₹14,000",
        details: "Fly to Veer Savarkar Airport, Port Blair (IXZ)",
      },
      {
        mode: "flight",
        from: "Kolkata",
        duration: "2 hrs",
        cost: "₹4,000–₹10,000",
        details: "Direct flights to Port Blair from Kolkata",
      },
    ],
    tips: [
      "Book inter-island ferries in advance — they fill up quickly",
      "Apply for Restricted Area Permit (RAP) on arrival for certain islands",
      "Best snorkeling at Elephant Beach, Havelock Island",
      "Try fresh seafood at Aberdeen Bazaar in Port Blair",
    ],
    stays: [
      {
        id: "andaman-h1",
        name: "Taj Exotica Andamans",
        type: "resort",
        pricePerNight: 20000,
        rating: 4.9,
        amenities: ["Beach Front", "Dive Center", "Pool", "Spa"],
        location: "Havelock Island",
        destination: "andaman",
      },
      {
        id: "andaman-h2",
        name: "Symphony Palms",
        type: "hostel",
        pricePerNight: 700,
        rating: 4.3,
        amenities: ["Beach Walk", "WiFi", "Common Kitchen", "Tours"],
        location: "Havelock Island",
        destination: "andaman",
      },
      {
        id: "andaman-h3",
        name: "Barefoot at Havelock",
        type: "resort",
        pricePerNight: 8000,
        rating: 4.7,
        amenities: ["Eco Cottages", "Dive School", "Restaurant", "WiFi"],
        location: "Havelock Island",
        destination: "andaman",
      },
      {
        id: "andaman-h4",
        name: "Wild Orchid",
        type: "hotel",
        pricePerNight: 5500,
        rating: 4.5,
        amenities: ["Pool", "Restaurant", "Beach Access", "WiFi"],
        location: "Havelock Island",
        destination: "andaman",
      },
    ],
    food: [
      {
        id: "andaman-f1",
        name: "Anju Coco Resto",
        type: "restaurant",
        cuisine: "Seafood & Continental",
        priceRange: "mid",
        specialty: "Grilled Lobster & Andamanese Fish Curry",
        location: "Havelock Island",
        destination: "andaman",
        rating: 4.5,
      },
      {
        id: "andaman-f2",
        name: "Full Moon Café",
        type: "cafe",
        cuisine: "Multi-cuisine",
        priceRange: "mid",
        specialty: "Prawn Bhajji & Fresh Coconut Water",
        location: "Havelock Island",
        destination: "andaman",
        rating: 4.3,
      },
      {
        id: "andaman-f3",
        name: "Ananda Restaurant",
        type: "restaurant",
        cuisine: "South Indian & Seafood",
        priceRange: "budget",
        specialty: "Fish Biryani & Crab Masala",
        location: "Port Blair",
        destination: "andaman",
        rating: 4.2,
      },
    ],
    trending: true,
    budgetFriendly: false,
  },
  {
    id: "coorg",
    name: "Coorg",
    tagline: "Scotland of India",
    state: "Karnataka",
    category: "nature",
    image: "/assets/generated/dest-coorg.dim_800x500.jpg",
    rating: 4.6,
    reviewCount: 8500,
    bestSeason: "October – May",
    avgBudgetPerDay: 2000,
    description:
      "Misty coffee hills, cascading waterfalls, spice estates, and warrior-culture hospitality — Coorg enchants all who visit.",
    attractions: [
      {
        name: "Abbey Falls",
        description:
          "Majestic 70-foot waterfall surrounded by coffee and spice plantations",
        entryFee: "₹30",
        type: "top",
      },
      {
        name: "Raja's Seat",
        description:
          "Panoramic viewpoint where Kodava kings watched the sunset",
        entryFee: "₹10",
        type: "top",
      },
      {
        name: "Dubare Elephant Camp",
        description: "Interactive elephant sanctuary on Cauvery riverbank",
        entryFee: "₹250",
        type: "top",
      },
      {
        name: "Tadiandamol Trek",
        description: "Highest peak in Coorg with stunning 360° views",
        entryFee: "Free",
        type: "top",
      },
      {
        name: "Mandalpatti Viewpoint",
        description: "Offbeat misty hilltop viewpoint accessible only by jeep",
        entryFee: "₹200 (jeep)",
        type: "hidden",
      },
      {
        name: "Namdroling Monastery",
        description:
          "Spectacular Tibetan Buddhist temple with golden deity statues",
        entryFee: "Free",
        type: "hidden",
      },
    ],
    routes: [
      {
        mode: "bus",
        from: "Bangalore",
        duration: "5–6 hrs",
        cost: "₹300–₹700",
        details: "KSRTC and private Volvo buses to Madikeri",
      },
      {
        mode: "bus",
        from: "Mysore",
        duration: "2 hrs",
        cost: "₹150–₹300",
        details: "Frequent buses from Mysore City bus stand",
      },
      {
        mode: "flight",
        from: "Mumbai",
        duration: "1.5 hrs + 4 hrs drive",
        cost: "₹3,000–₹7,000",
        details: "Fly to Bangalore, drive 5 hrs to Coorg",
      },
    ],
    tips: [
      "Stay at a coffee estate for authentic Coorg experience",
      "Buy fresh coffee powder and spices directly from estates",
      "Avoid monsoon season (June–Sep) — roads can be slippery",
      "Try pandi curry (pork) and kadumbuttu (rice balls)",
    ],
    stays: [
      {
        id: "coorg-h1",
        name: "Orange County Resort",
        type: "resort",
        pricePerNight: 16000,
        rating: 4.9,
        amenities: ["Coffee Estate", "Pool", "Spa", "Nature Walks"],
        location: "Siddapur",
        destination: "coorg",
      },
      {
        id: "coorg-h2",
        name: "Coorg Wilderness Camp",
        type: "hostel",
        pricePerNight: 800,
        rating: 4.3,
        amenities: ["Bonfire", "WiFi", "Trek Access", "Nature Walks"],
        location: "Kakkabe",
        destination: "coorg",
      },
      {
        id: "coorg-h3",
        name: "Misty Woods Estate",
        type: "homestay",
        pricePerNight: 3500,
        rating: 4.7,
        amenities: ["Estate Tour", "Home-cooked Meals", "WiFi", "Fireplace"],
        location: "Virajpet",
        destination: "coorg",
      },
      {
        id: "coorg-h4",
        name: "Hotel Coorg International",
        type: "hotel",
        pricePerNight: 3200,
        rating: 4.3,
        amenities: ["Pool", "Restaurant", "WiFi", "Spa"],
        location: "Madikeri",
        destination: "coorg",
      },
    ],
    food: [
      {
        id: "coorg-f1",
        name: "Raintree Restaurant",
        type: "restaurant",
        cuisine: "Coorgi",
        priceRange: "mid",
        specialty: "Pandi Curry & Noolputtu",
        location: "Club Mahindra, Coorg",
        destination: "coorg",
        rating: 4.5,
      },
      {
        id: "coorg-f2",
        name: "Coorg Kitchen",
        type: "restaurant",
        cuisine: "Traditional Coorgi",
        priceRange: "budget",
        specialty: "Akki Rotti & Bamboo Shoot Curry",
        location: "Madikeri Town",
        destination: "coorg",
        rating: 4.4,
      },
      {
        id: "coorg-f3",
        name: "Café Coorg",
        type: "cafe",
        cuisine: "Café & Bakery",
        priceRange: "budget",
        specialty: "Filter Coffee & Honey Cake",
        location: "Madikeri",
        destination: "coorg",
        rating: 4.3,
      },
    ],
    trending: false,
    budgetFriendly: false,
  },
];

export const ALL_STAYS: Stay[] = DESTINATIONS.flatMap((d) => d.stays);
export const ALL_FOOD: FoodPlace[] = DESTINATIONS.flatMap((d) => d.food);

export const SEED_LOCAL_TIPS: LocalTip[] = [
  {
    id: "lt1",
    name: "Secret Butterfly Beach",
    destination: "goa",
    description:
      "A hidden beach accessible only by boat from Palolem. No crowds, no shacks — just pure nature. Boat rides available from Palolem jetty for ₹100.",
    category: "Beach",
    submittedBy: "Priya Sharma",
    status: "approved",
    createdAt: "2025-11-20",
  },
  {
    id: "lt2",
    name: "Rooftop Aarti Viewing",
    destination: "varanasi",
    description:
      "Rent a rooftop at Dashashwamedh Ghat area for just ₹50-100 to watch the Ganga Aarti from above — much better view than the crowded ghat.",
    category: "Spiritual",
    submittedBy: "Arjun Nair",
    status: "approved",
    createdAt: "2025-12-05",
  },
  {
    id: "lt3",
    name: "Local Dhabas on NH3",
    destination: "manali",
    description:
      "Skip the tourist restaurants — the dhabas on NH3 near Kullu serve authentic himachali dham for just ₹80-100, made with local organic produce.",
    category: "Food",
    submittedBy: "Rahul Verma",
    status: "pending",
    createdAt: "2026-01-10",
  },
  {
    id: "lt4",
    name: "Sunrise at Nagarkot View",
    destination: "ladakh",
    description:
      "Wake up at 4:30 AM and drive 15 mins from Leh towards Khardung La for an unobstructed Himalayan sunrise — no permit needed for the first viewpoint.",
    category: "Scenic",
    submittedBy: "Meena Patel",
    status: "approved",
    createdAt: "2025-10-15",
  },
  {
    id: "lt5",
    name: "Spice Market Secret Shortcut",
    destination: "jaipur",
    description:
      "Enter Johari Bazaar from the back lanes behind Hawa Mahal — the shops there sell identical jewelry and textiles at 40% lower prices than the main street.",
    category: "Shopping",
    submittedBy: "Kavya Reddy",
    status: "pending",
    createdAt: "2026-02-01",
  },
];

export function getCategoryGradient(category: DestinationCategory): string {
  const map: Record<DestinationCategory, string> = {
    beach: "gradient-beach",
    mountain: "gradient-mountain",
    heritage: "gradient-heritage",
    spiritual: "gradient-spiritual",
    nature: "gradient-nature",
    adventure: "gradient-adventure",
  };
  return map[category];
}

export function generateItinerary(
  destinationId: string,
  days: number,
  budget: number,
): {
  day: number;
  activities: string[];
  stay: string;
  food: string[];
  estimatedCost: number;
}[] {
  const dest = DESTINATIONS.find((d) => d.id === destinationId);
  if (!dest) return [];

  const dailyBudget = budget / days;
  const stays = dest.stays
    .filter((s) => s.pricePerNight <= dailyBudget * 0.5)
    .sort((a, b) => b.rating - a.rating);
  const chosenStay =
    stays[0] || dest.stays.sort((a, b) => a.pricePerNight - b.pricePerNight)[0];
  const attractions = dest.attractions;
  const foods = dest.food;

  return Array.from({ length: days }, (_, i) => {
    const dayAttractions = attractions.slice(i * 2, i * 2 + 2);
    if (dayAttractions.length === 0) {
      dayAttractions.push(...attractions.slice(0, 2));
    }
    const dayFood = foods.slice(0, Math.min(2, foods.length));
    const transportCost = i === 0 || i === days - 1 ? 500 : 200;
    const activityCost = dayAttractions.reduce((sum, a) => {
      const fee = Number.parseInt(a.entryFee.replace(/[^0-9]/g, "")) || 0;
      return sum + fee;
    }, 0);
    const stayPerNight = chosenStay.pricePerNight;
    const foodCost = 400;
    const estimatedCost =
      stayPerNight + foodCost + activityCost + transportCost;

    return {
      day: i + 1,
      activities: [
        `Visit ${dayAttractions[0]?.name || dest.attractions[0].name}`,
        dayAttractions[1]
          ? `Explore ${dayAttractions[1].name}`
          : "Free time to explore local markets",
        i === 0
          ? "Check in and settle at your stay"
          : i === days - 1
            ? "Pack up, last-minute shopping"
            : "Evening walk and local dining",
      ],
      stay: chosenStay.name,
      food: dayFood.map((f) => f.name),
      estimatedCost,
    };
  });
}

export function calculateBudget(
  destinationId: string,
  days: number,
  style: "budget" | "mid" | "luxury",
): {
  transport: number;
  hotel: number;
  food: number;
  activities: number;
  total: number;
} {
  const dest = DESTINATIONS.find((d) => d.id === destinationId);
  if (!dest)
    return { transport: 0, hotel: 0, food: 0, activities: 0, total: 0 };

  const multiplier = style === "budget" ? 0.6 : style === "luxury" ? 2.5 : 1;
  const base = dest.avgBudgetPerDay;
  const hotel = Math.round(base * multiplier * 0.4) * days;
  const food = Math.round(base * multiplier * 0.25) * days;
  const activities = Math.round(base * multiplier * 0.15) * days;
  const transport = Math.round(base * multiplier * 0.5);

  return {
    transport,
    hotel,
    food,
    activities,
    total: transport + hotel + food + activities,
  };
}
