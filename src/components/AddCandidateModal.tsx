import { X, Upload } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { Candidate } from '@/types';

interface AddCandidateModalProps {
  onClose: () => void;
  onAdd: (candidate: Omit<Candidate, 'id'>, file?: File) => void | Promise<void>;
}

export function AddCandidateModal({ onClose, onAdd }: AddCandidateModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    campaignSource: '',
    jobType: 'headquarters_staff' as const,
    status: 'submitted' as const,
    notes: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    const newCandidate: Omit<Candidate, 'id'> = {
      ...formData,
      cvUrl: selectedFile ? URL.createObjectURL(selectedFile) : '',
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

    try {
      await onAdd(newCandidate, selectedFile || undefined);
      onClose();
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Error adding candidate:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <>
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" 
        onClick={onClose}
      >
        <div 
          className="bg-white w-full max-w-2xl max-h-[90vh] shadow-2xl rounded-xl pointer-events-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between rounded-t-xl z-10 flex-shrink-0">
            <h2 className="text-black">Add New Candidate</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 transition-colors rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form - Scrollable */}
          <form onSubmit={handleSubmit} className="px-8 py-4 space-y-4 overflow-y-auto flex-1">
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
              <div 
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded p-5 text-center transition-colors cursor-pointer ${
                  isDragging 
                    ? 'border-black bg-gray-50' 
                    : selectedFile 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                <Upload className="mx-auto mb-2 text-gray-400" size={28} />
                {selectedFile ? (
                  <>
                    <p className="text-sm text-green-600 mb-1 font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Click to change file
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX (max. 10MB)
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
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
          </form>

          {/* Actions - Fixed at bottom */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={handleSubmit}
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
        </div>
      </div>
    </>
  );
}