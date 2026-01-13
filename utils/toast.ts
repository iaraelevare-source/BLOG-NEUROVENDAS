// Simple toast notification utility for user feedback
// TODO: Replace with proper toast library (e.g., react-hot-toast, sonner) in production

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  // For now, using alert as a placeholder
  // In production, this should be replaced with a proper toast notification system
  alert(`${type.toUpperCase()}: ${message}`);
  
  // Future implementation:
  // toast[type](message);
};

export const toast = {
  success: (message: string) => showToast(message, 'success'),
  error: (message: string) => showToast(message, 'error'),
  info: (message: string) => showToast(message, 'info'),
};
