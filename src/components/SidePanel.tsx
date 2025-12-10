import { X, Phone, Mail, Download, MessageCircle, Calendar, ChevronDown, ChevronUp, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { StatusBadge } from './StatusBadge';
import type { Candidate, Status } from '@/types';

interface SidePanelProps {
  candidate: Candidate;
  onClose: () => void;
  onUpdate: (candidate: Candidate) => void;
}

export function SidePanel({ candidate, onClose, onUpdate }: SidePanelProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(candidate.notes);
  const [showAlternativeGroups, setShowAlternativeGroups] = useState(false);

  const handleStatusChange = (newStatus: Status | string) => {
    const updatedCandidate: Candidate = {
      ...candidate,
      status: newStatus,
      statusHistory: [
        ...candidate.statusHistory,
        {
          status: newStatus,
          timestamp: new Date(),
          note: `Status changed to ${newStatus}`
        }
      ]
    };
    onUpdate(updatedCandidate);
  };

  const handleSaveNotes = () => {
    onUpdate({ ...candidate, notes });
    setIsEditingNotes(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (id: string, name: string): { bg: string; text: string } => {
    const str = `${id}-${name}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      { bg: '#6366F1', text: '#FFFFFF' },
      { bg: '#8B5CF6', text: '#FFFFFF' },
      { bg: '#EC4899', text: '#FFFFFF' },
      { bg: '#EF4444', text: '#FFFFFF' },
      { bg: '#F59E0B', text: '#FFFFFF' },
      { bg: '#10B981', text: '#FFFFFF' },
      { bg: '#06B6D4', text: '#FFFFFF' },
      { bg: '#3B82F6', text: '#FFFFFF' },
      { bg: '#14B8A6', text: '#FFFFFF' },
      { bg: '#F97316', text: '#FFFFFF' },
      { bg: '#84CC16', text: '#FFFFFF' },
      { bg: '#A855F7', text: '#FFFFFF' },
      { bg: '#E11D48', text: '#FFFFFF' },
      { bg: '#0EA5E9', text: '#FFFFFF' },
      { bg: '#22C55E', text: '#FFFFFF' },
      { bg: '#F43F5E', text: '#FFFFFF' },
    ];
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            {(() => {
              const avatarColor = getAvatarColor(candidate.id, candidate.fullName);
              return (
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl"
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
            <div>
              <h2 className="text-black mb-2">{candidate.fullName}</h2>
              <div className="flex flex-col gap-1">
                <a
                  href={`tel:${candidate.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
                >
                  <Phone size={14} />
                  {candidate.phone}
                </a>
                <a
                  href={`mailto:${candidate.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
                >
                  <Mail size={14} />
                  {candidate.email}
                </a>
              </div>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-gray-100 text-sm text-gray-700">
                  {candidate.campaignSource}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-8">
          {/* Warnings */}
          {candidate.warnings && candidate.warnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 p-4">
              <div className="flex items-start gap-2">
                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 mb-1">Warnings</p>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {candidate.warnings.map((warning, idx) => (
                      <li key={idx}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Status Section */}
          <div>
            <h3 className="text-black mb-3">Current Status</h3>
            <div className="mb-3">
              <StatusBadge status={candidate.status} />
            </div>
            <select
              value={candidate.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            >
              <option value="submitted">Submitted</option>
              <option value="bot_interview">Bot Interview</option>
              <option value="ready_for_recruit">Ready for Recruit</option>
            </select>

            {/* Status History */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-3">Status History</p>
              <div className="space-y-3">
                {candidate.statusHistory.map((history, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      {idx < candidate.statusHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm text-black">{history.status}</p>
                      <p className="text-xs text-gray-500">{formatDate(history.timestamp)}</p>
                      {history.note && (
                        <p className="text-xs text-gray-600 mt-1">{history.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Matching Details */}
          <div>
            <h3 className="text-black mb-3">Matching Details</h3>
            <div className="bg-gray-50 p-4 border border-gray-200 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-black">{candidate.primaryGroup.groupName}</p>
                {candidate.primaryGroup.matchScore !== null ? (
                  <p className="text-black">{candidate.primaryGroup.matchScore}%</p>
                ) : (
                  <p className="text-gray-400">-</p>
                )}
              </div>
              <div className="w-full bg-gray-200 h-2 overflow-hidden">
                {candidate.primaryGroup.matchScore !== null && (
                  <div
                    className="bg-black h-full transition-all"
                    style={{ width: `${candidate.primaryGroup.matchScore}%` }}
                  />
                )}
              </div>
            </div>

            {/* Matched Parameters */}
            <div className="grid grid-cols-2 gap-2">
              {candidate.matchedParameters.map((param, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-3 py-2 text-sm ${
                    param.matched
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {param.matched ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <div className="w-3.5 h-3.5 border border-gray-400 rounded-full" />
                  )}
                  {param.name}
                </div>
              ))}
            </div>

            {/* Alternative Groups */}
            {candidate.alternativeGroups.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setShowAlternativeGroups(!showAlternativeGroups)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black cursor-pointer"
                >
                  {showAlternativeGroups ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  Show Alternative Group Matches
                </button>
                {showAlternativeGroups && (
                  <div className="mt-3 space-y-2">
                    {candidate.alternativeGroups.map((group, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 border border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-black">{group.groupName}</p>
                          <p className="text-sm text-gray-600">{group.matchScore}%</p>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 overflow-hidden">
                          <div
                            className="bg-gray-400 h-full"
                            style={{ width: `${group.matchScore}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* AI Skills Summary */}
          <div>
            <h3 className="text-black mb-3">AI Skills Summary</h3>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{candidate.aiSkillsSummary}</p>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-black mb-3">Additional Information</h3>
            <div className="space-y-3">
              {candidate.additionalInfo.map((info, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-3 last:border-0">
                  <p className="text-sm text-gray-600 mb-1">{info.question}</p>
                  <p className="text-sm text-black">{info.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-black mb-3">Recruiter Notes</h3>
            {isEditingNotes ? (
              <div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm min-h-[120px]"
                  placeholder="Add your notes here..."
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNotes(candidate.notes);
                      setIsEditingNotes(false);
                    }}
                    className="px-4 py-2 border border-gray-300 hover:border-black text-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {candidate.notes ? (
                  <div className="bg-gray-50 p-4 border border-gray-200 mb-3">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{candidate.notes}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 border border-gray-200 mb-3">
                    <p className="text-sm text-gray-500 italic">No notes added yet.</p>
                  </div>
                )}
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="text-sm text-gray-600 hover:text-black cursor-pointer"
                >
                  {candidate.notes ? 'Edit Notes' : 'Add Notes'}
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors">
              <MessageCircle size={18} />
              Send WhatsApp Message
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 hover:border-black transition-colors">
              <Calendar size={18} />
              Schedule Interview
            </button>
            {candidate.cvUrl && (
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 hover:border-black transition-colors">
                <Download size={18} />
                Download CV
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}