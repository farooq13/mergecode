import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';



export default function ThemeToggle() {
  // Get theme data from context
  const { theme, toggleThem, isDark } = useTheme();

  return (
    <button
      onClick={toggleThem}
      className='relative p-2 rounded-lg bg-gray-200 dark:bg-dark-card hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 groud'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
    
    {/* Icon Container */}
    <div className="relative w-5 h-5">
      {/* Sun Icon (Light mode) */}
      <Sun
        size={20}
      className={`absolute inset-0 text-yellow-500 transition-all duration-300
        ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}
      `}
      />

      {/* Moon Icon (Dark mode) */}
      <Moon 
        size={20}
        className={`abosule inset-0 text-blue-600 transition-all duration-300
          ${!isDark ? 'opacity-100 rotate-0 scale-0' : 'opacity-0 rotate-90 scale-0'}
        `}
      />
    </div>

    {/* This crates a subtle animation when button is clicked */}
    <span className="absolute inset-0 rounded-lg bg-primary-500 opacity-0 group-active:opacity-20 transition-opacity duration-200">

    </span>
    </button>
  )
}