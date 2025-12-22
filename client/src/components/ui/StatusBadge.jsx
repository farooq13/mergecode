import { useTheme } from "../../context/ThemeContext";

export default function StatusBadge({ variant, children }) {
  const { isDark } = useTheme();
/*
    Maps each variant to its Tailwind CSS classes
 */
  const variantStyles = {
    draft: `font-bold ${isDark ? 'text-gray-400' : 'text-gray-800'}`,
    pending: `font-bold ${isDark ? 'text-yellow-500' : 'text-yellow-600'}`,
    approved: `font-bold ${isDark ? 'text-green-500' : 'text-green-700'}`,
    'changes-requested': `font-bold ${isDark ? 'text-orange-500' : 'text-orange-500'}`,
    merged: `font-bold ${isDark ? 'text-purple-300' : 'text-purple-800'}`,
    archived: `font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'}`,
  };

  /**
   * Get the appropriate styles for this variant
   * If variant doesn't exist in our object, fall back to draft styles
 */
  const styles = variantStyles[variant] || variantStyles.draft;

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${styles}
      `}
    >
      {children}
    </span>
  )
}