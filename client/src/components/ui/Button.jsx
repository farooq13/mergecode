
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

  // Different color scheme for different button types
    const variantStyles = {
    primary: 'bg-primary-600 text-white hover:cursor-pointer hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary: 'bg-gray-600 text-white hover:cursor-pointer hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600',
    outline: 'border-2 border-primary-600 text-primary-600 hover:cursor-pointer hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20',
    ghost: 'text-gray-700 hover:cursor-pointer hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
    danger: 'bg-red-600 text-white hover:cursor-pointer hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
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