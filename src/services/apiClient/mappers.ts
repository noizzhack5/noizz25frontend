import type { CVDocument } from "./types";
import type { Candidate, Status, JobType, StatusHistory } from "@/types";

/**
 * Maps API CVDocument to frontend Candidate type
 */
export function mapCVDocumentToCandidate(doc: CVDocument): Candidate {
  const knownData = doc.known_data || {};
  
  // Map status from API string to frontend status
  // Using current_status from API response
  // Note: API returns statuses with capital letters like "Ready For Bot Interview"
  const statusMap: Record<string, Status> = {
    "Received": "submitted",
    "Submitted": "submitted",
    "Extracting": "submitted",
    "Waiting Bot Interview": "submitted",
    "Ready for Bot Interview": "ready_for_bot_interview",
    "Ready For Bot Interview": "ready_for_bot_interview", // API returns with capital F
    "Bot Interview": "bot_interview",
    "Waiting Classification": "submitted",
    "In Classification": "ready_for_bot_interview",
    "Ready For Recruit": "ready_for_recruit",
    "Ready for Recruit": "ready_for_recruit",
    // Numeric statuses (if still used)
    "1": "submitted",
    "2": "submitted",
    "3": "submitted",
    "4": "bot_interview",
    "5": "ready_for_bot_interview", // Fixed: 5 should map to ready_for_bot_interview
    "6": "ready_for_bot_interview",
    "7": "ready_for_recruit",
  };

  // Use current_status directly from API
  const apiStatus = doc.current_status || "Received";
  
  // Try exact match first
  let status = statusMap[apiStatus];
  
  // If not found, try case-insensitive match
  if (!status) {
    const lowerApiStatus = apiStatus.toLowerCase();
    const foundKey = Object.keys(statusMap).find(
      key => key.toLowerCase() === lowerApiStatus
    );
    if (foundKey) {
      status = statusMap[foundKey];
    }
  }
  
  // Default to submitted if still not found
  status = status || "submitted";

  // Map job type - handle both server format (e.g., "Operational") and internal format (e.g., "operational_worker")
  const jobTypeMap: Record<string, JobType> = {
    // Internal/snake_case format
    headquarters_staff: "headquarters_staff",
    training_instruction: "training_instruction",
    sales: "sales",
    operational_worker: "operational_worker",
    // Server format (capitalized)
    "Headquarters Staff": "headquarters_staff",
    "Headquarters": "headquarters_staff",
    "Training/Instruction": "training_instruction",
    "Training": "training_instruction",
    "Instruction": "training_instruction",
    "Sales": "sales",
    "Operational Worker": "operational_worker",
    "Operational": "operational_worker",
  };
  // If job_type is null or empty, keep it as null (don't default to headquarters_staff)
  const jobType = knownData.job_type && knownData.job_type !== "null"
    ? (jobTypeMap[knownData.job_type] || null)
    : null;

  // Map status history
  const statusHistory: StatusHistory[] =
    doc.status_history?.map((h) => ({
      status: h.status,
      timestamp: new Date(h.timestamp),
      note: h.note,
    })) || [];

  // Parse match score - keep as null if not provided
  const matchScore = knownData.match_score && knownData.match_score !== "null" && knownData.match_score !== ""
    ? parseFloat(knownData.match_score)
    : null;

  // Map boolean fields from known_data
  const canTravelEurope =
    knownData.can_travel_europe?.toLowerCase() === "yes" ||
    knownData.can_travel_europe?.toLowerCase() === "true";
  const canTravelIsrael =
    knownData.can_visit_israel?.toLowerCase() === "yes" ||
    knownData.can_visit_israel?.toLowerCase() === "true";
  const livesInEurope =
    knownData.lives_in_europe?.toLowerCase() === "yes" ||
    knownData.lives_in_europe?.toLowerCase() === "true";
  const nativeIsraeli =
    knownData.native_israeli?.toLowerCase() === "yes" ||
    knownData.native_israeli?.toLowerCase() === "true";
  const speaksEnglish =
    knownData.english_level && 
    knownData.english_level.toLowerCase() !== "none" &&
    knownData.english_level.toLowerCase() !== "" 
    ? true 
    : false;
  const remembersPosition =
    knownData.remembers_job_application?.toLowerCase() === "yes" ||
    knownData.remembers_job_application?.toLowerCase() === "true";

  // Get created_at from file_metadata if available
  const createdAt = doc.file_metadata?.uploaded_at 
    ? new Date(doc.file_metadata.uploaded_at)
    : doc.created_at 
    ? new Date(doc.created_at)
    : new Date();

  return {
    id: doc.id,
    fullName: knownData.latin_name || knownData.name || "",
    fullNameHebrew: knownData.hebrew_name || undefined,
    email: knownData.email || "",
    phone: knownData.phone_number || "",
    age: knownData.age && knownData.age !== "0" ? parseInt(knownData.age) : undefined,
    citizenship: knownData.nationality || undefined,
    campaignSource: knownData.campaign || "",
    status,
    jobType,
    statusHistory,
    primaryGroup: {
      groupName: knownData.class_explain || "Unclassified",
      matchScore,
    },
    alternativeGroups: [], // API doesn't provide this
    matchedParameters: [], // API doesn't provide this
    aiSkillsSummary: knownData.skills_summary || doc.extracted_text || "",
    additionalInfo: [], // API doesn't provide this
    notes: knownData.notes || "",
    manualNotes: undefined,
    cvUrl: doc.cv_url,
    profileImage: doc.profile_image,
    createdAt,
    deleted: doc.is_deleted || false,
    deletedAt: doc.deleted_at ? new Date(doc.deleted_at) : undefined,
    canTravelEurope,
    canTravelIsrael,
    livesInEurope,
    nativeIsraeli,
    speaksEnglish,
    remembersPosition,
    isNew: false, // Will be set by store logic
    statusChangedAt: undefined,
    newAnswersAt: undefined,
    botConversation: undefined, // API doesn't provide this
    classExplain: knownData.class_explain || undefined,
  };
}

/**
 * Maps frontend Candidate to API CVUpdateRequest
 */
export function mapCandidateToCVUpdateRequest(
  candidate: Partial<Candidate>
): import("./types").CVUpdateRequest {
  return {
    latin_name: candidate.fullName || null,
    hebrew_name: candidate.fullNameHebrew || null,
    email: candidate.email || null,
    campaign: candidate.campaignSource || null,
    age: candidate.age?.toString() || null,
    nationality: candidate.citizenship || null,
    can_travel_europe: candidate.canTravelEurope ? "yes" : "no",
    can_visit_israel: candidate.canTravelIsrael ? "yes" : "no",
    lives_in_europe: candidate.livesInEurope ? "yes" : "no",
    native_israeli: candidate.nativeIsraeli ? "yes" : "no",
    english_level: candidate.speaksEnglish ? (candidate.speaksEnglish ? "Comfortable" : null) : null,
    remembers_job_application: candidate.remembersPosition ? "yes" : "no",
    skills_summary: candidate.aiSkillsSummary || null,
    job_type: candidate.jobType || null,
    match_score: candidate.primaryGroup?.matchScore?.toString() || null,
    class_explain: candidate.primaryGroup?.groupName || null,
  };
}

/**
 * Maps frontend Status to API status string format
 * Converts snake_case to Title Case with spaces
 * Example: "ready_for_bot_interview" -> "Ready For Bot Interview"
 */
export function mapStatusToStatusString(status: Status): string {
  const statusMap: Record<Status, string> = {
    submitted: "Submitted",
    bot_interview: "Bot Interview",
    ready_for_bot_interview: "Ready For Bot Interview",
    ready_for_recruit: "Ready For Recruit",
  };
  return statusMap[status] || "Submitted";
}

/**
 * Maps frontend Status to API status_id (legacy - kept for backward compatibility)
 * Note: The API uses status_id (1-7) but also accepts status strings
 * Status IDs: 1=Submitted, 2=Extracting, 3=Waiting Bot Interview, 
 *             4=Bot Interview, 5=Waiting Classification, 6=In Classification, 7=Ready For Recruit
 */
export function mapStatusToStatusId(status: Status): number {
  const statusMap: Record<Status, number> = {
    submitted: 1,
    bot_interview: 4,
    ready_for_bot_interview: 5,
    ready_for_recruit: 7,
  };
  return statusMap[status] || 1;
}

