import { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';


const ToastContext = createContext();


export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}


export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);


  const showToast = ({ type = 'info', message, duration = 3000 }) => {
    const id = Date.now().toString();
    const newToast = { id, type, message, duration };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };


  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  /*
    SHORTHAND METHODS
    Convenient methods for common toast types
   */
  const success = (message, duration) => showToast({ type: 'success', message, duration });
  const error = (message, duration) => showToast({ type: 'error', message, duration });
  const warning = (message, duration) => showToast({ type: 'warning', message, duration });
  const info = (message, duration) => showToast({ type: 'info', message, duration });

  const value = {
    showToast,
    success,
    error,
    warning,
    info,
  };

  const { isDark } = useTheme();

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <div className={`fixed top-18 w-screen z-50 space-y-3 max-w-sm ${isDark ? 'bg-green-900/80 text-white' : ''}`}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Individual toast notification
function Toast({ toast, onClose }) {
  const [isLeaving, setIsLeaving] = useState(false);


  // Trigger exit animation then remove
  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 300); // Match animation duration
  };

  // TOAST STYLES BY TYPE
 
  const { isDark } = useTheme();
  const styles = {
    success: {
      bg: `${isDark ? 'dark:bg-green-900/20' : 'bg-green-50'}`,
      border: 'border-green-500',
      text: `${isDark ? 'dark:text-green-200' : 'text-green-800'}`,
      icon: CheckCircle,
    },
    error: {
      bg:  `${isDark ? 'bg-red-50' : 'dark:bg-red-900/20'}`,
      border: 'border-red-500',
      text: `${isDark ? 'dark:text-red-200' : 'text-red-800'}`,
      icon: XCircle,
    },
    warning: {
      bg: `${isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'}`,
      border: 'border-yellow-500',
      text: `${isDark ? 'text-yellow-200' : 'text-yellow-800'}`,
      icon: AlertCircle,
    },
    info: {
      bg: `${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`,
      border: 'border-blue-500',
      text: `${isDark ? 'text-blue-200' : 'text-blue-800'}`,
      icon: Info,
    },
  };

  const style = styles[toast.type] || styles.info;
  const Icon = style.icon;

  return (
    <div
      className={`
        ${style.bg} ${style.border} ${style.text}
        border-l-4 rounded-lg shadow-lg p-4
        flex items-start gap-3
        transition-all duration-300
        ${isLeaving 
          ? 'opacity-0 translate-x-full' 
          : 'opacity-100 translate-x-0'
        }
      `}
    >
      {/* Icon */}
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      
      {/* Message */}
      <p className="flex-1 text-sm font-medium">
        {toast.message}
      </p>
      
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
}