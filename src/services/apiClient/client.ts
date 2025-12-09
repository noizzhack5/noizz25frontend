import type {
  CVUploadResponse,
  BodyUploadCv,
  CVUpdateRequest,
  StatusUpdateRequest,
  CVDocument,
  CVSearchParams,
  HTTPValidationError,
} from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://noizz25backend.onrender.com";

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, ""); // Remove trailing slash
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Don't set Content-Type for FormData - let browser set it with boundary
    const isFormData = options.body instanceof FormData;
    const headers: HeadersInit = isFormData
      ? { ...options.headers }
      : {
          "Content-Type": "application/json",
          ...options.headers,
        };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorData: HTTPValidationError | null = null;
        try {
          errorData = await response.json();
        } catch {
          // If response is not JSON, use status text
        }

        throw new ApiError(
          errorData?.detail?.[0]?.msg || response.statusText,
          response.status,
          errorData
        );
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const text = await response.text();
        return text ? JSON.parse(text) : ({} as T);
      }

      return {} as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "Network error",
        0,
        error
      );
    }
  }

  // CV Endpoints

  /**
   * Upload a new CV document
   */
  async uploadCV(data: BodyUploadCv): Promise<CVUploadResponse> {
    const formData = new FormData();
    
    if (data.file) {
      formData.append("file", data.file);
    }
    if (data.name) formData.append("name", data.name);
    if (data.phone) formData.append("phone", data.phone);
    if (data.email) formData.append("email", data.email);
    if (data.campaign) formData.append("campaign", data.campaign);
    if (data.notes) formData.append("notes", data.notes);

    return this.request<CVUploadResponse>("/upload-cv", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  /**
   * Get all CV documents
   * @param deleted - True for deleted only, False/undefined for non-deleted only
   */
  async getAllCVs(deleted?: boolean | null): Promise<CVDocument[]> {
    const params = new URLSearchParams();
    if (deleted !== undefined && deleted !== null) {
      params.append("deleted", String(deleted));
    }
    const query = params.toString();
    return this.request<CVDocument[]>(
      `/cv${query ? `?${query}` : ""}`
    );
  }

  /**
   * Search CV documents with filters
   */
  async searchCVs(params: CVSearchParams): Promise<CVDocument[]> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const query = searchParams.toString();
    return this.request<CVDocument[]>(
      `/cv/search${query ? `?${query}` : ""}`
    );
  }

  /**
   * Get CV document by ID
   */
  async getCVById(id: string): Promise<CVDocument> {
    return this.request<CVDocument>(`/cv/${id}`);
  }

  /**
   * Update CV document (partial update)
   */
  async updateCV(id: string, updates: CVUpdateRequest): Promise<CVDocument> {
    return this.request<CVDocument>(`/cv/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }

  /**
   * Soft delete CV document
   */
  async deleteCV(id: string): Promise<void> {
    await this.request<void>(`/cv/${id}`, {
      method: "DELETE",
    });
  }

  /**
   * Restore deleted CV document
   */
  async restoreCV(id: string): Promise<CVDocument> {
    return this.request<CVDocument>(`/cv/${id}/restore`, {
      method: "POST",
    });
  }

  /**
   * Update CV status
   */
  async updateCVStatus(
    id: string,
    statusId: number
  ): Promise<CVDocument> {
    return this.request<CVDocument>(`/cv/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status_id: statusId }),
    });
  }

  /**
   * Trigger bot processor manually
   */
  async triggerBotProcessor(): Promise<{ message?: string }> {
    return this.request<{ message?: string }>("/process-waiting-for-bot", {
      method: "POST",
    });
  }

  /**
   * Trigger classification processor manually
   */
  async triggerClassificationProcessor(): Promise<{ message?: string }> {
    return this.request<{ message?: string }>(
      "/process-waiting-classification",
      {
        method: "POST",
      }
    );
  }
}

export const apiClient = new ApiClient();
export { ApiError };

