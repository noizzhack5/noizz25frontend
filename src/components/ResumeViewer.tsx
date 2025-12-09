import { X, FileText, Mail, Phone, CheckCircle } from 'lucide-react';
import type { Candidate } from '@/types';

interface ResumeViewerProps {
  candidate: Candidate;
  onClose: () => void;
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

export function ResumeViewer({ candidate, onClose }: ResumeViewerProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8" 
      style={{ pointerEvents: 'auto' }}
      onClick={onClose}
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
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors rounded"
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
                  <p className="text-gray-900">{candidate.age || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Citizenship</p>
                  <p className="text-gray-900">{candidate.citizenship || 'Not specified'}</p>
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
  );
}