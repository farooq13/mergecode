import { useTheme } from "../../context/ThemeContext";

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  ...props
}) {

  const { isDark } = useTheme();

  // Different color scheme for different button types
    const variantStyles = {
    primary: `hover:cursor-pointer ${isDark ? 'bg-[#3b82f6] hover:bg-[#2563eb]' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'}`,
    secondary: `hover:cursor-pointer ${isDark ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-600 text-white hover:bg-gray-700'}`,
    outline: `border-2 hover:cursor-pointer ${isDark ? 'border-[#3b82f6] text-[#3b82f6] hover:bg-[#1d4ed8]/20' : 'border-[#2563eb] text-[#2563eb] hover:bg-[#eff6ff]'}`,
    ghost: `hover:cursor-pointer ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`,
    danger: `hover:cursor-pointer text-white ${isDark ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'}`,
  };

  // Different padding and font sizes
  const sizeStyles = {
    md: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Common styles for all buttons
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  /* 
    Combine All Styles
    Merge base, variant, size and custom classes
  */

   const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    ${className}
   `.trim();

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
    
    {/* Loading spinner */}
    {loading && (
      <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
      </svg>
    )}
    {/* Show icon if provided and not loading */}
      {!loading && Icon && <Icon size={20} />}

      {/* Button text/content */}
      {children}
    </button>
  )
}