import { Code2 } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';


export default function Header() {
  const { isDark } = useTheme();
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
              <img src="mergecode-logo.png" alt="logo" className="w-24 h-24 object-contain" />
            </div>
          </div>

          {/* Center: Navigation links */}
          <nav className='hidden md:flex items-center gap-6'>
            <a href="#" className={`${!isDark ? 'text-[#121212]' : 'text-md font-medium text-gray-700 hover:text-gray-500 dark:hover:text-slate-50 dark:text-slate-300 transition-colors'}`}>
                Dashboard
            </a>
            <a 
              href="#" 
              className={`${!isDark ? 'text-[#121212]' : 'text-md font-medium text-gray-700 hover:text-gray-500 dark:hover:text-slate-50 dark:text-slate-300 transition-colors'}`}
            >
              Reviews
            </a>
            <a 
              href="#" 
              className={`${!isDark ? 'text-[#121212]' : 'text-md font-medium text-gray-700 hover:text-gray-500 dark:hover:text-slate-50 dark:text-slate-300 transition-colors'}`}
            >
              Analytics
            </a>
          </nav>

          {/* Right Side: Theme Toggle & User Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* User Avatar */}
            <button className="flex items-center justify-center w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full hover:cursor-pointer transiton-all">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                FR
              </span>
            </button>
          </div>

       </div>
      </div>
    </header>
  );
}