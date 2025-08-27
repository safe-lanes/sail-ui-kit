import React from 'react';

export interface ToastHook {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
}

export interface ToastContextType {
  toasts: ToastHook[];
  addToast: (toast: Omit<ToastHook, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastHookProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastHook[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastHook, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

// Simple hook implementation for compatibility
export function toast(options: Omit<ToastHook, 'id'>) {
  // This is a simplified version - in a real app you'd dispatch to the toast context
  console.log('Toast:', options);
}