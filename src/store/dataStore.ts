import { create } from 'zustand';

export interface VendorProfile {
  id: string;
  user_id: string;
  business_name: string;
  description: string;
  category: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  service_radius: number; // in km
  verification_status: 'pending' | 'verified' | 'rejected';
  rating: number;
  review_count: number;
  availability: boolean;
  starting_price: number;
  image: string;
}

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'on_the_way'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  customer_id: string;
  vendor_id: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  address: string;
  notes: string;
  created_at: string;
  // Location snapshot
  booking_lat?: number;
  booking_lng?: number;
  booking_address?: string;
  // Vendor live location (for tracking)
  vendor_live_lat?: number;
  vendor_live_lng?: number;
  vendor_live_heading?: number;
  vendor_live_speed?: number;
  vendor_live_accuracy?: number;
  vendor_live_timestamp?: number;
}

// Indian demo center (approximate coords for a generic city like Bangalore)
const CENTER_LAT = 12.9716;
const CENTER_LNG = 77.5946;

const mockVendors: VendorProfile[] = [
  {
    id: 'v1', user_id: 'u_v1', business_name: 'Spark Electrical Services',
    description: 'Professional electrical repair and installation.',
    category: 'Electrician', address: '123 Main St', city: 'Bangalore',
    lat: CENTER_LAT + 0.002, lng: CENTER_LNG + 0.002, // ~0.3km away
    service_radius: 5, verification_status: 'verified',
    rating: 4.8, review_count: 124, availability: true, starting_price: 299,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: 'v2', user_id: 'u_v2', business_name: 'IchiFix Plumbing',
    description: 'Expert plumbing for residential and commercial.',
    category: 'Plumber', address: '45 Park Ave', city: 'Bangalore',
    lat: CENTER_LAT + 0.006, lng: CENTER_LNG - 0.004, // ~0.8km away
    service_radius: 10, verification_status: 'verified',
    rating: 4.5, review_count: 89, availability: true, starting_price: 199,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'v3', user_id: 'u_v3', business_name: 'QuickWrench Auto Care',
    description: 'Fast and reliable car mechanic services.',
    category: 'Car Mechanic', address: '78 Auto Nagar', city: 'Bangalore',
    lat: CENTER_LAT - 0.012, lng: CENTER_LNG + 0.010, // ~1.5km away
    service_radius: 15, verification_status: 'verified',
    rating: 4.9, review_count: 210, availability: false, starting_price: 999,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'v4', user_id: 'u_v4', business_name: 'CleanNest Services',
    description: 'Deep cleaning for homes and offices.',
    category: 'Cleaning', address: '90 Clean St', city: 'Bangalore',
    lat: CENTER_LAT - 0.004, lng: CENTER_LNG - 0.005, // ~0.6km away
    service_radius: 5, verification_status: 'pending',
    rating: 0, review_count: 0, availability: true, starting_price: 499,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop'
  }
];

interface DataState {
  vendors: VendorProfile[];
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  updateBookingVendorLocation: (
    id: string,
    lat: number,
    lng: number,
    heading?: number,
    speed?: number,
    accuracy?: number
  ) => void;
  addVendor: (vendor: VendorProfile) => void;
  updateVendorStatus: (id: string, status: VendorProfile['verification_status']) => void;
}

export const useDataStore = create<DataState>((set) => ({
  vendors: mockVendors,
  bookings: [],
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  updateBookingStatus: (id, status) => set((state) => ({
    bookings: state.bookings.map(b => b.id === id ? { ...b, status } : b)
  })),
  updateBookingVendorLocation: (id, lat, lng, heading, speed, accuracy) => set((state) => ({
    bookings: state.bookings.map(b =>
      b.id === id
        ? {
            ...b,
            vendor_live_lat: lat,
            vendor_live_lng: lng,
            vendor_live_heading: heading,
            vendor_live_speed: speed,
            vendor_live_accuracy: accuracy,
            vendor_live_timestamp: Date.now(),
          }
        : b
    )
  })),
  addVendor: (vendor) => set((state) => ({ vendors: [...state.vendors, vendor] })),
  updateVendorStatus: (id, status) => set((state) => ({
    vendors: state.vendors.map(v => v.id === id ? { ...v, verification_status: status } : v)
  }))
}));

// Helper to calculate distance in KM
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; 
  return d;
}

// Format distance for display
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

// Estimate travel time (rough: assumes ~25km/h average in city)
export function estimateETA(distanceKm: number): string {
  const speedKmH = 25;
  const minutes = Math.round((distanceKm / speedKmH) * 60);
  if (minutes < 1) return '< 1 min';
  if (minutes === 1) return '1 min';
  return `${minutes} min`;
}
