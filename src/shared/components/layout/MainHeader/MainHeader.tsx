"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import Logo from "@/assets/logo.jpg";
import "./main-header.scss";

const ThemeToggle = dynamic(
  () =>
    import("@/features/theme/components/ThemeToggle/ThemeToggle").then(
      (module) => module.ThemeToggle
    ),
  { ssr: false }
);

export function MainHeader() {
  return (
    <header className="header" role="banner">
      <Link className="logo" href="/" aria-label="Recipe App Home">
        <Image src={Logo} alt="" priority />
        Recipes
      </Link>
      <nav className="nav" aria-label="Main Navigation">
        <ul>
          <li>
            <Link href="/meals">Meals</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
          <li className="theme-toggle-wrapper">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
