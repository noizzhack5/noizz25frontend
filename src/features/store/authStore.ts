import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: "1",
        name: "Admin User",
        email: "admin@talently.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      isAuthenticated: true,
      login: async (email: string, password: string) => {
        // Mock login - in production, this would call the API
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({
          user: {
            id: "1",
            name: "Admin User",
            email,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

