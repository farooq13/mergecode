import { Code2, SearchIcon } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';


export default function Header() {
  const { isDark } = useTheme();
  const { showLoader } = useLoading();
 

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
          <nav className='hidden md:flex items-center gap-6'>
            <Link to="/" onClick={() => showLoader()} className={`${!isDark ? 'text-[#121212] hover:cursor-pointer' : 'text-md font-medium text-gray-700 hover:text-gray-500 hover:cursor-pointer dark:hover:text-slate-50 dark:text-slate-300 transition-colors'}`}>
                Dashboard
            </Link>
            <Link
              to="/reviews"
              onClick={() => showLoader()}
              className={`${!isDark ? 'text-[#121212]' : 'text-md font-medium text-gray-700 hover:text-gray-500 dark:hover:text-slate-50 dark:text-slate-300 transition-colors'}`}
            >
              Reviews
            </Link>
            <Link
              to="/analytics"
              onClick={() => showLoader()}
              className={`${!isDark ? 'text-[#121212]' : 'text-md font-medium text-gray-700 hover:text-gray-500 dark:hover:text-slate-50 dark:text-slate-300 transition-colors'}`}
            >
              Analytics
            </Link>
            <Link
              to="/search"
              onClick={() => showLoader()}
              className={`text-md font-medium transition-colors ${!isDark ? 'hover:text-gray-500 text-gray-700' : 'dark:hover:text-slate-50text-slate-300'}`}
            >
              <div className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} >
                <SearchIcon size={24} />
              </div>
            </Link>
           
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