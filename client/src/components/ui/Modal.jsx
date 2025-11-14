import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';


/* Modal Component - A reusable modal dialog that overlays the page
  Supports custom content, sizes and actions
*/


export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true
}) {

  const { isDark } = useTheme();

  // Different max-widths for different modal sizes
  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  };

  // Close on Escape Key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent boyd scroll when modla is open
      document.body.style.overflow = 'hidden';
    }

    // Remove listner and restore scroll when modal closes
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'
    };

  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* Handle Backdrop Click
     Close modal when clicking out side of it 
  */
  const handleBackdropClick = (e) => {
    if (e.targe === e.currenTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity" 
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal Content */}
          <div className={`
              ${isDark ? 'relative w-full bg-[#1e1e1e] rounded-lg shadow-xl transform transition-all' : 'relative w-full  rounded-lg shadow-xl transform transition-all bg-white'}
              ${sizeStyles[size]}
              `}
            >
            {/* Modal Header */}
            <div className={`${isDark ? 'flex items-center justity-between p-6 border-b border-[#2a2a2a]' : 'border-gray-200 flex items-center justity-between p-6 border-b' }`}>
              <h2 className={`${isDark ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-[#121212]' }`}>
                {title}
              </h2>

              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={`
                    ${isDark 
                      ? 'p-1 rounded-lg hover:cursor-pointer hover:text-gray-600 text-gray-500 hove:text-gray-300 hover:bg-gray-700 transition-colors' 
                      : 'text-gray-600 hover:cursor-pointer hover:bg-gray-300 p-1 rounded-lg  hover:text-gray-600 transition-colors' 

                    }`}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            {/* Modal Body - Main content area */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}