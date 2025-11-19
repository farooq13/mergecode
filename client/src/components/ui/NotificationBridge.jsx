import { useEffect } from 'react';
import { useToast } from './Toast';

// Listens for window 'app:notify' events and shows a toast via ToastProvider
export default function NotificationBridge() {
  const { error, info, success, warning } = useToast();

  useEffect(() => {
    const handler = (e) => {
      const { type = 'info', message = '' } = e.detail || {};
      switch (type) {
        case 'error':
          error(message);
          break;
        case 'success':
          success(message);
          break;
        case 'warning':
          warning(message);
          break;
        default:
          info(message);
      }
    };

    window.addEventListener('app:notify', handler);
    return () => window.removeEventListener('app:notify', handler);
  }, [error, info, success, warning]);

  return null;
}
