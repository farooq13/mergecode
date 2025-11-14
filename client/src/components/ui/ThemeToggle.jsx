import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';



export default function ThemeToggle() {
  // Get theme data from context
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='relative p-2 rounded-full bg-gray-800 dark:bg-gray-800 hover:cursor-pointer transition-all duration-300 focus:outline-none group'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
    
    {/* Icon Container */}
    <div className="relative w-5 h-5">
     {/* SUN ICON (Light Mode) */}
        <Sun
          size={20}
          className={`
            absolute inset-0
            text-yellow-500
            transition-all duration-300
            ${!isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-0'
            }
          `}
        />
        
        {/* MOON ICON (Dark Mode) */}
        <Moon
          size={20}
          className={`
            absolute inset-0
            text-slate-50
            transition-all duration-300
            ${isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />

    </div>

    {/* This crates a subtle animation when button is clicked */}
    <span className="absolute inset-0 rounded-lg bg-primary-500 opacity-0 group-active:opacity-20 transition-opacity duration-200">

    </span>
    </button>
  )
}