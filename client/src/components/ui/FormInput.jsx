import { useTheme } from "../../context/ThemeContext";
export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  options = [],
  rows = 4,
  className = '',
  labelClassName = '',
  ...props
}) {
  // Import useTheme hook to apply theme-aware styles
  const { isDark } = useTheme();

  

  // Common styles for all input types - now theme-aware
  const baseStyles = `
    w-full px-3 py-2 rounded-lg transition-colors
    ${isDark ? 'bg-[#121212] text-white dark:border-[#2a2a2a]' : 'bg-white text-[#121212] border border-gray-300'}
    placeholder:text-gray-400 dark:placeholder:text-gray-500 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${className}
  `;  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea 
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={baseStyles}
            {...props}
          />
        );

        case 'select':
          return (
            <select 
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={baseStyles}
              {...props}
            >
              <option value="">Select an Option</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          );

          default:
            return (
              <input 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={baseStyles}
                {...props}
              />
            );
    }
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className={`block text-sm font-medium mb-1.5 ${labelClassName || 'text-gray-700 dark:text-gray-300'}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      {renderInput()}

      {/* Error Message */}
      {error && (
        <p className="mt-1 5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
  
}