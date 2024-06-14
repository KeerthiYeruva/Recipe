import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import MainHeader from "@/Components/main-header";

const inter = Inter({ subsets: ["latin"] });

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
        <MainHeader></MainHeader>
        {children}
      </body>
    </html>
  );
}
