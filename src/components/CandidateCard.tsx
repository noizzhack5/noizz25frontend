import { X, User, CheckCircle, XCircle, AlertCircle, Edit3, Eye, FileText, Phone, Mail, ChevronDown, ChevronUp, MessageSquare, UserCircle, Brain, Award, Bot, ThumbsUp, ThumbsDown, Play } from 'lucide-react';
import type { Candidate } from '@/types';
import { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { StatusBadge } from './StatusBadge';
import { ChatbotPreviewModal } from './ChatbotPreviewModal';
import { apiClient, ApiError } from '@/services/apiClient';

interface CandidateCardProps {
  candidate: Candidate;
  onClose: () => void;
  onStatusChange: (candidateId: string, newStatus: 'submitted' | 'bot_interview' | 'ready_for_recruit') => void;
  onRefresh?: () => void; // Optional callback to refresh the candidates list
}

const getJobTypeLabel = (jobType: string | null | undefined) => {
  if (!jobType) return '';
  const labels: Record<string, string> = {
    headquarters_staff: 'Headquarters Staff',
    training_instruction: 'Training/Instruction',
    sales: 'Sales',
    operational_worker: 'Operational Worker'
  };
  return labels[jobType] || jobType;
};

// Get initials from full name (e.g., "LENA ARO" -> "LA")
const getInitials = (name: string): string => {
  if (!name) return '';
  return name
    .split(' ')
    .map(n => n[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2); // Take first 2 letters
};

// Generate a consistent, beautiful color for avatar based on ID or name
const getAvatarColor = (id: string, name: string): { bg: string; text: string } => {
  const str = `${id}-${name}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Beautiful, modern color palette with good contrast
  const colors = [
    { bg: '#6366F1', text: '#FFFFFF' }, // Indigo
    { bg: '#8B5CF6', text: '#FFFFFF' }, // Purple
    { bg: '#EC4899', text: '#FFFFFF' }, // Pink
    { bg: '#EF4444', text: '#FFFFFF' }, // Red
    { bg: '#F59E0B', text: '#FFFFFF' }, // Amber
    { bg: '#10B981', text: '#FFFFFF' }, // Emerald
    { bg: '#06B6D4', text: '#FFFFFF' }, // Cyan
    { bg: '#3B82F6', text: '#FFFFFF' }, // Blue
    { bg: '#14B8A6', text: '#FFFFFF' }, // Teal
    { bg: '#F97316', text: '#FFFFFF' }, // Orange
    { bg: '#84CC16', text: '#FFFFFF' }, // Lime
    { bg: '#A855F7', text: '#FFFFFF' }, // Violet
    { bg: '#E11D48', text: '#FFFFFF' }, // Rose
    { bg: '#0EA5E9', text: '#FFFFFF' }, // Sky
    { bg: '#22C55E', text: '#FFFFFF' }, // Green
    { bg: '#F43F5E', text: '#FFFFFF' }, // Rose 2
  ];
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const getJobTypeParameters = (jobType: string): string[] => {
  const parameters: Record<string, string[]> = {
    headquarters_staff: [
      'Israeli origin',
      'Ability to travel to Israel',
      'European residency'
    ],
    training_instruction: [
      'Not an Israeli citizen',
      'European residency'
    ],
    sales: [
      'European residency',
      'Business experience',
      'Stable financial status'
    ],
    operational_worker: [
      'Age 25-50',
      'High availability',
      'Israeli living in Israel',
      'Driver\'s license',
      'Flexibility for long trips',
      'Owns a vehicle',
      'Motorcycle (advantage)',
      'Single (preferred)',
      'Reliable and hardworking'
    ]
  };
  return parameters[jobType] || [];
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    submitted: '#F59E0B',
    bot_interview: '#3B82F6',
    ready_for_recruit: '#10B981'
  };
  return colors[status] || '#6B7280';
};

const YesNoField = ({ value }: { value?: boolean | null | string }) => {
  if (value === undefined || value === null || value === '') {
    return <span className="text-red-500">Missing</span>;
  }
  return (
    <span className={value ? 'text-green-600' : 'text-red-600'}>
      {value ? 'Yes' : 'No'}
    </span>
  );
};

const DataField = ({ label, value, missing }: { label: string; value?: string | number | null; missing?: boolean }) => {
  const isMissing = missing || value === undefined || value === null || value === '';
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      {isMissing ? (
        <span className="text-red-500 text-sm">Missing</span>
      ) : (
        <span className="text-gray-900">{value}</span>
      )}
    </div>
  );
};

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  icon: Icon
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  icon?: any;
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    const newState = !isOpen;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };
  
  return (
    <div className="overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full py-3 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-400" />}
          <span className={`text-sm text-gray-700 ${isOpen ? 'font-bold' : ''}`}>{title}</span>
        </div>
        {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="py-4">
          {children}
        </div>
      )}
    </div>
  );
};

export function CandidateCard({ candidate, onClose, onStatusChange, onRefresh }: CandidateCardProps) {
  const [recruiterNotes, setRecruiterNotes] = useState(candidate.manualNotes || '');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [showBotConfirmation, setShowBotConfirmation] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [matchFeedback, setMatchFeedback] = useState<'like' | 'dislike' | null>(null);
  const [showNotesSaveButton, setShowNotesSaveButton] = useState(false);
  const [isStartingBot, setIsStartingBot] = useState(false);
  const [botError, setBotError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const statusColor = getStatusColor(candidate.status);
  
  // Calculate match percentage for pie chart
  const matchScore = candidate.primaryGroup.matchScore ?? 0;
  const matchData = [
    { value: matchScore, fill: '#000000' },
    { value: 100 - matchScore, fill: '#E5E7EB' }
  ];

  // Handle scroll to show/hide compact header with hysteresis to prevent bouncing
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        // Use hysteresis: different thresholds for showing vs hiding
        // This prevents the bounce caused by header height change affecting scroll position
        if (!isScrolled && scrollTop > 150) {
          setIsScrolled(true);
        } else if (isScrolled && scrollTop < 100) {
          setIsScrolled(false);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isScrolled]);

  const handleOpenCV = () => {
    if (candidate.cvUrl) {
      setShowCVModal(true);
    }
  };

  const handleAddNote = () => {
    // Expand the notes section first
    setNotesExpanded(true);
    // Then scroll and focus after a small delay to allow the section to expand
    setTimeout(() => {
      const notesSection = document.getElementById('recruiter-notes');
      if (notesSection) {
        notesSection.scrollIntoView({ behavior: 'smooth' });
        notesSection.focus();
      }
    }, 100);
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="fixed right-0 top-14 lg:top-[104px] bottom-0 bg-white shadow-2xl z-40 overflow-y-auto border border-gray-200 w-full sm:w-[90%] md:w-[600px] lg:w-[655px]" 
      style={{ borderBottomLeftRadius: '12px', borderTopLeftRadius: '12px' }}
    >
      {/* Sticky Header */}
      <div className={`sticky top-0 bg-white z-20 transition-all duration-300 ${isScrolled ? 'shadow-md py-4' : 'py-6'}`}>
        <div className="px-8 flex items-center justify-between">
          {/* Left side - Status Badge + Candidate Info (when scrolled) */}
          <div className="flex items-center gap-4">
            <StatusBadge status={candidate.status} />
            
            {isScrolled && (() => {
              const avatarColor = getAvatarColor(candidate.id, candidate.fullName);
              return (
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ 
                      backgroundColor: avatarColor.bg, 
                      color: avatarColor.text,
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      opacity: 0.5,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    {getInitials(candidate.fullName)}
                  </div>
                  <div>
                    <p className="text-sm text-black">{candidate.fullName}</p>
                    {candidate.fullNameHebrew && (
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'Arial, sans-serif' }}>{candidate.fullNameHebrew}</p>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddNote}
              className="p-2 hover:bg-gray-100 transition-colors rounded cursor-pointer"
              title="Add recruiter note"
            >
              <Edit3 size={20} className="text-gray-700" />
            </button>
            {candidate.cvUrl && (
              <button
                onClick={handleOpenCV}
                className="p-2 hover:bg-gray-100 transition-colors rounded cursor-pointer"
                title="Open CV/Resume"
              >
                <FileText size={20} className="text-gray-700" />
              </button>
            )}
            {candidate.status === 'ready_for_bot_interview' && (
              <button
                onClick={() => setShowBotConfirmation(true)}
                className="p-2 hover:bg-[#F3CB06] transition-colors rounded bg-[#F3CB06] cursor-pointer"
                title="Start Bot Interview"
              >
                <Bot size={20} className="text-black" strokeWidth={2} />
              </button>
            )}
            {candidate.status !== 'submitted' && candidate.status !== 'ready_for_bot_interview' && (
              <button
                onClick={() => setShowChatbotModal(true)}
                className="p-2 hover:bg-gray-100 transition-colors rounded cursor-pointer"
                title="View Chatbot Conversation"
              >
                <MessageSquare size={20} className="text-[#075E54]" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 transition-colors rounded cursor-pointer"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-12 py-6 space-y-6">
        {/* SECTION 1 - CANDIDATE PROFILE (Always visible) */}
        <div className="flex flex-col items-center space-y-1">
          {(() => {
            const avatarColor = getAvatarColor(candidate.id, candidate.fullName);
            return (
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-2xl"
                style={{ 
                  backgroundColor: avatarColor.bg, 
                  color: avatarColor.text,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  opacity: 0.5,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }}
              >
                {getInitials(candidate.fullName)}
              </div>
            );
          })()}
          <div className="text-center">
            <h2 className="text-black mb-0 font-medium">{candidate.fullName}</h2>
            {candidate.fullNameHebrew && (
              <p className="text-gray-600 mt-0" style={{ fontFamily: 'Arial, sans-serif' }}>{candidate.fullNameHebrew}</p>
            )}
          </div>
        </div>

        {/* SECTION 2 - CONTACT & DEMOGRAPHICS & JOB MATCH */}
        <div className="space-y-4">
          {/* Unified Candidate Overview Section */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-6">
            {/* Top Section: Personal & Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] md:gap-x-6 lg:gap-x-8 gap-y-3 md:gap-y-4">
              {/* Personal Info Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <UserCircle size={16} className="text-gray-400" />
                  <p className="text-xs uppercase tracking-wide text-gray-500">Personal Information</p>
                </div>
                <div className="space-y-2 pl-6">
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-gray-400 min-w-[70px]">Age</p>
                    {candidate.age ? (
                      <p className="text-sm text-black">{candidate.age} years</p>
                    ) : (
                      <p className="text-sm text-red-500">Missing</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-gray-400 min-w-[70px]">Citizenship</p>
                    {candidate.citizenship ? (
                      <p className="text-sm text-black">{candidate.citizenship}</p>
                    ) : (
                      <p className="text-sm text-red-500">Missing</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Info Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Mail size={16} className="text-gray-400" />
                  <p className="text-xs uppercase tracking-wide text-gray-500">Contact Information</p>
                </div>
                <div className="space-y-2 pl-6">
                  <div className="flex items-center gap-3">
                    <Phone size={14} className="text-gray-400" />
                    {candidate.phone ? (
                      <a 
                        href={`tel:${candidate.phone}`}
                        className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {candidate.phone}
                      </a>
                    ) : (
                      <span className="text-sm text-red-500">Missing</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-gray-400" />
                    {candidate.email ? (
                      <a 
                        href={`mailto:${candidate.email}`}
                        className="text-sm text-blue-600 hover:text-blue-700 transition-colors break-all"
                      >
                        {candidate.email}
                      </a>
                    ) : (
                      <span className="text-sm text-red-500">Missing</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Bottom Section: Job Type & Match Score */}
            {candidate.status !== 'ready_for_recruit' ? (
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-lg">
                  <Brain size={18} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Classified Job Type</p>
                    <p className="text-sm text-gray-500 mt-0.5">Pending Classification</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  {/* Left: Job Classification */}
                  <div className="flex-shrink-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1.5">Job Classification</p>
                    <p className="text-sm text-black">{getJobTypeLabel(candidate.jobType)}</p>
                  </div>

                  {/* Center: Match Score */}
                  <div className="flex items-center gap-4 flex-1 justify-center">
                    <div className="relative flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={matchData}
                            cx="50%"
                            cy="50%"
                            innerRadius={22}
                            outerRadius={30}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                          >
                            {matchData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={index === 0 ? (
                                  matchScore >= 90 ? '#10B981' :
                                  matchScore >= 80 ? '#F3CB06' :
                                  matchScore >= 70 ? '#F59E0B' :
                                  '#EF4444'
                                ) : '#E5E7EB'} 
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span 
                          className="text-base"
                          style={{
                            color: 
                              matchScore >= 90 ? '#10B981' :
                              matchScore >= 80 ? '#F3CB06' :
                              matchScore >= 70 ? '#F59E0B' :
                              '#EF4444'
                          }}
                        >
                          {matchScore}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Match Score</p>
                      <p 
                        className="text-sm"
                        style={{
                          color: 
                            matchScore >= 90 ? '#10B981' :
                            matchScore >= 80 ? '#F3CB06' :
                            matchScore >= 70 ? '#F59E0B' :
                            '#EF4444'
                        }}
                      >
                        {matchScore >= 90 && 'Excellent'}
                        {matchScore >= 80 && matchScore < 90 && 'Good'}
                        {matchScore >= 70 && matchScore < 80 && 'Moderate'}
                        {matchScore < 70 && 'Low'}
                      </p>
                    </div>
                  </div>

                  {/* Right: Match Effectiveness Feedback - Vertical */}
                  <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => setMatchFeedback(matchFeedback === 'like' ? null : 'like')}
                      className={`p-2 rounded-lg transition-all ${

                        matchFeedback === 'like'

                          ? 'bg-green-600 text-white'

                          : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'

                      }`}
                      title="Effective match"
                    >
                      <ThumbsUp size={16} strokeWidth={2} />
                    </button>
                    <button
                      onClick={() => setMatchFeedback(matchFeedback === 'dislike' ? null : 'dislike')}
                      className={`p-2 rounded-lg transition-all ${

                        matchFeedback === 'dislike'

                          ? 'bg-red-600 text-white'

                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'

                      }`}
                      title="Ineffective match"
                    >
                      <ThumbsDown size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Match Score Explanation - Collapsible */}
        {candidate.status !== 'submitted' && candidate.classExplain && (
          <CollapsibleSection title="Match Score Explanation" defaultOpen={false}>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {candidate.classExplain}
              </p>
            </div>
          </CollapsibleSection>
        )}

        {/* SECTION 4 - CANDIDATE DATA OUTPUT */}
        <CollapsibleSection title="Candidate Profile Data" defaultOpen={false}>
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-xs text-gray-500 mb-3">Personal Information</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-4 sm:gap-x-[30px] gap-y-3">
                  <DataField label="Full Name" value={candidate.fullName} />
                  <DataField label="Full Name (Hebrew)" value={candidate.fullNameHebrew} missing={!candidate.fullNameHebrew} />
                  <DataField label="Age" value={candidate.age} missing={!candidate.age} />
                  <DataField label="Citizenship" value={candidate.citizenship} missing={!candidate.citizenship} />
                </div>
              </div>
            </div>

            {/* Travel & Location */}
            <div className="pt-4">
              <h4 className="text-xs text-gray-500 mb-3">Travel & Location</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Can travel in/to Europe</p>
                  <YesNoField value={candidate.canTravelEurope} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Can travel to Israel</p>
                  <YesNoField value={candidate.canTravelIsrael} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Do they live actually in Europe</p>
                  <YesNoField value={candidate.livesInEurope} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Are they native Israeli</p>
                  <YesNoField value={candidate.nativeIsraeli} />
                </div>
              </div>
            </div>

            {/* Skills & Language */}
            <div className="pt-4">
              <h4 className="text-xs text-gray-500 mb-3">Skills & Language</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Does the candidate speak good English</p>
                  <YesNoField value={candidate.speaksEnglish} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Do they remember the position they applied for</p>
                  <YesNoField value={candidate.remembersPosition} />
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* SECTION 5 - NOTES & AI INSIGHTS */}
        <CollapsibleSection title="Notes & AI Insights" defaultOpen={false} isOpen={notesExpanded} onToggle={setNotesExpanded}>
          <div className="space-y-4">
            {/* Candidate Notes */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={16} className="text-gray-400" />
                <h4 className="text-xs text-gray-500">Candidate Notes</h4>
              </div>
              <p className="text-sm text-gray-900 leading-relaxed">
                {candidate.notes || 'No notes from candidate'}
              </p>
            </div>

            {/* Recruiter Notes - Editable */}
            <div className="pt-3">
              <div className="flex items-center gap-2 mb-2">
                <UserCircle size={16} className="text-gray-400" />
                <h4 className="text-xs text-gray-500">Recruiter Notes</h4>
              </div>
              <textarea
                id="recruiter-notes"
                value={recruiterNotes}
                onChange={(e) => {
                  setRecruiterNotes(e.target.value);
                  // Show save button if there's a change from original
                  setShowNotesSaveButton(e.target.value !== (candidate.manualNotes || ''));
                }}
                placeholder="Add your notes about this candidate..."
                className="w-full min-h-[80px] p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors resize-none text-sm"
              />
              {showNotesSaveButton && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => {
                      // Here you would save the notes
                      setShowNotesSaveButton(false);
                      // Show success message
                      console.log('Notes saved:', recruiterNotes);
                    }}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm transition-colors"
                  >
                    Save Notes
                  </button>
                </div>
              )}
            </div>

            {/* AI-Identified Skills */}
            {candidate.status !== 'submitted' && (
              <div className="pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <Brain size={16} className="text-gray-400" />
                  <h4 className="text-xs text-gray-500">AI-Identified Skills</h4>
                </div>
                <p className="text-sm text-gray-900 leading-relaxed">
                  {candidate.aiSkillsSummary}
                </p>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Bot Conversation Button - Only for 'ready_for_bot_interview' status and not started */}
        {candidate.status === 'ready_for_bot_interview' && !conversationStarted && (
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setShowBotConfirmation(true)}
              className="bg-[#F3CB06] text-black py-2 px-5 rounded-lg hover:bg-[#d4b305] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare size={18} />
              <span>Start bot conversation</span>
            </button>
          </div>
        )}
      </div>

      {/* Bot Conversation Confirmation Modal */}
      {showBotConfirmation && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8" 
          style={{ pointerEvents: 'auto' }}
          onClick={() => setShowBotConfirmation(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-md w-full" 
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F3CB06] rounded-full flex items-center justify-center">
                  <MessageSquare size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="text-black">Are you sure?</h3>
                </div>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="px-8 py-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                This will initiate a new WhatsApp bot conversation with <strong>{candidate.fullName}</strong>.
              </p>
              {botError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{botError}</p>
                </div>
              )}
            </div>
            
            {/* Modal Actions */}
            <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowBotConfirmation(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setIsStartingBot(true);
                  setBotError(null);
                  
                  // Close modal after 2 seconds
                  const closeTimer = setTimeout(() => {
                    setShowBotConfirmation(false);
                  }, 2000);
                  
                  try {
                    // Call the API to trigger bot processor with candidate ID
                    // The server will handle status updates - client should not update status
                    await apiClient.triggerBotProcessor(candidate.id);
                    // Refresh candidates list to get updated status from server
                    if (onRefresh) {
                      onRefresh();
                    }
                    setConversationStarted(true);
                    // Clear the timer if we close manually before 2 seconds
                    clearTimeout(closeTimer);
                    setShowBotConfirmation(false);
                  } catch (error) {
                    const message = error instanceof ApiError 
                      ? error.message 
                      : 'Failed to start bot conversation';
                    setBotError(message);
                    console.error('Error starting bot conversation:', error);
                    // Clear the timer on error so modal stays open to show error
                    clearTimeout(closeTimer);
                  } finally {
                    setIsStartingBot(false);
                  }
                }}
                disabled={isStartingBot}
                className="px-5 py-2 bg-[#F3CB06] text-black rounded-lg hover:bg-[#d4b305] transition-colors text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isStartingBot ? 'Starting...' : "Yes I'm sure"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CV Modal */}
      {showCVModal && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8" 
          style={{ pointerEvents: 'auto' }}
          onClick={() => setShowCVModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" 
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-gray-700" />
                <div>
                  <h3 className="text-black">Curriculum Vitae</h3>
                  <p className="text-sm text-gray-500 mt-0">{candidate.fullName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowCVModal(false)}
                className="p-2 hover:bg-gray-100 transition-colors rounded cursor-pointer"
              >
                <X size={20} className="text-gray-700" />
              </button>
            </div>
            
            {/* CV Content - Scrollable */}
            <div className="overflow-y-auto px-12 py-8" style={{ backgroundColor: '#f9fafb' }}>
              <div className="bg-white shadow-sm rounded-lg p-10 max-w-3xl mx-auto">
                {/* CV Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                  <h1 className="text-3xl text-black mb-2">{candidate.fullName}</h1>
                  {candidate.fullNameHebrew && (
                    <p className="text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>{candidate.fullNameHebrew}</p>
                  )}
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>{candidate.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-8">
                  <h2 className="text-xl text-black mb-4 pb-2 border-b border-gray-300">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Age</p>
                      {candidate.age ? (
                        <p className="text-gray-900">{candidate.age}</p>
                      ) : (
                        <p className="text-red-500">Missing</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Citizenship</p>
                      {candidate.citizenship ? (
                        <p className="text-gray-900">{candidate.citizenship}</p>
                      ) : (
                        <p className="text-red-500">Missing</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-8">
                  <h2 className="text-xl text-black mb-4 pb-2 border-b border-gray-300">Professional Summary</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {candidate.aiSkillsSummary}
                  </p>
                </div>

                {/* Work Experience */}
                <div className="mb-8">
                  <h2 className="text-xl text-black mb-4 pb-2 border-b border-gray-300">Work Experience</h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-base text-black">Senior {getJobTypeLabel(candidate.jobType)}</h3>
                          <p className="text-sm text-gray-600">Previous Company Ltd.</p>
                        </div>
                        <p className="text-sm text-gray-500">2020 - 2024</p>
                      </div>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                        <li>Led strategic initiatives resulting in significant business growth</li>
                        <li>Collaborated with international teams across multiple time zones</li>
                        <li>Developed and implemented innovative solutions to complex challenges</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-base text-black">{getJobTypeLabel(candidate.jobType)}</h3>
                          <p className="text-sm text-gray-600">Former Employer Inc.</p>
                        </div>
                        <p className="text-sm text-gray-500">2017 - 2020</p>
                      </div>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                        <li>Managed cross-functional projects and deliverables</li>
                        <li>Contributed to team success through effective communication</li>
                        <li>Demonstrated adaptability in fast-paced environment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mb-8">
                  <h2 className="text-xl text-black mb-4 pb-2 border-b border-gray-300">Education</h2>
                  <div>
                    <h3 className="text-base text-black mb-1">Bachelor of Science in Business Administration</h3>
                    <p className="text-sm text-gray-600">University of {candidate.citizenship || 'International Studies'}</p>
                    <p className="text-sm text-gray-500">Graduated 2017</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h2 className="text-xl text-black mb-4 pb-2 border-b border-gray-300">Skills & Competencies</h2>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-gray-700">Excellent Communication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-gray-700">Team Leadership</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-gray-700">Project Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-gray-700">Strategic Planning</span>
                    </div>
                    {candidate.speaksEnglish && (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-gray-700">Fluent English</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-gray-700">Problem Solving</span>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-8">
                  <h2 className="text-xl text-black mb-4 pb-2 border-b border-gray-300">Languages</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Hebrew</span>
                      <span className="text-gray-500">Native</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">English</span>
                      <span className="text-gray-500">{candidate.speaksEnglish ? 'Fluent' : 'Intermediate'}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {candidate.notes && (
                  <div>
                    <h2 className="text-xl text-black mb-4 pb-2 border-b border-gray-300">Additional Information</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {candidate.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Conversation Modal */}
      {showChatbotModal && (
        <ChatbotPreviewModal
          candidate={candidate}
          onClose={() => setShowChatbotModal(false)}
        />
      )}
    </div>
  );
}