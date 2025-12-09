import { X, Search, ChevronDown } from 'lucide-react';
import type { Status, JobType } from '@/types';
import { useState, useRef, useEffect } from 'react';

interface FilterBarProps {
  statusFilter: Status | 'all';
  jobTypeFilter: JobType | 'all';
  matchFilter: string;
  campaignFilter: string;
  countriesFilter: string[];
  onStatusFilterChange: (status: Status | 'all') => void;
  onJobTypeFilterChange: (jobType: JobType | 'all') => void;
  onMatchFilterChange: (range: string) => void;
  onCampaignFilterChange: (campaign: string) => void;
  onCountriesFilterChange: (countries: string[]) => void;
  availableCampaigns: string[];
  availableCountries: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterBar({
  statusFilter,
  jobTypeFilter,
  matchFilter,
  campaignFilter,
  countriesFilter,
  onStatusFilterChange,
  onJobTypeFilterChange,
  onMatchFilterChange,
  onCampaignFilterChange,
  onCountriesFilterChange,
  availableCampaigns,
  availableCountries,
  searchQuery,
  onSearchChange
}: FilterBarProps) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [isMatchOpen, setIsMatchOpen] = useState(false);
  const [isCampaignOpen, setIsCampaignOpen] = useState(false);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  
  const statusRef = useRef<HTMLDivElement>(null);
  const jobTypeRef = useRef<HTMLDivElement>(null);
  const matchRef = useRef<HTMLDivElement>(null);
  const campaignRef = useRef<HTMLDivElement>(null);
  const countriesRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
      if (jobTypeRef.current && !jobTypeRef.current.contains(event.target as Node)) {
        setIsJobTypeOpen(false);
      }
      if (matchRef.current && !matchRef.current.contains(event.target as Node)) {
        setIsMatchOpen(false);
      }
      if (campaignRef.current && !campaignRef.current.contains(event.target as Node)) {
        setIsCampaignOpen(false);
      }
      if (countriesRef.current && !countriesRef.current.contains(event.target as Node)) {
        setIsCountriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeFiltersCount = [
    statusFilter !== 'all',
    jobTypeFilter !== 'all',
    matchFilter !== 'all',
    campaignFilter !== 'all',
    countriesFilter.length > 0
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    onStatusFilterChange('all');
    onJobTypeFilterChange('all');
    onMatchFilterChange('all');
    onCampaignFilterChange('all');
    onCountriesFilterChange([]);
  };

  const toggleCountry = (country: string) => {
    if (countriesFilter.includes(country)) {
      onCountriesFilterChange(countriesFilter.filter(c => c !== country));
    } else {
      onCountriesFilterChange([...countriesFilter, country]);
    }
  };

  const getCountriesLabel = () => {
    if (countriesFilter.length === 0) return 'All Countries';
    if (countriesFilter.length === 1) return countriesFilter[0];
    return `${countriesFilter.length} Countries`;
  };

  const getStatusLabel = () => {
    if (statusFilter === 'all') return 'All Statuses';
    const labels: Record<Status, string> = {
      submitted: 'Submitted',
      bot_interview: 'Bot Interview',
      ready_for_bot_interview: 'Ready for Bot Interview',
      ready_for_recruit: 'Ready for Recruit'
    };
    return labels[statusFilter];
  };

  const getJobTypeLabel = () => {
    if (jobTypeFilter === 'all') return 'All Job Types';
    const labels: Record<JobType, string> = {
      headquarters_staff: 'Headquarters Staff',
      training_instruction: 'Training/Instruction',
      sales: 'Sales',
      operational_worker: 'Operational Worker'
    };
    return labels[jobTypeFilter];
  };

  const getMatchLabel = () => {
    if (matchFilter === 'all') return 'All Match %';
    const labels: Record<string, string> = {
      '90-100': '90-100%',
      '80-89': '80-89%',
      '70-79': '70-79%',
      '0-69': 'Below 70%'
    };
    return labels[matchFilter] || 'All Match %';
  };

  const getCampaignLabel = () => {
    if (campaignFilter === 'all') return 'All Campaigns';
    return campaignFilter;
  };

  const statusOptions: Array<{ value: Status | 'all'; label: string }> = [
    { value: 'all', label: 'All Statuses' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'bot_interview', label: 'Bot Interview' },
    { value: 'ready_for_bot_interview', label: 'Ready for Bot Interview' },
    { value: 'ready_for_recruit', label: 'Ready for Recruit' }
  ];

  const jobTypeOptions: Array<{ value: JobType | 'all'; label: string }> = [
    { value: 'all', label: 'All Job Types' },
    { value: 'headquarters_staff', label: 'Headquarters Staff' },
    { value: 'training_instruction', label: 'Training/Instruction' },
    { value: 'sales', label: 'Sales' },
    { value: 'operational_worker', label: 'Operational Worker' }
  ];

  const matchOptions: Array<{ value: string; label: string }> = [
    { value: 'all', label: 'All Match %' },
    { value: '90-100', label: '90-100%' },
    { value: '80-89', label: '80-89%' },
    { value: '70-79', label: '70-79%' },
    { value: '0-69', label: 'Below 70%' }
  ];

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap gap-2 md:gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-auto md:min-w-[280px]">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 pr-10 py-2 border text-sm transition-colors rounded-full bg-white text-gray-700 border-gray-300 hover:border-black focus:outline-none focus:border-black"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div ref={statusRef} className="relative flex-1 md:flex-initial min-w-[180px]">
          <button
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className={`w-full px-4 py-2 border text-sm cursor-pointer transition-colors rounded-full text-left flex items-center justify-between ${
              statusFilter !== 'all'
                ? 'bg-white text-black border-[#F3CB06]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-black'
            }`}
          >
            <span>{getStatusLabel()}</span>
            <ChevronDown size={12} className={`transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} />
          </button>

          {isStatusOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="p-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onStatusFilterChange(option.value);
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer rounded transition-colors ${
                      statusFilter === option.value ? 'bg-gray-100 text-black' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Job Type Filter */}
        <div ref={jobTypeRef} className="relative flex-1 md:flex-initial min-w-[180px]">
          <button
            onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
            className={`w-full px-4 py-2 border text-sm cursor-pointer transition-colors rounded-full text-left flex items-center justify-between ${
              jobTypeFilter !== 'all'
                ? 'bg-white text-black border-[#F3CB06]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-black'
            }`}
          >
            <span>{getJobTypeLabel()}</span>
            <ChevronDown size={12} className={`transition-transform ${isJobTypeOpen ? 'rotate-180' : ''}`} />
          </button>

          {isJobTypeOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="p-2">
                {jobTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onJobTypeFilterChange(option.value);
                      setIsJobTypeOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer rounded transition-colors ${
                      jobTypeFilter === option.value ? 'bg-gray-100 text-black' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Match Percentage Filter */}
        <div ref={matchRef} className="relative flex-1 md:flex-initial min-w-[140px]">
          <button
            onClick={() => setIsMatchOpen(!isMatchOpen)}
            className={`w-full px-4 py-2 border text-sm cursor-pointer transition-colors rounded-full text-left flex items-center justify-between ${
              matchFilter !== 'all'
                ? 'bg-white text-black border-[#F3CB06]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-black'
            }`}
          >
            <span>{getMatchLabel()}</span>
            <ChevronDown size={12} className={`transition-transform ${isMatchOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMatchOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="p-2">
                {matchOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onMatchFilterChange(option.value);
                      setIsMatchOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer rounded transition-colors ${
                      matchFilter === option.value ? 'bg-gray-100 text-black' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Campaign Filter */}
        <div ref={campaignRef} className="relative flex-1 md:flex-initial min-w-[180px]">
          <button
            onClick={() => setIsCampaignOpen(!isCampaignOpen)}
            className={`w-full px-4 py-2 border text-sm cursor-pointer transition-colors rounded-full text-left flex items-center justify-between ${
              campaignFilter !== 'all'
                ? 'bg-white text-black border-[#F3CB06]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-black'
            }`}
          >
            <span>{getCampaignLabel()}</span>
            <ChevronDown size={12} className={`transition-transform ${isCampaignOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCampaignOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="p-2">
                <button
                  onClick={() => {
                    onCampaignFilterChange('all');
                    setIsCampaignOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer rounded transition-colors ${
                    campaignFilter === 'all' ? 'bg-gray-100 text-black' : 'text-gray-700'
                  }`}
                >
                  <span className="text-sm">All Campaigns</span>
                </button>
                {availableCampaigns.map((campaign) => (
                  <button
                    key={campaign}
                    onClick={() => {
                      onCampaignFilterChange(campaign);
                      setIsCampaignOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer rounded transition-colors ${
                      campaignFilter === campaign ? 'bg-gray-100 text-black' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-sm">{campaign}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Countries Filter - Multi-select with Checkboxes */}
        <div ref={countriesRef} className="relative flex-1 md:flex-initial min-w-[180px]">
          <button
            onClick={() => setIsCountriesOpen(!isCountriesOpen)}
            className={`w-full px-4 py-2 border text-sm cursor-pointer transition-colors rounded-full text-left flex items-center justify-between ${
              countriesFilter.length > 0
                ? 'bg-white text-black border-[#F3CB06]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-black'
            }`}
          >
            <span>{getCountriesLabel()}</span>
            <ChevronDown size={12} className={`transition-transform ${isCountriesOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCountriesOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="p-2">
                {availableCountries.map((country) => (
                  <label
                    key={country}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={countriesFilter.includes(country)}
                      onChange={() => toggleCountry(country)}
                      className="w-4 h-4 rounded border-gray-300 text-[#F3CB06] focus:ring-[#F3CB06] cursor-pointer"
                      style={{
                        accentColor: '#F3CB06'
                      }}
                    />
                    <span className="text-sm text-gray-700">{country}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-sm transition-colors rounded-full bg-white text-gray-700 hover:text-black w-full md:w-auto"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}