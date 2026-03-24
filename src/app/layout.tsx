import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import MainHeader from "@/Components/main-header";
import ClientWrapper from "@/Components/ClientWrapper/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "RECIPES",
  description: "Short on time, not on flavor! Explore our quick recipes now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <MainHeader></MainHeader>
          <main id="main-content">
            {children}
          </main>
        </ClientWrapper>
      </body>
    </html>
  );
}
