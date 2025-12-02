import { Code2, SearchIcon, BarChart3 } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';


export default function Header() {
  const { isDark } = useTheme();
  const { showLoader } = useLoading();
 const location = useLocation();

 const isActive = (path) => {
  if (path === '/') {
    return location.pathname === '/';
  }
  return location.pathname.startsWith(path);
 };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: null },
    { path: '/analytics', label: 'Analytics', icon: null },
     { path: '/reviews', label: 'Reviews', icon: null },
    { path: '/search', label: 'Search', icon: null },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b shadow-sm ${isDark ? 'bg-[#121212] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo and Brand Name */}
          <div className="flex items-center gap-1">
            {/* Logo Icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-lg">
              <Code2 size={24} className={`${isDark ? 'text-slate-50' : 'text-[#121212]'}`} />
            </div>

            {/* Brand Name */}
            <div>
                <Link to="/" onClick={() => showLoader()}>
                  <img src="/mergecode-logo.png" alt="logo" className="w-24 h-24 object-contain" />
                </Link>
            </div>
          </div>

          {/* Center: Navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                    ${isActive(link.path)
                      ? `${isDark ? 'dark:text-gray-100  bg-gray-800/90' : 'text-gray-900 bg-gray-800/20'}`
                      : `${isDark ? 'hover:bg-gray-700/40 text-gray-300' : 'hover:bg-gray-600/40 text-gray-700'}`
                    }
                  `}
                >
                  {Icon && <Icon size={16} />}
                  {link.label}
                </Link>
              );
            })}
          </nav>
          

          {/* Right Side: Theme Toggle & User Menu */}
          <div className="flex items-center gap-4">
             <div className={`p-2 rounded-full md:hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} >
                <Link to="/search" onClick={() => showLoader()} className={`text-md font-medium transition-colors ${!isDark ? 'hover:text-slate-50 text-slate-300' : 'text-gray-700 hover:text-gray-500'}`}>
                  <SearchIcon size={24} />
                </Link>
             </div>
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* User Avatar */}
            <button className={`flex items-center justify-center w-9 h-9 rounded-full hover:cursor-pointer transiton-all ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <Link to="/settings" onClick={() => showLoader()} className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>FR</Link>
            </button>
          </div>

       </div>
      </div>
    </header>
  );
}