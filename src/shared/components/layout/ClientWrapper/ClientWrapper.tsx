"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "@/features/theme/context/ThemeProvider";

export function ClientWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
