import { X, CheckCircle, User, Briefcase, TrendingUp, ArrowRight, FileText, Sparkles, Award, Target } from 'lucide-react';
import { motion } from 'motion/react';
import type { Candidate } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CandidateAddedModalProps {
  candidate: Candidate;
  onClose: () => void;
  onViewDetails: () => void;
}

const getJobTypeLabel = (jobType: string) => {
  const labels: Record<string, string> = {
    headquarters_staff: 'Headquarters Staff',
    training_instruction: 'Training/Instruction',
    sales: 'Sales',
    operational_worker: 'Operational Worker'
  };
  return labels[jobType] || jobType;
};


export function CandidateAddedModal({ candidate, onClose, onViewDetails }: CandidateAddedModalProps) {
  const matchScore = candidate.primaryGroup.matchScore ?? 0;
  const matchData = [
    { value: matchScore, fill: '#F3CB06' },
    { value: 100 - matchScore, fill: '#F5F5F5' }
  ];

  const getMatchLevel = (score: number) => {
    if (score >= 90) return { text: 'Excellent Match', color: '#10B981', icon: '🌟' };
    if (score >= 75) return { text: 'Good Match', color: '#3B82F6', icon: '✨' };
    if (score >= 60) return { text: 'Moderate Match', color: '#F59E0B', icon: '⭐' };
    return { text: 'Needs Review', color: '#EF4444', icon: '📋' };
  };

  const matchLevel = getMatchLevel(matchScore);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 transition-colors rounded-full z-20"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Header with animated background */}
        <div className="relative px-8 py-10 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-yellow-50/30">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-400/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            {/* Success Icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.1, 
                type: 'spring', 
                stiffness: 200,
                damping: 15
              }}
              className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-yellow-400/20"
            >
              <Sparkles size={28} className="text-white" strokeWidth={2.5} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl text-black mb-2">
                New Candidate Received!
              </h2>
              <p className="text-gray-500">
                AI analysis complete • {candidate.fullName} added to pipeline
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {/* Match Score Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative mb-8 p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200/50 overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full blur-2xl"></div>
            </div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Large circular match score */}
                <div className="relative flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={matchData}
                        cx="50%"
                        cy="50%"
                        innerRadius={28}
                        outerRadius={40}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                      >
                        {matchData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl text-black">
                        {matchScore}
                      </p>
                      <p className="text-xs text-gray-500 -mt-1">%</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{matchLevel.icon}</span>
                    <p className="text-lg" style={{ color: matchLevel.color }}>
                      {matchLevel.text}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    AI-powered compatibility score
                  </p>
                </div>
              </div>

              <div className="hidden md:block">
                <Target size={40} className="text-yellow-400/30" />
              </div>
            </div>
          </motion.div>

          {/* Candidate Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                {(() => {
                  const avatarColor = getAvatarColor(candidate.id, candidate.fullName);
                  return (
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 ring-2 ring-gray-200"
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
                  );
                })()}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-black truncate">{candidate.fullName}</p>
                  {candidate.fullNameHebrew && (
                    <p className="text-xs text-gray-500 truncate" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {candidate.fullNameHebrew}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <User size={12} />
                <span>{candidate.age ? `${candidate.age} years` : 'Age N/A'}</span>
                {candidate.citizenship && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="truncate">{candidate.citizenship}</span>
                  </>
                )}
              </div>
            </motion.div>

            {/* Job Type Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-5 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Position</p>
                  <p className="text-sm text-black truncate">{getJobTypeLabel(candidate.jobType)}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Campaign Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8 px-1"
          >
            <FileText size={16} />
            <span>Campaign: <span className="text-gray-700">{candidate.primaryGroup.name}</span></span>
            <span className="text-gray-300 mx-1">•</span>
            <span className="text-gray-400">Just now</span>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={onViewDetails}
              className="flex-1 bg-black text-white px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/10"
            >
              <span>View Full Profile</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={onClose}
              className="px-6 py-3.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-gray-700"
            >
              Dismiss
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}