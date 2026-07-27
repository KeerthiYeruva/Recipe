import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.scss";
import { MainHeader } from "@/shared/components/layout/MainHeader/MainHeader";
import { ClientWrapper } from "@/shared/components/layout/ClientWrapper/ClientWrapper";

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
  title: "Recipes | Quick and Delicious Meals",
  description:
    "Quick and delicious recipes for busy days. Find healthy, homemade recipes ready in 10 minutes or less.",
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
        </ClientWrapper>
      </body>
    </html>
  );
}
