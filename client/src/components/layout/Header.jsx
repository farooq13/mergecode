import { Code2 } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import logo from '../assets/mergecode-logo.png';


export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg-px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo and Brand Name */}
          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-lg">
              <Code2 size={24} className='text-white' />
            </div>

            {/* Brand Name */}
            <div>
              <NavLink to="/" className='flex items-center gap-2'
                onClick={() => {
                    setActive("")
                    window.scrollTo(0,0);
                }}
                >
                <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
              </NavLink>
            </div>
          </div>

          {/* Center: Navigation links */}
          <nav className='hidden md:flex items-center gap-6'>
            <a href="#" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Dashboard
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Reviews
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Analytics
            </a>
          </nav>

          {/* Right Side: Theme Toggle & User Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* User Avatar */}
            <button className="flex items-center justify-center w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full hover:ring-2 hover:ring-primary-500 transiton-all">
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