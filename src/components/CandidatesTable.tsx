import { Trash2, ArrowUpDown, ArrowUp, ArrowDown, FileText, Eye } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { Candidate } from '@/types';
import { useState } from 'react';

interface CandidatesTableProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onDeleteCandidate: (id: string) => void;
  onViewResume?: (resumeUrl: string, candidateName: string) => void;
  selectedCandidateId?: string;
  showDeleted?: boolean;
  isSimplified?: boolean;
  hideHeader?: boolean;
}

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

// Helper function to check if candidate is recently added (within last 10 seconds)
const isRecentlyAdded = (candidate: Candidate): boolean => {
  return !!candidate.isNew;
};

// Helper function to check if status was recently changed (within last 10 seconds)
const hasRecentStatusChange = (candidate: Candidate): boolean => {
  return !!candidate.statusChangedAt;
};

// Helper function to check if new answers were recently received (within last 10 seconds)
const hasRecentNewAnswers = (candidate: Candidate): boolean => {
  return !!candidate.newAnswersAt;
};

type SortField = 'name' | 'status' | 'jobType' | 'matchScore' | 'campaign' | null;
type SortDirection = 'asc' | 'desc' | null;

export function CandidatesTable({
  candidates,
  onSelectCandidate,
  onDeleteCandidate,
  onViewResume,
  selectedCandidateId,
  showDeleted = false,
  isSimplified = false,
  hideHeader = false
}: CandidatesTableProps) {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<SortField>(null);
  const [sortField, setSortField] = useState<SortField>('matchScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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

  if (candidates.length === 0) {
    return (
      <div className="border border-gray-200 p-12 text-center">
        <p className="text-gray-500">
          {showDeleted ? 'No deleted candidates.' : 'No candidates found matching your criteria.'}
        </p>
      </div>
    );
  }

  // Sort candidates based on selected field and direction
  const sortedCandidates = [...candidates].sort((a, b) => {
    // Always put newly added candidates first (isNew flag)
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;

    if (!sortField || !sortDirection) {
      // Default sort by match score descending (null values go to end)
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
        const statusOrder = { submitted: 0, bot_interview: 1, ready_for_bot_interview: 2, ready_for_recruit: 3 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
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

  // Simplified view - only name and status
  if (isSimplified) {
    return (
      <div className="border border-gray-200 overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Full Name</th>
                <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedCandidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate)}
                  className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedCandidateId === candidate.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <p className="text-black">{candidate.fullName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={candidate.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Full view - all columns
  return (
    <div className={`border border-gray-200 ${hideHeader ? 'border-t-0 rounded-b-lg' : 'rounded-lg'}`}>
      <table className="w-full border-collapse">
        {!hideHeader && (
          <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors select-none bg-gray-50 border-b border-gray-200"
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
                  className="px-6 py-4 text-left text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors select-none bg-gray-50 border-b border-gray-200"
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
                  className="px-6 py-4 text-left text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors select-none bg-gray-50 border-b border-gray-200"
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
                  className="px-6 py-4 text-left text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors select-none bg-gray-50 border-b border-gray-200"
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
                  className="px-6 py-4 text-left text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors select-none bg-gray-50 border-b border-gray-200"
                  onClick={() => handleSort('campaign')}
                  onMouseEnter={() => setHoveredColumn('campaign')}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  <div className="flex items-center gap-2">
                    <span>Campaign</span>
                    {getSortIcon('campaign')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm text-gray-600 bg-gray-50 border-b border-gray-200">CV</th>
              </tr>
            </thead>
        )}
        <tbody>
            {sortedCandidates.map((candidate) => {
              const isNew = isRecentlyAdded(candidate);
              const hasStatusChange = hasRecentStatusChange(candidate);
              const hasNewAnswers = hasRecentNewAnswers(candidate);
              const hasUpdate = (hasStatusChange || hasNewAnswers) && !isNew;
              
              return (
                <tr
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate)}
                  className={`border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedCandidateId === candidate.id ? 'bg-gray-100' : ''
                  }`}
                  onMouseEnter={() => setHoveredRowId(candidate.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-black font-medium">{candidate.fullName}</p>
                          {isNew && (
                            <span className="inline-flex items-center px-1.5 py-0.5 border border-yellow-500 text-yellow-700 text-xs">
                              New
                            </span>
                          )}
                          {hasStatusChange && !isNew && (
                            <div className="w-1.5 h-1.5 bg-[#F3CB06] rounded-full" title="Status updated"></div>
                          )}
                          {hasNewAnswers && !hasStatusChange && !isNew && (
                            <div className="w-1.5 h-1.5 bg-[#F3CB06] rounded-full" title="New answers received"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{candidate.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={candidate.status} />
                  </td>
                  <td className="px-6 py-4">
                    {candidate.status !== 'submitted' && candidate.jobType ? (
                      <span className="text-sm text-gray-700">
                        {getJobTypeLabel(candidate.jobType)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {candidate.status !== 'submitted' && candidate.primaryGroup.matchScore !== null ? (
                      <div className="flex items-center gap-3">
                        <svg width="80" height="50" viewBox="0 0 100 60" className="flex-shrink-0">
                          {/* Background semi-circle */}
                          <path
                            d="M 10 55 A 40 40 0 0 1 90 55"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                          {/* Foreground semi-circle (match score) */}
                          <path
                            d="M 10 55 A 40 40 0 0 1 90 55"
                            fill="none"
                            stroke="#F3CB06"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${(candidate.primaryGroup.matchScore / 100) * 126} 126`}
                            className="transition-all"
                          />
                          {/* Percentage text */}
                          <text
                            x="50"
                            y="50"
                            textAnchor="middle"
                            className="text-[18px] fill-black"
                            style={{ fontFamily: 'inherit', fontWeight: '500' }}
                          >
                            {candidate.primaryGroup.matchScore}%
                          </text>
                        </svg>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-sm text-gray-700">
                      {candidate.campaignSource}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {candidate.cvUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onViewResume) {
                              onViewResume(candidate.cvUrl, candidate.fullName);
                            } else {
                              window.open(candidate.cvUrl, '_blank');
                            }
                          }}
                          className="p-2 hover:bg-gray-200 transition-colors rounded group relative"
                          title="View Resume"
                        >
                          <div className="relative">
                            <FileText size={18} className="text-gray-600" strokeWidth={1.5} />
                            <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
                              <Eye size={8} className="text-gray-700" strokeWidth={2.5} />
                            </div>
                          </div>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCandidate(candidate.id);
                        }}
                        className={`p-2 hover:bg-red-100 transition-all ${
                          hoveredRowId === candidate.id ? 'opacity-100' : 'opacity-0'
                        }`}
                        title="Delete candidate"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  );
}