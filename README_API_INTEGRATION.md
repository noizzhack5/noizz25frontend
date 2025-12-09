# API Integration Summary

## 📋 Overview

This document summarizes the complete integration of the backend API (https://noizz25backend.onrender.com) with the frontend React application.

---

## 🔌 Available API Endpoints

### CV Management

1. **POST `/upload-cv`** - Upload a new CV document
   - Accepts: multipart/form-data (file, name, phone, email, campaign, notes)
   - Returns: `CVUploadResponse` with id and status

2. **GET `/cv`** - Get all CV documents
   - Query params: `deleted` (boolean/null) - filter by deletion status
   - Returns: Array of `CVDocument`

3. **GET `/cv/search`** - Advanced search for CV documents
   - Query params:
     - `free_text` - Free text search across all fields
     - `current_status` - Filter by status
     - `job_type` - Filter by job type
     - `match_score` - Filter by match score range (below 70, 70-79, 80-89, 90-100, all match_score)
     - `campaign` - Filter by campaign
     - `country` - Filter by nationality/country
   - Returns: Array of `CVDocument`

4. **GET `/cv/{id}`** - Get CV document by ID
   - Returns: `CVDocument` (includes deleted documents)

5. **PATCH `/cv/{id}`** - Update CV document (partial update)
   - Body: `CVUpdateRequest` (all fields optional except phone_number cannot be updated)
   - Returns: Updated `CVDocument`

6. **DELETE `/cv/{id}`** - Soft delete CV document
   - Sets `is_deleted` to True
   - Returns: Success response

7. **POST `/cv/{id}/restore`** - Restore deleted CV document
   - Sets `is_deleted` to False
   - Returns: Restored `CVDocument`

8. **PATCH `/cv/{id}/status`** - Update CV status
   - Body: `StatusUpdateRequest` with `status_id` (1-7)
   - Available statuses:
     - 1: Submitted
     - 2: Extracting
     - 3: Waiting Bot Interview
     - 4: Bot Interview
     - 5: Waiting Classification
     - 6: In Classification
     - 7: Ready For Recruit
   - Returns: Updated `CVDocument`

### Processing Endpoints

9. **POST `/process-waiting-for-bot`** - Manually trigger bot processor
   - Processes records with "waiting_for_bot" status

10. **POST `/process-waiting-classification`** - Manually trigger classification processor
    - Processes records with "waiting_classification" status

---

## 📦 API Models

### CVDocument
```typescript
{
  id: string;
  latin_name?: string;
  hebrew_name?: string;
  email?: string;
  phone?: string;
  age?: string;
  nationality?: string;
  can_travel_europe?: string;
  can_visit_israel?: string;
  lives_in_europe?: string;
  native_israeli?: string;
  english_level?: string;
  remembers_job_application?: string;
  skills_summary?: string;
  job_type?: string;
  match_score?: string;
  class_explain?: string;
  campaign?: string;
  current_status?: string;
  status_history?: Array<{status: string; timestamp: string; note?: string}>;
  created_at?: string;
  updated_at?: string;
  is_deleted?: boolean;
  deleted_at?: string;
  cv_url?: string;
  profile_image?: string;
}
```

### CVUpdateRequest
All fields optional (except phone_number cannot be updated):
- latin_name, hebrew_name, email, campaign
- age, nationality
- can_travel_europe, can_visit_israel, lives_in_europe, native_israeli
- english_level, remembers_job_application
- skills_summary, job_type, match_score, class_explain

### StatusUpdateRequest
```typescript
{
  status_id: number; // 1-7
}
```

---

## ✅ Implemented Endpoints in Frontend

### Fully Implemented

1. ✅ **GET `/cv`** - `fetchCandidates()` and `fetchDeletedCandidates()`
   - Used in: `DashboardPage`, `DeletedCandidatesPage`
   - Location: `src/features/store/candidatesStore.ts`

2. ✅ **GET `/cv/search`** - `searchCandidates()`
   - Used in: `DashboardPage` (when filters are active)
   - Location: `src/features/store/candidatesStore.ts`

3. ✅ **GET `/cv/{id}`** - `fetchCandidateById()`
   - Location: `src/features/store/candidatesStore.ts`

4. ✅ **PATCH `/cv/{id}`** - `updateCandidate()`
   - Used in: `DashboardPage` (candidate updates)
   - Location: `src/features/store/candidatesStore.ts`

5. ✅ **DELETE `/cv/{id}`** - `deleteCandidate()`
   - Used in: `DashboardPage` (delete action)
   - Location: `src/features/store/candidatesStore.ts`

6. ✅ **POST `/cv/{id}/restore`** - `restoreCandidate()`
   - Used in: `DeletedCandidatesPage`
   - Location: `src/features/store/candidatesStore.ts`

7. ✅ **PATCH `/cv/{id}/status`** - `updateCandidateStatus()`
   - Used in: `DashboardPage` (status changes)
   - Location: `src/features/store/candidatesStore.ts`

### Partially Implemented / Needs UI

8. ⚠️ **POST `/upload-cv`** - API client ready, but needs file upload UI
   - Client method: `apiClient.uploadCV()`
   - Location: `src/services/apiClient/client.ts`
   - Note: `addCandidate()` in store currently shows a message to use upload form

9. ⚠️ **POST `/process-waiting-for-bot`** - API client ready, not used in UI
   - Client method: `apiClient.triggerBotProcessor()`
   - Location: `src/services/apiClient/client.ts`

10. ⚠️ **POST `/process-waiting-classification`** - API client ready, not used in UI
    - Client method: `apiClient.triggerClassificationProcessor()`
    - Location: `src/services/apiClient/client.ts`

---

## 🔄 Where Mock Data Was Replaced

### Files Modified

1. **`src/features/store/candidatesStore.ts`**
   - ❌ Removed: `mockCandidates` import
   - ✅ Added: API client integration
   - ✅ Added: `fetchCandidates()`, `fetchDeletedCandidates()`, `searchCandidates()`
   - ✅ Added: Loading and error states
   - ✅ Updated: All CRUD operations now use real API

2. **`src/pages/DashboardPage.tsx`**
   - ✅ Added: `useEffect` to fetch data on mount and filter changes
   - ✅ Added: Loading and error UI indicators
   - ✅ Updated: All candidate operations use async API calls
   - ✅ Added: Error handling with toast notifications

3. **`src/pages/DeletedCandidatesPage.tsx`**
   - ✅ Added: `useEffect` to fetch deleted candidates on mount
   - ✅ Added: Loading and error UI indicators
   - ✅ Updated: Restore operation uses real API

4. **`src/services/api.ts`** (Old mock API)
   - ⚠️ Still exists but not used - can be removed in cleanup

5. **`src/services/endpoints/`** (Old mock endpoints)
   - ⚠️ Still exists but not used - can be removed in cleanup

### New Files Created

1. **`src/services/apiClient/types.ts`** - TypeScript types from OpenAPI spec
2. **`src/services/apiClient/client.ts`** - Typed API client with all endpoints
3. **`src/services/apiClient/mappers.ts`** - Mappers between API and frontend types
4. **`src/services/apiClient/index.ts`** - Exports

---

## 🗺️ Data Mapping

### API → Frontend (CVDocument → Candidate)

- `latin_name` → `fullName`
- `hebrew_name` → `fullNameHebrew`
- `nationality` → `citizenship`
- `can_travel_europe` (yes/no) → `canTravelEurope` (boolean)
- `can_visit_israel` (yes/no) → `canTravelIsrael` (boolean)
- `lives_in_europe` (yes/no) → `livesInEurope` (boolean)
- `native_israeli` (yes/no) → `nativeIsraeli` (boolean)
- `english_level` → `speaksEnglish` (boolean)
- `remembers_job_application` (yes/no) → `remembersPosition` (boolean)
- `skills_summary` → `aiSkillsSummary`
- `match_score` (string) → `primaryGroup.matchScore` (number)
- `class_explain` → `primaryGroup.groupName`
- `current_status` (1-7) → `status` (Status enum)
- `is_deleted` → `deleted`
- `status_history` → `statusHistory` (with Date conversion)

### Frontend → API (Candidate → CVUpdateRequest)

Reverse mapping in `mapCandidateToCVUpdateRequest()`

---

## ⚙️ Environment Configuration

### Required Environment Variable

```env
VITE_API_BASE_URL=https://noizz25backend.onrender.com
```

### Setup

1. Create `.env` file in project root:
   ```
   VITE_API_BASE_URL=https://noizz25backend.onrender.com
   ```

2. For different environments:
   - `.env.local` - Local development (not committed)
   - `.env.production` - Production build
   - `.env.development` - Development build

3. The API client automatically uses `import.meta.env.VITE_API_BASE_URL`

---

## 🚀 Usage Examples

### Fetching Candidates

```typescript
const { fetchCandidates, candidates, isLoading, error } = useCandidatesStore();

useEffect(() => {
  fetchCandidates();
}, []);
```

### Searching with Filters

```typescript
const { searchCandidates, setSearchQuery, setStatusFilter } = useCandidatesStore();

// Set filters
setSearchQuery("John");
setStatusFilter("ready_for_recruit");

// Search will be triggered automatically via useEffect
```

### Updating a Candidate

```typescript
const { updateCandidate } = useCandidatesStore();

await updateCandidate(candidateId, {
  fullName: "John Doe",
  email: "john@example.com",
});
```

### Updating Status

```typescript
const { updateCandidateStatus } = useCandidatesStore();

await updateCandidateStatus(candidateId, "ready_for_recruit");
```

---

## 🔮 Recommendations for Further Integration

### High Priority

1. **File Upload UI** - Implement CV upload form
   - Create component for file upload
   - Use `apiClient.uploadCV()` with FormData
   - Show upload progress
   - Handle file validation (PDF only)

2. **Error Handling Enhancement**
   - Add retry logic for failed requests
   - Add network error detection
   - Show user-friendly error messages
   - Add error logging service

3. **Loading States**
   - Add skeleton loaders for better UX
   - Show loading indicators per operation
   - Disable actions during loading

### Medium Priority

4. **Pagination** - API may support pagination in future
   - Add pagination controls
   - Implement infinite scroll option
   - Cache paginated results

5. **Real-time Updates** - If backend adds WebSocket support
   - Subscribe to candidate updates
   - Show notifications for status changes
   - Auto-refresh candidate list

6. **Optimistic Updates**
   - Update UI immediately before API confirms
   - Rollback on error
   - Better perceived performance

### Low Priority

7. **Processor Triggers UI**
   - Add admin panel buttons for:
     - `triggerBotProcessor()`
     - `triggerClassificationProcessor()`
   - Show processing status

8. **Advanced Filtering**
   - Add date range filters
   - Add multiple country selection
   - Save filter presets

9. **Export Functionality**
   - Export filtered results to CSV/Excel
   - Generate reports

---

## 🐛 Known Issues / Limitations

1. **Add Candidate** - Currently shows message to use upload form
   - The API requires file upload for new candidates
   - Need to implement file upload UI

2. **Alternative Groups** - Not provided by API
   - Frontend expects `alternativeGroups` but API doesn't return it
   - Currently set to empty array

3. **Matched Parameters** - Not provided by API
   - Frontend expects `matchedParameters` but API doesn't return it
   - Currently set to empty array

4. **Bot Conversation** - Not provided by API
   - Frontend expects `botConversation` but API doesn't return it
   - Currently undefined

5. **Status Mapping** - Some statuses don't map perfectly
   - API has 7 statuses, frontend has 6
   - Some API statuses map to same frontend status

---

## ✅ Testing Checklist

- [x] API client compiles without errors
- [x] Types are properly defined
- [x] Mappers work correctly
- [x] Store integrates with API
- [x] Loading states work
- [x] Error states work
- [x] DashboardPage fetches and displays data
- [x] DeletedCandidatesPage fetches and displays data
- [x] Search functionality works
- [x] Update candidate works
- [x] Delete candidate works
- [x] Restore candidate works
- [x] Update status works
- [ ] File upload works (needs UI)
- [ ] Error handling is user-friendly
- [ ] Network errors are handled gracefully

---

## 📝 Notes

- All API calls are async and return Promises
- Error handling uses `ApiError` class with status codes
- Loading states are managed in the store
- The UI automatically refreshes after mutations
- Environment variable is required for API base URL

---

**Last Updated:** Integration completed with real API endpoints
**API Base URL:** https://noizz25backend.onrender.com
**OpenAPI Spec:** https://noizz25backend.onrender.com/docs

