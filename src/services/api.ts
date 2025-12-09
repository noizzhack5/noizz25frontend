// API Client with mock implementation
// In production, replace with actual API calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { method = "GET", headers = {}, body } = config;

    // Mock delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 300));

    const url = `${API_BASE_URL}${endpoint}`;

    // In production, use fetch:
    // const response = await fetch(url, {
    //   method,
    //   headers: {
    //     "Content-Type": "application/json",
    //     ...headers,
    //   },
    //   body: body ? JSON.stringify(body) : undefined,
    // });
    // if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    // return response.json();

    // Mock implementation
    return {} as T;
  }

  async get<T>(endpoint: string, config?: Omit<RequestConfig, "method" | "body">): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: Omit<RequestConfig, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "POST", body });
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: Omit<RequestConfig, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "PUT", body });
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    config?: Omit<RequestConfig, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "PATCH", body });
  }

  async delete<T>(
    endpoint: string,
    config?: Omit<RequestConfig, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

export const api = new ApiClient();

