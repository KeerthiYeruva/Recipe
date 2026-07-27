import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.scss";
import { MainHeader } from "@/shared/components/layout/MainHeader/MainHeader";
import { ClientWrapper } from "@/shared/components/layout/ClientWrapper/ClientWrapper";
import { AppFooter } from "@/shared/components/layout/AppFooter/AppFooter";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Savory Table | Quick Meals and Favorites",
  description:
    "Discover, save, and share feel-good recipes with a polished local-first cooking experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfairDisplay.variable}`}>
        <ClientWrapper>
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <MainHeader />
          <main id="main-content">{children}</main>
          <AppFooter />
        </ClientWrapper>
      </body>
    </html>
  );
}
