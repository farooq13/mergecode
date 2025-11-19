// Lightweight notification dispatcher usable from non-React modules.
// It emits a window CustomEvent which a React bridge can listen to and show toasts.
export function notify(type, message) {
  try {
    window.dispatchEvent(new CustomEvent('app:notify', { detail: { type, message } }));
  } catch (err) {
    // Fallback to alert if dispatch fails
    try {
      // eslint-disable-next-line no-alert
      alert(message);
    } catch (e) {
      
    }
  }
}

export default notify;
