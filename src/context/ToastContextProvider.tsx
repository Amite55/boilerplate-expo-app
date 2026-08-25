// contexts/ToastContext.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import Toast from "../lib/toast/Toast";

// Type definitions
type ToastType = "success" | "error";

interface ToastConfig {
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

// Create context with proper TypeScript type
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Provider component
export const ToastContextProvider: React.FC<ToastProviderProps> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastConfig | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (
    message: string,
    type: ToastType = "success",
    duration: number = 2000,
  ) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Set new toast
    setToast({
      message,
      type,
      duration,
    });
    timerRef.current = setTimeout(() => {
      setToast(null);
      timerRef.current = null;
    }, duration);
  };

  // Hide toast function=====
  const hideToast = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {/* Render toast if exists */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onHide={hideToast} />
      )}
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};
