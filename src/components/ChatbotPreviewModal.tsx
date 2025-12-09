import { X, Bot, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Candidate } from '@/types';
import { useState } from 'react';

interface ChatbotPreviewModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export function ChatbotPreviewModal({ candidate, onClose }: ChatbotPreviewModalProps) {
  // Extract conversation data from candidate's bot conversation
  const messages = candidate.botConversation?.messages || [];
  const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header - WhatsApp style */}
        <div className="bg-[#075E54] text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
              <img 
                src={candidate.profileImage || 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDk4Mjc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'} 
                alt={candidate.fullName} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <p className="font-medium">{candidate.fullName}</p>
              <p className="text-xs text-white/80">WhatsApp Conversation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#E5DDD5] space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Bot size={48} className="mx-auto mb-2 text-gray-400" />
              <p>No conversation available</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 ${
                    message.sender === 'bot'
                      ? 'bg-[#DCF8C6] text-gray-800'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  {/* Sender indicator */}
                  <div className="flex items-center gap-1 mb-1">
                    {message.sender === 'bot' ? (
                      <Bot size={12} className="text-[#075E54]" />
                    ) : (
                      <User size={12} className="text-[#128C7E]" />
                    )}
                    <span className="text-xs text-gray-500">
                      {message.sender === 'bot' ? 'Talently Bot' : candidate.fullName}
                    </span>
                  </div>
                  
                  {/* Message text */}
                  <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                  
                  {/* Timestamp */}
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - WhatsApp style with Feedback */}
        <div className="rounded-b-lg border-t border-gray-200">
          <div className="px-4 py-3 flex items-center gap-2 text-gray-500 text-sm border-b border-gray-200 bg-[#F0F0F0]">
            <Bot size={16} />
            <span>Conversation completed on {candidate.botConversation?.completedAt 
              ? new Date(candidate.botConversation.completedAt).toLocaleDateString()
              : 'N/A'}
            </span>
          </div>
          
          {/* Feedback Section */}
          <div className="px-4 py-3 bg-white rounded-b-lg">
            <p className="text-xs text-gray-600 mb-2">Was this conversation effective?</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFeedback('good')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all ${
                  feedback === 'good' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-green-50 hover:border-green-300'
                }`}
              >
                <ThumbsUp size={14} />
                <span className="text-xs">Yes</span>
              </button>
              <button
                onClick={() => setFeedback('bad')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all ${
                  feedback === 'bad' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-red-50 hover:border-red-300'
                }`}
              >
                <ThumbsDown size={14} />
                <span className="text-xs">No</span>
              </button>
            </div>
            {feedback && (
              <p className="text-xs text-gray-500 mt-2">
                {feedback === 'good' ? '✓ Thank you for your feedback!' : '✓ Feedback recorded. We\'ll improve our bot.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}