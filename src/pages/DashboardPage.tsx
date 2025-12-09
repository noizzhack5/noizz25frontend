import { useMemo, useState, useEffect } from "react";
import { useCandidatesStore } from "@/features/store/candidatesStore";
import { ActionBoard } from "@/components/ActionBoard";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { CandidatesTable } from "@/components/CandidatesTable";
import { CandidateCard } from "@/components/CandidateCard";
import { AddCandidateModal } from "@/components/AddCandidateModal";
import { ExcitingNotification } from "@/components/ExcitingNotification";
import { ResumeViewer } from "@/components/ResumeViewer";
import { Toast } from "@/components/Toast";
import { useUIStore } from "@/features/store/uiStore";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { Candidate, Status, JobType } from "@/types";

type SortField = 'name' | 'status' | 'jobType' | 'matchScore' | 'campaign' | null;
type SortDirection = 'asc' | 'desc' | null;

export function DashboardPage() {
  const {
    candidates,
    selectedCandidate,
    searchQuery,
    statusFilter,
    jobTypeFilter,
    matchFilter,
    campaignFilter,
    countriesFilter,
    isLoading,
    error,
    fetchCandidates,
    searchCandidates,
    setSelectedCandidate,
    setSearchQuery,
    setStatusFilter,
    setJobTypeFilter,
    setMatchFilter,
    setCampaignFilter,
    setCountriesFilter,
    addCandidate,
    deleteCandidate,
    updateCandidate,
    updateCandidateStatus,
  } = useCandidatesStore();

  const { actionBoardVisible, toggleActionBoard, showAddCandidateModal, setShowAddCandidateModal } = useUIStore();

  // Fetch candidates on mount and when filters change
  useEffect(() => {
    const hasActiveFilters = 
      searchQuery ||
      statusFilter !== "all" ||
      jobTypeFilter !== "all" ||
      matchFilter !== "all" ||
      campaignFilter !== "all" ||
      countriesFilter.length > 0;

    if (hasActiveFilters) {
      searchCandidates();
    } else {
      fetchCandidates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, statusFilter, jobTypeFilter, matchFilter, campaignFilter, countriesFilter]);

  const [newlyAddedCandidate, setNewlyAddedCandidate] =
    useState<Candidate | null>(null);
  const [showExcitingModal, setShowExcitingModal] = useState(false);
  const [cvViewerCandidate, setCvViewerCandidate] =
    useState<Candidate | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Sorting state
  const [sortField, setSortField] = useState<SortField>('matchScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [hoveredColumn, setHoveredColumn] = useState<SortField>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: desc -> asc -> null
      if (sortDirection === 'desc') {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    const isActive = sortField === field;
    const isHovered = hoveredColumn === field;
    
    // Only show icon if column is hovered or actively sorted
    if (!isActive && !isHovered) {
      return null;
    }

    if (isActive) {
      if (sortDirection === 'desc') {
        return <ArrowDown size={14} className="text-black" />;
      }
      if (sortDirection === 'asc') {
        return <ArrowUp size={14} className="text-black" />;
      }
    }
    
    // Hovered but not active
    return <ArrowUpDown size={14} className="text-gray-400" />;
  };

  const getJobTypeLabel = (jobType: string | null | undefined): string | null => {
    if (!jobType || jobType === 'null' || jobType === null) {
      return null;
    }
    const labels: Record<string, string> = {
      headquarters_staff: 'Headquarters Staff',
      training_instruction: 'Training/Instruction',
      sales: 'Sales',
      operational_worker: 'Operational Worker'
    };
    return labels[jobType] || jobType;
  };

  // Get unique campaigns for filter
  const availableCampaigns = useMemo(() => {
    return Array.from(
      new Set(candidates.map((c) => c.campaignSource))
    ).sort();
  }, [candidates]);

  // Helper function to convert nationality to country name
  const nationalityToCountry = (nationality: string): string => {
    const mapping: Record<string, string> = {
      Israeli: "Israel",
      American: "United States",
      German: "Germany",
      French: "France",
      British: "United Kingdom",
      Canadian: "Canada",
      Australian: "Australia",
      Italian: "Italy",
      Spanish: "Spain",
      Portuguese: "Portugal",
      Dutch: "Netherlands",
      Belgian: "Belgium",
      Swedish: "Sweden",
      Norwegian: "Norway",
      Danish: "Denmark",
      Finnish: "Finland",
      Polish: "Poland",
      Russian: "Russia",
      Ukrainian: "Ukraine",
      Romanian: "Romania",
      Greek: "Greece",
      Turkish: "Turkey",
      Indian: "India",
      Chinese: "China",
      Japanese: "Japan",
      Korean: "South Korea",
      Brazilian: "Brazil",
      Argentinian: "Argentina",
      Mexican: "Mexico",
      "South African": "South Africa",
      Egyptian: "Egypt",
      Moroccan: "Morocco",
      Lebanese: "Lebanon",
      Jordanian: "Jordan",
    };
    return mapping[nationality] || nationality;
  };

  // Get unique countries for filter
  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    candidates.forEach((candidate) => {
      if (candidate.citizenship) {
        const citizenships = candidate.citizenship
          .split("/")
          .map((c) => c.trim());
        citizenships.forEach((nationality) => {
          const country = nationalityToCountry(nationality);
          countries.add(country);
        });
      }
    });
    return Array.from(countries).sort();
  }, [candidates]);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    let filtered = candidates.filter((c) => !c.deleted);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((candidate) => {
        const getJobTypeLabel = (jobType: JobType): string => {
          const labels: Record<JobType, string> = {
            headquarters_staff: "Headquarters Staff",
            training_instruction: "Training Instruction",
            sales: "Sales",
            operational_worker: "Operational Worker",
          };
          return labels[jobType] || jobType;
        };

        const getStatusLabel = (status: string): string => {
          const labels: Record<string, string> = {
            submitted: "Submitted",
            bot_interview: "Bot Interview",
            ready_for_recruit: "Ready for Recruit",
          };
          return labels[status] || status;
        };

        return (
          candidate.fullName?.toLowerCase().includes(query) ||
          candidate.fullNameHebrew?.toLowerCase().includes(query) ||
          candidate.email?.toLowerCase().includes(query) ||
          candidate.phone?.includes(query) ||
          candidate.campaignSource?.toLowerCase().includes(query) ||
          candidate.citizenship?.toLowerCase().includes(query) ||
          candidate.age?.toString().includes(query) ||
          candidate.jobType?.toLowerCase().includes(query) ||
          (candidate.jobType && getJobTypeLabel(candidate.jobType).toLowerCase().includes(query)) ||
          candidate.status?.toLowerCase().includes(query) ||
          (candidate.status && getStatusLabel(candidate.status).toLowerCase().includes(query)) ||
          candidate.primaryGroup?.groupName?.toLowerCase().includes(query) ||
          (candidate.primaryGroup?.matchScore !== null && candidate.primaryGroup?.matchScore?.toString().includes(query)) ||
          candidate.alternativeGroups?.some(
            (group) =>
              group.groupName?.toLowerCase().includes(query) ||
              group.matchScore?.toString().includes(query)
          ) ||
          candidate.matchedParameters?.some((param) =>
            param.name?.toLowerCase().includes(query)
          ) ||
          candidate.aiSkillsSummary?.toLowerCase().includes(query) ||
          candidate.notes?.toLowerCase().includes(query) ||
          candidate.manualNotes?.toLowerCase().includes(query)
        );
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (jobTypeFilter !== "all") {
      filtered = filtered.filter((c) => c.jobType === jobTypeFilter);
    }

    if (matchFilter !== "all") {
      filtered = filtered.filter((c) => {
        const score = c.primaryGroup.matchScore;
        if (score === null) return false; // Exclude null scores from match filters
        if (matchFilter === "90-100") return score >= 90;
        if (matchFilter === "80-89") return score >= 80 && score < 90;
        if (matchFilter === "70-79") return score >= 70 && score < 80;
        if (matchFilter === "0-69") return score < 70;
        return true;
      });
    }

    if (campaignFilter !== "all") {
      filtered = filtered.filter((c) => c.campaignSource === campaignFilter);
    }

    if (countriesFilter.length > 0) {
      filtered = filtered.filter((c) => {
        if (!c.citizenship) return false;
        const citizenships = c.citizenship.split("/").map((c) => c.trim());
        const countries = citizenships.map((nationality) =>
          nationalityToCountry(nationality)
        );
        return countriesFilter.some((country) => countries.includes(country));
      });
    }

    return filtered;
  }, [
    candidates,
    searchQuery,
    statusFilter,
    jobTypeFilter,
    matchFilter,
    campaignFilter,
    countriesFilter,
  ]);

  const sortedCandidates = useMemo(() => {
    // Sort all candidates based on sortField and sortDirection
    return [...filteredCandidates].sort((a, b) => {
      if (!sortField || !sortDirection) {
        // Default sort by match score descending
        const scoreA = a.primaryGroup.matchScore ?? -1;
        const scoreB = b.primaryGroup.matchScore ?? -1;
        return scoreB - scoreA;
      }

      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case 'status':
          const statusOrder: Record<string, number> = { submitted: 0, bot_interview: 1, ready_for_bot_interview: 2, ready_for_recruit: 3 };
          comparison = (statusOrder[a.status] ?? 0) - (statusOrder[b.status] ?? 0);
          break;
        case 'jobType':
          const jobTypeA = getJobTypeLabel(a.jobType) || '';
          const jobTypeB = getJobTypeLabel(b.jobType) || '';
          comparison = jobTypeA.localeCompare(jobTypeB);
          break;
        case 'matchScore':
          const scoreA = a.primaryGroup.matchScore ?? -1;
          const scoreB = b.primaryGroup.matchScore ?? -1;
          comparison = scoreA - scoreB;
          break;
        case 'campaign':
          comparison = a.campaignSource.localeCompare(b.campaignSource);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredCandidates, sortField, sortDirection]);

  const handleUpdateCandidate = async (updatedCandidate: Candidate) => {
    try {
      await updateCandidate(updatedCandidate.id, updatedCandidate);
      setSelectedCandidate(updatedCandidate);
      setToast({ message: "Candidate updated successfully", type: "success" });
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Failed to update candidate",
        type: "error",
      });
    }
  };

  const handleCandidateStatusChange = async (candidateId: string, newStatus: Status) => {
    try {
      await updateCandidateStatus(candidateId, newStatus);
      setToast({
        message: "Status updated successfully",
        type: "success",
      });
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Failed to update status",
        type: "error",
      });
    }
  };

  const handleAddCandidate = async (newCandidate: Omit<Candidate, "id">, file?: File) => {
    try {
      await addCandidate(newCandidate, file);
      setShowAddCandidateModal(false);
      setToast({ 
        message: file 
          ? "Candidate added successfully! CV is being processed." 
          : "Candidate added successfully!", 
        type: "success" 
      });
      // Refresh the list
      fetchCandidates();
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Failed to add candidate",
        type: "error",
      });
    }
  };

  const handleStatusFilterClick = (status: Status | 'all') => {
    setStatusFilter(status === 'all' ? 'all' : status);
  };

  const handleCountryFilterClick = (country: string) => {
    setCountriesFilter(
      countriesFilter.includes(country) ? [] : [country]
    );
    setStatusFilter("ready_for_recruit");
  };

  const handleMatchRangeFilterClick = (range: string) => {
    setMatchFilter(matchFilter === range ? "all" : range);
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6">
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Action Board */}
      <ActionBoard
        isVisible={actionBoardVisible}
        onToggle={toggleActionBoard}
        candidates={candidates}
        onStatusFilterClick={handleStatusFilterClick}
        onCountryFilterClick={handleCountryFilterClick}
        onMatchRangeFilterClick={handleMatchRangeFilterClick}
        statusFilter={statusFilter}
        matchFilter={matchFilter}
        countriesFilter={countriesFilter}
      />

      {/* Filter Bar and Table Header - Combined Sticky */}
      <div className="sticky top-14 z-20 bg-white pt-4 -mt-4">
        <FilterBar
          statusFilter={statusFilter}
          jobTypeFilter={jobTypeFilter}
          matchFilter={matchFilter}
          campaignFilter={campaignFilter}
          onStatusFilterChange={setStatusFilter}
          onJobTypeFilterChange={setJobTypeFilter}
          onMatchFilterChange={setMatchFilter}
          onCampaignFilterChange={setCampaignFilter}
          availableCampaigns={availableCampaigns}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          countriesFilter={countriesFilter}
          onCountriesFilterChange={setCountriesFilter}
          availableCountries={availableCountries}
        />
        {/* Sticky Table Header */}
        <div className="border border-gray-200 border-b-0 rounded-t-lg bg-gray-50">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm text-gray-600 font-normal cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('name')}
                  onMouseEnter={() => setHoveredColumn('name')}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  <div className="flex items-center gap-2">
                    <span>Full Name</span>
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm text-gray-600 font-normal cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('status')}
                  onMouseEnter={() => setHoveredColumn('status')}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  <div className="flex items-center gap-2">
                    <span>Status</span>
                    {getSortIcon('status')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm text-gray-600 font-normal cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('jobType')}
                  onMouseEnter={() => setHoveredColumn('jobType')}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  <div className="flex items-center gap-2">
                    <span>Job Type</span>
                    {getSortIcon('jobType')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm text-gray-600 font-normal cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('matchScore')}
                  onMouseEnter={() => setHoveredColumn('matchScore')}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  <div className="flex items-center gap-2">
                    <span>Match Score</span>
                    {getSortIcon('matchScore')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm text-gray-600 font-normal cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  onClick={() => handleSort('campaign')}
                  onMouseEnter={() => setHoveredColumn('campaign')}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  <div className="flex items-center gap-2">
                    <span>Campaign</span>
                    {getSortIcon('campaign')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-600 font-normal">CV</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/* Candidates Table */}
      <CandidatesTable
        candidates={sortedCandidates}
        hideHeader={true}
        onSelectCandidate={setSelectedCandidate}
        onDeleteCandidate={async (id) => {
          try {
            await deleteCandidate(id);
            setToast({ message: "Candidate deleted successfully", type: "success" });
            fetchCandidates();
          } catch (error) {
            setToast({
              message: error instanceof Error ? error.message : "Failed to delete candidate",
              type: "error",
            });
          }
        }}
        onViewResume={(url, name) => {
          const candidate = candidates.find((c) => c.fullName === name);
          if (candidate) {
            setCvViewerCandidate(candidate);
          }
        }}
        selectedCandidateId={selectedCandidate?.id}
        isSimplified={false}
      />

      {/* Candidate Card */}
      {selectedCandidate && !selectedCandidate.deleted && (
        <CandidateCard
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onStatusChange={handleCandidateStatusChange}
          onRefresh={fetchCandidates}
        />
      )}

      {/* Add Candidate Modal */}
      {showAddCandidateModal && (
        <AddCandidateModal
          onClose={() => setShowAddCandidateModal(false)}
          onAdd={handleAddCandidate}
        />
      )}

      {/* Exciting Notification Modal */}
      {showExcitingModal && newlyAddedCandidate && (
        <ExcitingNotification
          candidate={newlyAddedCandidate}
          onClose={() => {
            setShowExcitingModal(false);
            setNewlyAddedCandidate(null);
          }}
          onViewDetails={() => {
            setSelectedCandidate(newlyAddedCandidate);
            setShowExcitingModal(false);
            setNewlyAddedCandidate(null);
          }}
        />
      )}

      {/* Resume Viewer */}
      {cvViewerCandidate && (
        <ResumeViewer
          candidate={cvViewerCandidate}
          onClose={() => setCvViewerCandidate(null)}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

