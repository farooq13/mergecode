

export default function StatusBadge({ variant, children }) {
/**
   * STYLE MAPPING
   * Maps each variant to its Tailwind CSS classes
   * This is cleaner than having multiple if/else statements
 */
  const variantStyles = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-[#FFC50F] dark:text-yellow-900',
    approved: 'bg-green-100 text-green-800 dark:bg-[#043915] dark:text-green-500',
    'changes-requested': 'bg-orange-100 text-orange-800 dark:bg-[#FF6C0C] dark:text-orange-900',
    merged: 'bg-purple-100 text-purple-800 dark:bg-[#540863] dark:text-purple-300',
    archived: 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200',
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