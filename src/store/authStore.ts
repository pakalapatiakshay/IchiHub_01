import { create } from 'zustand';

export type Role = 'customer' | 'vendor' | 'admin';

export interface User {
  id: string;
  role: Role;
  name: string;
  email: string;
  phone: string;
  lat?: number;
  lng?: number;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null, // Start unauthenticated
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
