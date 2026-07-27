"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import "./toast-provider.scss";

type ToastTone = "neutral" | "success";

interface ToastState {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const contextValue = useMemo<ToastContextValue>(() => {
    return {
      showToast: (message, tone = "neutral") => {
        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
        }

        setToast({ id: Date.now(), message, tone });

        timeoutRef.current = window.setTimeout(() => {
          setToast(null);
        }, 2200);
      },
    };
  }, []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="true">
        {toast ? (
          <div className={`toast-message toast-message--${toast.tone}`} key={toast.id}>
            {toast.message}
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
