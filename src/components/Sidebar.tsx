import { Home, LogOut, UserMinus } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/store/authStore';

export function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {/* Sidebar - Hidden on mobile, visible on lg and up */}
      <div
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[72px] bg-black border-r border-gray-800 flex-col items-center py-6 z-30"
      >
        {/* User Profile at Top */}
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-700 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
            alt="Admin User" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 space-y-3">
          <div className="relative">
            <NavLink
              to="/"
              onMouseEnter={() => setHoveredItem('home')}
              onMouseLeave={() => setHoveredItem(null)}
              className={({ isActive }) =>
                `w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-[#F3CB06]'
                    : 'hover:bg-gray-800 text-gray-400'
                }`
              }
              title="Home"
            >
              <Home size={20} />
            </NavLink>
            {hoveredItem === 'home' && (
              <div className="absolute left-14 top-0 bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap z-50 ml-2">
                Home
              </div>
            )}
          </div>

          <div className="relative">
            <NavLink
              to="/deleted"
              onMouseEnter={() => setHoveredItem('deleted')}
              onMouseLeave={() => setHoveredItem(null)}
              className={({ isActive }) =>
                `w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-[#F3CB06]'
                    : 'hover:bg-gray-800 text-gray-400'
                }`
              }
              title="Deleted Candidates"
            >
              <UserMinus size={20} />
            </NavLink>
            {hoveredItem === 'deleted' && (
              <div className="absolute left-14 top-0 bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap z-50 ml-2">
                Deleted Candidates
              </div>
            )}
          </div>
        </nav>

        {/* Logout at Bottom */}
        <div className="relative">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            onMouseEnter={() => setHoveredItem('logout')}
            onMouseLeave={() => setHoveredItem(null)}
            className="w-12 h-12 flex items-center justify-center hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
          {hoveredItem === 'logout' && (
            <div className="absolute left-14 bottom-0 bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap z-50 ml-2">
              Logout
            </div>
          )}
        </div>
      </div>
    </>
  );
}