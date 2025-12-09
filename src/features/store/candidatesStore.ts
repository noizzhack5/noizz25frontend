import { create } from "zustand";
import type { Candidate, Status, JobType } from "@/types";
import { apiClient, ApiError } from "@/services/apiClient";
import {
  mapCVDocumentToCandidate,
  mapCandidateToCVUpdateRequest,
  mapStatusToStatusId,
  mapStatusToStatusString,
} from "@/services/apiClient/mappers";

interface CandidatesState {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  searchQuery: string;
  statusFilter: Status | "all";
  jobTypeFilter: JobType | "all";
  matchFilter: string;
  campaignFilter: string;
  countriesFilter: string[];
  view: "home" | "deleted";
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCandidates: () => Promise<void>;
  fetchDeletedCandidates: () => Promise<void>;
  searchCandidates: () => Promise<void>;
  setCandidates: (candidates: Candidate[]) => void;
  addCandidate: (candidate: Omit<Candidate, "id">, file?: File) => Promise<import("@/services/apiClient/types").CVUploadResponse>;
  updateCandidate: (id: string, updates: Partial<Candidate>) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
  restoreCandidate: (id: string) => Promise<void>;
  setSelectedCandidate: (candidate: Candidate | null) => void;
  fetchCandidateById: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: Status | "all") => void;
  setJobTypeFilter: (filter: JobType | "all") => void;
  setMatchFilter: (filter: string) => void;
  setCampaignFilter: (filter: string) => void;
  setCountriesFilter: (filter: string[]) => void;
  setView: (view: "home" | "deleted") => void;
  clearFilters: () => void;
  updateCandidateStatus: (id: string, status: Status) => Promise<void>;
}

const initialState = {
  candidates: [],
  selectedCandidate: null,
  searchQuery: "",
  statusFilter: "all" as Status | "all",
  jobTypeFilter: "all" as JobType | "all",
  matchFilter: "all",
  campaignFilter: "all",
  countriesFilter: [] as string[],
  view: "home" as "home" | "deleted",
  isLoading: false,
  error: null,
};

export const useCandidatesStore = create<CandidatesState>((set, get) => ({
  ...initialState,
  
  fetchCandidates: async () => {
    set({ isLoading: true, error: null });
    try {
      const docs = await apiClient.getAllCVs(false);
      const candidates = docs.map(mapCVDocumentToCandidate);
      set({ candidates, isLoading: false });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to fetch candidates";
      set({ error: message, isLoading: false });
      console.error("Error fetching candidates:", error);
    }
  },

  fetchDeletedCandidates: async () => {
    set({ isLoading: true, error: null });
    try {
      const docs = await apiClient.getAllCVs(true);
      const candidates = docs.map(mapCVDocumentToCandidate);
      set({ candidates, isLoading: false });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to fetch deleted candidates";
      set({ error: message, isLoading: false });
      console.error("Error fetching deleted candidates:", error);
    }
  },

  searchCandidates: async () => {
    const state = get();
    set({ isLoading: true, error: null });
    
    try {
      const searchParams: import("@/services/apiClient/types").CVSearchParams = {
        free_text: state.searchQuery || null,
        current_status: state.statusFilter !== "all" ? mapStatusToStatusString(state.statusFilter) : null,
        job_type: state.jobTypeFilter !== "all" ? state.jobTypeFilter : null,
        match_score: state.matchFilter !== "all" ? (state.matchFilter as any) : null,
        campaign: state.campaignFilter !== "all" ? state.campaignFilter : null,
        country: state.countriesFilter.length > 0 ? state.countriesFilter[0] : null,
      };

      const docs = await apiClient.searchCVs(searchParams);
      const candidates = docs.map(mapCVDocumentToCandidate);
      set({ candidates, isLoading: false });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to search candidates";
      set({ error: message, isLoading: false });
      console.error("Error searching candidates:", error);
    }
  },

  setCandidates: (candidates) => set({ candidates }),
  
  addCandidate: async (candidateData, file?: File) => {
    set({ isLoading: true, error: null });
    try {
      // Use the upload CV endpoint
      const uploadData: import("@/services/apiClient/types").BodyUploadCv = {
        file: file || null,
        name: candidateData.fullName || null,
        phone: candidateData.phone || null,
        email: candidateData.email || null,
        campaign: candidateData.campaignSource || null,
        notes: candidateData.notes || null,
      };

      const response = await apiClient.uploadCV(uploadData);
      
      // Refresh the candidates list to include the new one
      await get().fetchCandidates();
      
      set({ isLoading: false });
      return response;
    } catch (error) {
      const message =
        error instanceof ApiError || error instanceof Error
          ? error.message
          : "Failed to add candidate";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  updateCandidate: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const updateRequest = mapCandidateToCVUpdateRequest(updates);
      const doc = await apiClient.updateCV(id, updateRequest);
      const updatedCandidate = mapCVDocumentToCandidate(doc);
      
      set((state) => ({
        candidates: state.candidates.map((c) =>
          c.id === id ? updatedCandidate : c
        ),
        selectedCandidate:
          state.selectedCandidate?.id === id
            ? updatedCandidate
            : state.selectedCandidate,
        isLoading: false,
      }));
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to update candidate";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  deleteCandidate: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.deleteCV(id);
      set((state) => ({
        candidates: state.candidates.filter((c) => c.id !== id),
        selectedCandidate:
          state.selectedCandidate?.id === id ? null : state.selectedCandidate,
        isLoading: false,
      }));
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to delete candidate";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  restoreCandidate: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const doc = await apiClient.restoreCV(id);
      const restoredCandidate = mapCVDocumentToCandidate(doc);
      set((state) => ({
        candidates: state.candidates.map((c) =>
          c.id === id ? restoredCandidate : c
        ),
        isLoading: false,
      }));
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to restore candidate";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  fetchCandidateById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const doc = await apiClient.getCVById(id);
      const candidate = mapCVDocumentToCandidate(doc);
      set({ selectedCandidate: candidate, isLoading: false });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to fetch candidate";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  updateCandidateStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const statusString = mapStatusToStatusString(status);
      const doc = await apiClient.updateCVStatus(id, statusString);
      const updatedCandidate = mapCVDocumentToCandidate(doc);
      
      set((state) => ({
        candidates: state.candidates.map((c) =>
          c.id === id ? updatedCandidate : c
        ),
        selectedCandidate:
          state.selectedCandidate?.id === id
            ? updatedCandidate
            : state.selectedCandidate,
        isLoading: false,
      }));
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to update candidate status";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  setSelectedCandidate: (candidate) => {
    if (candidate) {
      set((state) => ({
        candidates: state.candidates.map((c) =>
          c.id === candidate.id
            ? {
                ...c,
                isNew: false,
                statusChangedAt: undefined,
                newAnswersAt: undefined,
              }
            : c
        ),
        selectedCandidate: candidate,
      }));
    } else {
      set({ selectedCandidate: null });
    }
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setJobTypeFilter: (filter) => set({ jobTypeFilter: filter }),
  setMatchFilter: (filter) => set({ matchFilter: filter }),
  setCampaignFilter: (filter) => set({ campaignFilter: filter }),
  setCountriesFilter: (filter) => set({ countriesFilter: filter }),
  setView: (view) => set({ view }),
  clearFilters: () =>
    set({
      searchQuery: "",
      statusFilter: "all",
      jobTypeFilter: "all",
      matchFilter: "all",
      campaignFilter: "all",
      countriesFilter: [],
    }),
}));
