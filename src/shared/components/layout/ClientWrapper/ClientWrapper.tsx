"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "@/features/theme/context/ThemeProvider";
import { ToastProvider } from "@/shared/components/ui/ToastProvider/ToastProvider";

export function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
