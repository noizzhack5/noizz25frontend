import { useState, useEffect, useCallback } from "react";
import { useCandidatesStore } from "@/features/store/candidatesStore";
import { SyncIndicator } from "@/components/SyncIndicator";
import { usePolling } from "@/hooks/usePolling";

export function DeletedCandidatesPage() {
  const {
    candidates,
    searchQuery,
    error,
    lastSyncedAt,
    isSyncing,
    fetchDeletedCandidates,
    silentFetchDeletedCandidates,
    setSearchQuery,
    restoreCandidate,
  } = useCandidatesStore();

  useEffect(() => {
    fetchDeletedCandidates();
  }, []);

  // Polling callback - uses silent method to avoid loading flicker
  const pollDeletedCandidates = useCallback(async () => {
    await silentFetchDeletedCandidates();
  }, [silentFetchDeletedCandidates]);

  // Set up polling every 5 seconds
  usePolling(pollDeletedCandidates, {
    interval: 5000,
    enabled: true,
    pauseOnHidden: true,
  });

  const filteredCandidates = candidates.filter(
    (c) => c.deleted && (!searchQuery || c.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-black mb-2">Deleted Candidates</h2>
            <p className="text-sm text-gray-600">
              View and restore deleted candidates
            </p>
          </div>
          <SyncIndicator lastSyncedAt={lastSyncedAt} isSyncing={isSyncing} />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search deleted candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
          />
        </div>
      </div>

      {filteredCandidates.length === 0 ? (
        <div className="border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No deleted candidates found.</p>
        </div>
      ) : (
        <div className="border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">
                  Full Name
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">
                  Job Type
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">
                  Deleted At
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="border-b border-gray-200"
                >
                  <td className="px-6 py-4 text-black">
                    {candidate.fullName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {candidate.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {candidate.jobType}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {candidate.deletedAt
                      ? new Date(candidate.deletedAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={async () => {
                        try {
                          await restoreCandidate(candidate.id);
                          fetchDeletedCandidates();
                        } catch (error) {
                          console.error("Failed to restore candidate:", error);
                        }
                      }}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm transition-colors"
                    >
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

