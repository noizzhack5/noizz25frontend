import { UserPlus, FileSpreadsheet, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import logoImage from '@/assets/5c8f1f210ee22a18715f4be50e287b6e0d3e6371.png';

interface HeaderProps {
  onAddCandidate?: () => void;
  onImportExcel?: () => void;
  showActionBoard?: boolean;
  onToggleActionBoard?: () => void;
  onSimulateChatbot?: () => void;
  onLogoClick?: () => void;
}

export function Header({ onAddCandidate, onImportExcel, showActionBoard, onToggleActionBoard, onSimulateChatbot, onLogoClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 flex items-center z-20 lg:pl-[104px]">
      {/* Left: Title */}
      <div className="flex items-center flex-1">
        <button 
          onClick={onLogoClick}
          className="hover:opacity-80 transition-opacity cursor-pointer"
          title="Refresh Dashboard"
        >
          <img src={logoImage} alt="Talently Logo" className="h-6 md:h-8" />
        </button>
      </div>
      
      {/* Right: Action Buttons */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Hidden trigger button - white/transparent, left of dashboard toggle */}
        {onSimulateChatbot && onToggleActionBoard && (
          <button
            onClick={onSimulateChatbot}
            className="w-8 h-8 hover:bg-gray-50 transition-colors rounded opacity-0 hover:opacity-100 cursor-pointer"
            title="Trigger notification"
          >
          </button>
        )}
        {onToggleActionBoard && (
          <button
            onClick={onToggleActionBoard}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 hover:bg-gray-100 transition-colors rounded cursor-pointer"
            title="Toggle Dashboard"
          >
            <BarChart3 size={18} className="text-gray-700" />
            <span className="hidden sm:inline">{showActionBoard ? <ChevronUp size={16} className="text-gray-700" /> : <ChevronDown size={16} className="text-gray-700" />}</span>
          </button>
        )}
        {onAddCandidate && (
          <button
            onClick={onAddCandidate}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 bg-white text-black border border-[#F3CB06] hover:bg-[#FFFACD] transition-colors rounded text-sm cursor-pointer"
            title="Add Candidate"
          >
            <UserPlus size={16} />
            <span className="hidden sm:inline">Add Candidate</span>
          </button>
        )}
        {onImportExcel && (
          <button
            onClick={onImportExcel}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 bg-[#F3CB06] text-black hover:bg-[#d4b005] transition-colors rounded text-sm cursor-pointer"
            title="Import Excel"
          >
            <FileSpreadsheet size={16} />
            <span className="hidden sm:inline">Import Excel</span>
          </button>
        )}
      </div>
    </header>
  );
}