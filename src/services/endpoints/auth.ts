import { api } from "../api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  token: string;
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      user: {
        id: "1",
        name: "Admin User",
        email: credentials.email,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      token: "mock-jwt-token",
    };
    // In production:
    // return api.post<LoginResponse>("/auth/login", credentials);
  },

  logout: async (): Promise<void> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 200));
    // In production:
    // return api.post("/auth/logout");
  },

  getCurrentUser: async () => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      id: "1",
      name: "Admin User",
      email: "admin@talently.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    };
    // In production:
    // return api.get("/auth/me");
  },
};

