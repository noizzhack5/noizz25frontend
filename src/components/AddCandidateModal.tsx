import { X, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Candidate } from '@/types';

interface AddCandidateModalProps {
  onClose: () => void;
  onAdd: (candidate: Omit<Candidate, 'id'>) => void;
}

export function AddCandidateModal({ onClose, onAdd }: AddCandidateModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    campaignSource: '',
    jobType: 'headquarters_staff' as const,
    status: 'submitted' as const,
    notes: ''
  });

  // Add escape key listener
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCandidate: Omit<Candidate, 'id'> = {
      ...formData,
      statusHistory: [
        {
          status: formData.status,
          timestamp: new Date(),
          note: 'Candidate manually added'
        }
      ],
      primaryGroup: {
        groupName: 'Pending Classification',
        matchScore: 0
      },
      alternativeGroups: [],
      matchedParameters: [],
      aiSkillsSummary: 'Awaiting CV analysis',
      additionalInfo: [],
      createdAt: new Date()
    };

    onAdd(newCandidate);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" 
        onClick={onClose}
      >
        <div 
          className="bg-white w-full max-w-2xl shadow-2xl rounded-xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between rounded-t-xl">
            <h2 className="text-black">Add New Candidate</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 transition-colors rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-4 space-y-4">
            {/* Personal Information */}
            <div>
              <h3 className="text-black mb-3">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors text-sm"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors text-sm"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors text-sm"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Information */}
            <div>
              <h3 className="text-black mb-3">Campaign Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Campaign Source
                  </label>
                  <select
                    name="campaignSource"
                    value={formData.campaignSource}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors text-sm"
                  >
                    <option value="">Select campaign source</option>
                    <option value="LinkedIn Campaign Q4">LinkedIn Campaign Q4</option>
                    <option value="Facebook Tech Jobs">Facebook Tech Jobs</option>
                    <option value="X (Twitter) Tech Hiring">X (Twitter) Tech Hiring</option>
                    <option value="Indeed Job Board">Indeed Job Board</option>
                    <option value="Direct Application">Direct Application</option>
                    <option value="Employee Referral">Employee Referral</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <h3 className="text-black mb-3">CV Upload</h3>
              <div className="border-2 border-dashed border-gray-300 rounded p-5 text-center hover:border-black transition-colors cursor-pointer">
                <Upload className="mx-auto mb-2 text-gray-400" size={28} />
                <p className="text-sm text-gray-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX (max. 10MB)
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-black mb-3">Notes</h3>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors resize-none text-sm min-h-[85px]"
                placeholder="Add any initial notes or observations..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-3 border-t border-gray-200">
              <button
                type="submit"
                className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 transition-colors rounded text-sm"
              >
                Add Candidate
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 hover:border-black transition-colors rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}