import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp, X } from 'lucide-react';
import type { Candidate } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { User } from 'lucide-react';

interface ExcitingNotificationProps {
  candidate: Candidate;
  onClose: () => void;
  onViewDetails: () => void;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

export function ExcitingNotification({ candidate, onClose, onViewDetails }: ExcitingNotificationProps) {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    // Generate confetti particles
    const particles: Confetti[] = [];
    const colors = ['#F3CB06', '#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1'];
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: -20,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3
      });
    }
    setConfetti(particles);

    // Auto dismiss after 10 seconds
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const matchScore = candidate.primaryGroup.matchScore ?? 0;
  const matchData = [
    { value: matchScore, fill: '#F3CB06' },
    { value: 100 - matchScore, fill: '#F5F5F5' }
  ];

  const getMatchLevel = (score: number) => {
    if (score >= 90) return { text: 'Excellent Match', emoji: '🌟' };
    if (score >= 75) return { text: 'Good Match', emoji: '✨' };
    if (score >= 60) return { text: 'Moderate Match', emoji: '⭐' };
    return { text: 'Needs Review', emoji: '📋' };
  };

  const matchLevel = getMatchLevel(matchScore);

  return (
    <AnimatePresence>
      {/* Confetti Container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: `${particle.x}vw`, 
              y: particle.y,
              rotate: particle.rotation,
              opacity: 1
            }}
            animate={{ 
              y: '100vh',
              rotate: particle.rotation + 720,
              opacity: [1, 1, 0.5, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              delay: particle.delay,
              ease: 'easeIn'
            }}
            className="absolute w-2 h-2 rounded-sm"
            style={{ backgroundColor: particle.color }}
          />
        ))}
      </div>

      {/* Notification */}
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-20 right-4 md:right-8 z-50 w-[570px] max-w-[calc(100vw-2rem)]"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden pointer-events-auto">
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 px-9 py-6 overflow-hidden">
            {/* Animated background circles */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-2xl"
            />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: 3,
                    ease: 'easeInOut'
                  }}
                >
                  <Sparkles size={36} className="text-white" strokeWidth={2.5} />
                </motion.div>
                <div>
                  <h3 className="text-white text-xl">New Candidate!</h3>
                  <p className="text-white/90 text-base">Just received via chatbot</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-7">
            {/* Candidate Info */}
            <div className="flex items-center gap-4 mb-6">
              {candidate.profileImage ? (
                <div className="w-18 h-18 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-yellow-400/30">
                  <img 
                    src={candidate.profileImage} 
                    alt={candidate.fullName} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ) : (
                <div className="w-18 h-18 rounded-full flex-shrink-0 ring-2 ring-yellow-400/30 bg-gray-100 flex items-center justify-center">
                  <User size={30} className="text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-black truncate text-xl">Mike Muadi</p>
                <p className="text-base text-gray-500 truncate">maudi_m@gmail.com</p>
              </div>
            </div>

            {/* Campaign */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 px-1">
              <TrendingUp size={21} />
              <span>Campaign: <span className="text-gray-700 text-base">{candidate.primaryGroup.name}</span></span>
            </div>

            {/* Action Button */}
            <button
              onClick={onViewDetails}
              className="w-full bg-black text-white py-3.5 rounded-lg hover:bg-gray-800 transition-colors text-base"
            >
              View Full Profile
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}