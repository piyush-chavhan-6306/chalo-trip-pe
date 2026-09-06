export interface Booking {
  id: string;
  destinationId: string;
  destinationName: string;
  country: string;
  image: string;
  date: string;
  day: string;
  time: string;
  travellers: number;
  totalPrice: number;
  status: "upcoming" | "completed" | "cancelled";
  bookingRef: string;
}

export interface SavedDestination {
  id: string;
  destinationId: string;
  destinationName: string;
  country: string;
  image: string;
  price: number;
  rating: number;
  savedDate: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  totalTrips: number;
  avatar: string;
}

export const mockProfile: UserProfile = {
  name: "Arjun",
  email: "arjun@example.com",
  phone: "+91 98765 43210",
  memberSince: "August 2026",
  totalTrips: 3,
  avatar: "AK",
};

export const mockBookings: Booking[] = [
  {
    id: "b1",
    destinationId: "santorini",
    destinationName: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&q=80&auto=format&fit=crop",
    date: "Sep 12",
    day: "Fri",
    time: "Morning",
    travellers: 2,
    totalPrice: 71400,
    status: "upcoming",
    bookingRef: "CTP-7X2KM",
  },
  {
    id: "b2",
    destinationId: "kyoto",
    destinationName: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80&auto=format&fit=crop",
    date: "Jul 18",
    day: "Fri",
    time: "Morning",
    travellers: 2,
    totalPrice: 98600,
    status: "completed",
    bookingRef: "CTP-4N9PL",
  },
  {
    id: "b3",
    destinationId: "lisbon",
    destinationName: "Lisbon",
    country: "Portugal",
    image:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400&q=80&auto=format&fit=crop",
    date: "Jun 6",
    day: "Fri",
    time: "Afternoon",
    travellers: 1,
    totalPrice: 27200,
    status: "completed",
    bookingRef: "CTP-1R8WQ",
  },
];

export const mockSavedDestinations: SavedDestination[] = [
  {
    id: "s1",
    destinationId: "amalfi",
    destinationName: "Amalfi Coast",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1633321702518-7fecdafb94d5?w=400&q=80&auto=format&fit=crop",
    price: 510,
    rating: 4.8,
    savedDate: "Aug 28",
  },
  {
    id: "s2",
    destinationId: "marrakech",
    destinationName: "Marrakech",
    country: "Morocco",
    image:
      "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=400&q=80&auto=format&fit=crop",
    price: 350,
    rating: 4.7,
    savedDate: "Aug 22",
  },
  {
    id: "s3",
    destinationId: "banff",
    destinationName: "Banff",
    country: "Canada",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&q=80&auto=format&fit=crop",
    price: 390,
    rating: 4.9,
    savedDate: "Sep 1",
  },
];
