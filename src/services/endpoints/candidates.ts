import { api } from "../api";
import type { Candidate, Status } from "@/types";

export interface GetCandidatesParams {
  status?: Status | "all";
  jobType?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetCandidatesResponse {
  candidates: Candidate[];
  total: number;
  page: number;
  limit: number;
}

export const candidatesApi = {
  getCandidates: async (
    params?: GetCandidatesParams
  ): Promise<GetCandidatesResponse> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 300));
    // In production:
    // return api.get<GetCandidatesResponse>("/candidates", { params });
    return {
      candidates: [],
      total: 0,
      page: 1,
      limit: 50,
    };
  },

  getCandidate: async (id: string): Promise<Candidate> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 200));
    // In production:
    // return api.get<Candidate>(`/candidates/${id}`);
    return {} as Candidate;
  },

  createCandidate: async (
    candidate: Omit<Candidate, "id" | "createdAt">
  ): Promise<Candidate> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 400));
    // In production:
    // return api.post<Candidate>("/candidates", candidate);
    return {
      ...candidate,
      id: `${Date.now()}`,
      createdAt: new Date(),
    } as Candidate;
  },

  updateCandidate: async (
    id: string,
    updates: Partial<Candidate>
  ): Promise<Candidate> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 300));
    // In production:
    // return api.put<Candidate>(`/candidates/${id}`, updates);
    return {} as Candidate;
  },

  deleteCandidate: async (id: string): Promise<void> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 200));
    // In production:
    // return api.delete(`/candidates/${id}`);
  },

  restoreCandidate: async (id: string): Promise<Candidate> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 200));
    // In production:
    // return api.post<Candidate>(`/candidates/${id}/restore`);
    return {} as Candidate;
  },

  updateCandidateStatus: async (
    id: string,
    status: Status
  ): Promise<Candidate> => {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 300));
    // In production:
    // return api.patch<Candidate>(`/candidates/${id}/status`, { status });
    return {} as Candidate;
  },
};

