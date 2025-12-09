import { ChevronDown, ChevronUp, BarChart3, TrendingUp, Flag, Trophy } from 'lucide-react';
import type { Candidate } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, TooltipProps } from 'recharts';

interface ActionBoardProps {
  isVisible: boolean;
  onToggle: () => void;
  candidates: Candidate[];
  onStatusFilterClick?: (status: 'submitted' | 'bot_interview' | 'ready_for_bot_interview' | 'ready_for_recruit' | 'all') => void;
  onCountryFilterClick?: (country: string) => void;
  onMatchRangeFilterClick?: (range: string) => void;
  statusFilter?: string;
  matchFilter?: string;
  countriesFilter?: string[];
}

// Helper function to convert nationality to country name
const nationalityToCountry = (nationality: string): string => {
  const mapping: Record<string, string> = {
    'Israeli': 'Israel',
    'American': 'United States',
    'German': 'Germany',
    'French': 'France',
    'British': 'United Kingdom',
    'Canadian': 'Canada',
    'Australian': 'Australia',
    'Italian': 'Italy',
    'Spanish': 'Spain',
    'Portuguese': 'Portugal',
    'Dutch': 'Netherlands',
    'Belgian': 'Belgium',
    'Swedish': 'Sweden',
    'Norwegian': 'Norway',
    'Danish': 'Denmark',
    'Finnish': 'Finland',
    'Polish': 'Poland',
    'Russian': 'Russia',
    'Ukrainian': 'Ukraine',
    'Romanian': 'Romania',
    'Greek': 'Greece',
    'Turkish': 'Turkey',
    'Indian': 'India',
    'Chinese': 'China',
    'Japanese': 'Japan',
    'Korean': 'South Korea',
    'Brazilian': 'Brazil',
    'Argentinian': 'Argentina',
    'Mexican': 'Mexico',
    'South African': 'South Africa',
    'Egyptian': 'Egypt',
    'Moroccan': 'Morocco',
    'Lebanese': 'Lebanon',
    'Jordanian': 'Jordan'
  };
  
  return mapping[nationality] || nationality;
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const count = payload[0].value as number;
    return (
      <div style={{
        backgroundColor: '#000',
        border: 'none',
        borderRadius: '6px',
        padding: '6px 10px',
        fontSize: '12px',
        color: '#fff'
      }}>
        <p style={{ margin: 0 }}>{count} candidate{count !== 1 ? 's' : ''}</p>
      </div>
    );
  }
  return null;
};

export function ActionBoard({ isVisible, onToggle, candidates, onStatusFilterClick, onCountryFilterClick, onMatchRangeFilterClick, statusFilter, matchFilter, countriesFilter }: ActionBoardProps) {
  // Calculate statistics
  const activeCandidates = candidates.filter(c => !c.deleted);
  const totalCount = activeCandidates.length;
  const submittedCount = activeCandidates.filter(c => c.status === 'submitted').length;
  const readyForBotCount = activeCandidates.filter(c => c.status === 'ready_for_bot_interview').length;
  const botInterviewCount = activeCandidates.filter(c => c.status === 'bot_interview').length;
  const readyCount = activeCandidates.filter(c => c.status === 'ready_for_recruit').length;
  const highMatchCount = activeCandidates.filter(c => c.primaryGroup.matchScore !== null && c.primaryGroup.matchScore >= 80).length;

  // Calculate top 3 countries for Ready for Recruit candidates
  const readyCandidates = activeCandidates.filter(c => c.status === 'ready_for_recruit');
  const countryCount: Record<string, number> = {};
  
  readyCandidates.forEach(candidate => {
    if (candidate.citizenship) {
      // Split by "/" for dual citizenship
      const countries = candidate.citizenship.split('/').map(c => c.trim());
      countries.forEach(nationality => {
        const country = nationalityToCountry(nationality);
        countryCount[country] = (countryCount[country] || 0) + 1;
      });
    }
  });

  const topCountries = Object.entries(countryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([country, count]) => ({ country, count }));

  // Calculate percentage for high match
  const highMatchPercentage = totalCount > 0 ? Math.round((highMatchCount / totalCount) * 100) : 0;

  // Calculate leading campaign
  const campaignCount: Record<string, number> = {};
  activeCandidates.forEach(candidate => {
    const campaign = candidate.campaignSource;
    campaignCount[campaign] = (campaignCount[campaign] || 0) + 1;
  });

  const leadingCampaign = Object.entries(campaignCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 1)
    .map(([campaign, count]) => ({ campaign, count }))[0];

  // Find max count for bar width calculation
  const maxCount = topCountries.length > 0 ? topCountries[0].count : 1;

  return (
    <div>
      {isVisible && (
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-6 mb-6">
          <div className="flex flex-wrap items-start gap-6 md:gap-12 lg:gap-20 xl:gap-[110px] gap-y-6 overflow-x-auto">
            {/* 1. Total Candidates */}
            <div className="flex-shrink-0 flex flex-col items-start">
              <p className="text-xs text-gray-400 mb-2">Total Candidates</p>
              <div className="flex items-center gap-4">
                <p className="text-2xl text-black">{totalCount}</p>
                <button 
                  onClick={() => {
                    // Clicking the pie chart toggles the status filter
                    if (statusFilter === 'ready_for_recruit') {
                      onStatusFilterClick?.('all' as any); // Clear filter
                    } else if (statusFilter === 'bot_interview') {
                      onStatusFilterClick?.('all' as any); // Clear filter
                    } else if (statusFilter === 'ready_for_bot_interview') {
                      onStatusFilterClick?.('all' as any); // Clear filter
                    } else if (statusFilter === 'submitted') {
                      onStatusFilterClick?.('all' as any); // Clear filter
                    } else {
                      onStatusFilterClick?.('ready_for_recruit');
                    }
                  }}
                  className="relative self-center cursor-pointer hover:opacity-80 transition-opacity" 
                  style={{ width: '60px', height: '36px' }}
                  title="Click to filter by status"
                >
                  <ResponsiveContainer width={60} height={36}>
                    <PieChart>
                      <Pie
                        data={[
                          { value: readyCount },
                          { value: botInterviewCount },
                          { value: readyForBotCount },
                          { value: submittedCount }
                        ]}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={20}
                        outerRadius={28}
                        dataKey="value"
                        paddingAngle={0}
                      >
                        <Cell 
                          fill="#10B981" 
                          opacity={statusFilter === 'all' || statusFilter === 'ready_for_recruit' ? 1 : 0.3}
                        />
                        <Cell 
                          fill="#F3CB06" 
                          opacity={statusFilter === 'all' || statusFilter === 'bot_interview' ? 1 : 0.3}
                        />
                        <Cell 
                          fill="#F59E0B" 
                          opacity={statusFilter === 'all' || statusFilter === 'ready_for_bot_interview' ? 1 : 0.3}
                        />
                        <Cell 
                          fill="#3B82F6" 
                          opacity={statusFilter === 'all' || statusFilter === 'submitted' ? 1 : 0.3}
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </button>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  <button 
                    onClick={() => {
                      if (statusFilter === 'submitted') {
                        onStatusFilterClick?.('all' as any);
                      } else {
                        onStatusFilterClick?.('submitted');
                      }
                    }}
                    className={`flex items-center gap-2 hover:opacity-70 transition-all cursor-pointer ${
                      statusFilter === 'submitted' ? 'font-medium' : (statusFilter !== 'all' ? 'opacity-40' : '')
                    }`}
                    title="Filter by Submitted"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
                    <span className="text-xs text-gray-600">{submittedCount} Submitted</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (statusFilter === 'ready_for_bot_interview') {
                        onStatusFilterClick?.('all');
                      } else {
                        onStatusFilterClick?.('ready_for_bot_interview');
                      }
                    }}
                    className={`flex items-center gap-2 hover:opacity-70 transition-all cursor-pointer ${
                      statusFilter === 'ready_for_bot_interview' ? 'font-medium' : (statusFilter !== 'all' ? 'opacity-40' : '')
                    }`}
                    title="Filter by Waiting for Bot Interview"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
                    <span className="text-xs text-gray-600">{readyForBotCount} Ready for Bot Interview</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (statusFilter === 'bot_interview') {
                        onStatusFilterClick?.('all' as any);
                      } else {
                        onStatusFilterClick?.('bot_interview');
                      }
                    }}
                    className={`flex items-center gap-2 hover:opacity-70 transition-all cursor-pointer ${
                      statusFilter === 'bot_interview' ? 'font-medium' : (statusFilter !== 'all' ? 'opacity-40' : '')
                    }`}
                    title="Filter by Bot Interview"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#F3CB06]"></div>
                    <span className="text-xs text-gray-600">{botInterviewCount} Bot Interview</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (statusFilter === 'ready_for_recruit') {
                        onStatusFilterClick?.('all' as any);
                      } else {
                        onStatusFilterClick?.('ready_for_recruit');
                      }
                    }}
                    className={`flex items-center gap-2 hover:opacity-70 transition-all cursor-pointer ${
                      statusFilter === 'ready_for_recruit' ? 'font-medium' : (statusFilter !== 'all' ? 'opacity-40' : '')
                    }`}
                    title="Filter by Ready for Recruit"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                    <span className="text-xs text-gray-600">{readyCount} Ready</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Top 3 Countries */}
            {topCountries.length > 0 && (
              <div className="flex-shrink-0 flex flex-col items-start" style={{ width: '220px' }}>
                <p className="text-xs text-gray-400 mb-2">Top 3 Countries (Ready)</p>
                <div className="flex items-start gap-3 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    {topCountries.map((item, index) => {
                      const fillPercentage = (item.count / maxCount) * 100;
                      const isActive = countriesFilter?.includes(item.country);
                      const hasFilter = countriesFilter && countriesFilter.length > 0;
                      return (
                        <button
                          key={item.country}
                          onClick={() => onCountryFilterClick?.(item.country)}
                          className="flex items-center gap-2 w-full hover:opacity-70 transition-opacity cursor-pointer"
                          title={`Filter by ${item.country}`}
                        >
                          <div className="flex-1 flex items-center gap-2">
                            <span className={`text-xs min-w-[90px] text-left transition-colors ${
                              isActive ? 'text-black font-medium' : (hasFilter ? 'text-black opacity-40' : 'text-black')
                            }`}>{item.country}</span>
                            <div className="flex-1 bg-gray-100 rounded-full overflow-hidden h-1.5">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${
                                  isActive ? 'bg-[#F3CB06]' : (hasFilter ? 'bg-[#F3CB06] opacity-30' : 'bg-[#F3CB06]')
                                }`}
                                style={{ width: `${fillPercentage}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs text-gray-500 min-w-[20px] text-right ${
                              hasFilter && !isActive ? 'opacity-40' : ''
                            }`}>{item.count}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Match Score Distribution */}
            <div className="flex-shrink-0 flex flex-col items-start" style={{ width: '140px' }}>
              <p className="text-xs text-gray-400 mb-2">Match Score Distribution</p>
              <div className="flex items-start gap-4">
                <div 
                  style={{ width: '120px', height: '60px', minWidth: '120px', minHeight: '60px' }}
                  className="cursor-pointer"
                >
                  <ResponsiveContainer width={120} height={60}>
                    <BarChart
                      data={[
                        { name: '90+', value: activeCandidates.filter(c => c.primaryGroup.matchScore !== null && c.primaryGroup.matchScore >= 90).length, range: '90-100' },
                        { name: '80-89', value: activeCandidates.filter(c => c.primaryGroup.matchScore !== null && c.primaryGroup.matchScore >= 80 && c.primaryGroup.matchScore < 90).length, range: '80-89' },
                        { name: '70-79', value: activeCandidates.filter(c => c.primaryGroup.matchScore !== null && c.primaryGroup.matchScore >= 70 && c.primaryGroup.matchScore < 80).length, range: '70-79' },
                        { name: '0-70', value: activeCandidates.filter(c => c.primaryGroup.matchScore !== null && c.primaryGroup.matchScore < 70).length, range: '0-69' },
                      ]}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      onClick={(data) => {
                        if (data && data.activePayload && data.activePayload[0]) {
                          const range = data.activePayload[0].payload.range;
                          onMatchRangeFilterClick?.(range);
                        }
                      }}
                    >
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 9, fill: '#9CA3AF' }}
                        axisLine={false}
                        tickLine={false}
                        height={15}
                        stroke="none"
                      />
                      <YAxis hide={true} />
                      <Bar 
                        dataKey="value" 
                        radius={[3, 3, 0, 0]} 
                        isAnimationActive={false}
                        stroke="none"
                        strokeWidth={0}
                        cursor="pointer"
                      >
                        {[
                          { index: 0, range: '90-100', color: '#10B981' },
                          { index: 1, range: '80-89', color: '#F3CB06' },
                          { index: 2, range: '70-79', color: '#F59E0B' },
                          { index: 3, range: '0-69', color: '#EF4444' }
                        ].map(({ index, range, color }) => {
                          const isActive = matchFilter === range;
                          const hasFilter = matchFilter && matchFilter !== 'all';
                          return (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={color}
                              opacity={!hasFilter || isActive ? 1 : 0.3}
                              stroke="none"
                              strokeWidth={0}
                            />
                          );
                        })}
                      </Bar>
                      <Tooltip 
                        cursor={false}
                        content={<CustomTooltip />}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* 4. Leading Campaign */}
            {leadingCampaign && (
              <div className="flex-shrink-0 flex flex-col items-start" style={{ width: '200px' }}>
                <p className="text-xs text-gray-400 mb-2">Leading Campaign</p>
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-[#F3CB06]" />
                  <div className="flex flex-col">
                    <p className="text-sm text-black max-w-[180px] truncate">{leadingCampaign.campaign}</p>
                    <p className="text-xs text-gray-500">{leadingCampaign.count} candidate{leadingCampaign.count !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}