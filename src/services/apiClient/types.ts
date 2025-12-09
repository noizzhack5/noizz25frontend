// Generated types from OpenAPI spec

export interface CVUploadResponse {
  id: string;
  status: string;
}

export interface BodyUploadCv {
  file?: File | null;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  campaign?: string | null;
  notes?: string | null;
}

export interface CVUpdateRequest {
  latin_name?: string | null;
  hebrew_name?: string | null;
  email?: string | null;
  campaign?: string | null;
  age?: string | null;
  nationality?: string | null;
  can_travel_europe?: string | null;
  can_visit_israel?: string | null;
  lives_in_europe?: string | null;
  native_israeli?: string | null;
  english_level?: string | null;
  remembers_job_application?: string | null;
  skills_summary?: string | null;
  job_type?: string | null;
  match_score?: string | null;
  class_explain?: string | null;
}

export interface StatusUpdateRequest {
  status_id?: number; // 1-7 (legacy)
  status?: string; // Status as string (e.g., "Ready For Bot Interview")
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// File metadata from API
export interface FileMetadata {
  filename: string;
  size_bytes: number;
  content_type: string;
  uploaded_at: string;
}

// Known data structure from API
export interface KnownData {
  name?: string;
  phone_number?: string;
  campaign?: string;
  notes?: string;
  job_type?: string;
  match_score?: string;
  class_explain?: string;
  latin_name?: string;
  hebrew_name?: string;
  remembers_job_application?: string;
  native_israeli?: string;
  nationality?: string;
  can_visit_israel?: string;
  lives_in_europe?: string;
  email?: string;
  english_level?: string;
  age?: string;
  can_travel_europe?: string;
  skills_summary?: string;
}

// Status history entry
export interface StatusHistoryEntry {
  status: string;
  timestamp: string;
  note?: string;
}

// CV Document type (based on actual API response structure)
export interface CVDocument {
  id: string;
  file_metadata?: FileMetadata;
  extracted_text?: string;
  known_data?: KnownData;
  is_deleted: boolean;
  current_status: string;
  status_history: StatusHistoryEntry[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  cv_url?: string;
  profile_image?: string;
}

// Search parameters
export interface CVSearchParams {
  free_text?: string | null;
  current_status?: string | null;
  job_type?: string | null;
  match_score?: "below 70" | "70-79" | "80-89" | "90-100" | "all match_score" | null;
  campaign?: string | null;
  country?: string | null;
}

// Status IDs mapping
export enum StatusId {
  Submitted = 1,
  Extracting = 2,
  WaitingBotInterview = 3,
  BotInterview = 4,
  WaitingClassification = 5,
  InClassification = 6,
  ReadyForRecruit = 7,
}

export const StatusIdLabels: Record<StatusId, string> = {
  [StatusId.Submitted]: "Submitted",
  [StatusId.Extracting]: "Extracting",
  [StatusId.WaitingBotInterview]: "Waiting Bot Interview",
  [StatusId.BotInterview]: "Bot Interview",
  [StatusId.WaitingClassification]: "Waiting Classification",
  [StatusId.InClassification]: "In Classification",
  [StatusId.ReadyForRecruit]: "Ready For Recruit",
};

