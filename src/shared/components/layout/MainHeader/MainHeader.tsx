"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logo.jpg";
import "./main-header.scss";

const ThemeToggle = dynamic(
  () =>
    import("@/features/theme/components/ThemeToggle/ThemeToggle").then(
      (module) => module.ThemeToggle
    ),
  { ssr: false }
);

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/meals", label: "Recipes" },
  { href: "/favorites", label: "Favorites" },
  { href: "/meals/share", label: "Share Recipe" },
  { href: "/community", label: "Community" },
];

export function MainHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        <Link className="site-header__logo" href="/" aria-label="Recipes Home">
          <Image src={Logo} alt="" priority />
          <span>
            <strong>Recipes</strong>
          </span>
        </Link>
        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__menu-button"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
          >
            <span aria-hidden="true">{isMenuOpen ? "Close" : "Menu"}</span>
          </button>
          <nav
            id="main-navigation"
            className={`site-header__nav${isMenuOpen ? " is-open" : ""}`}
            aria-label="Main Navigation"
          >
            <ul>
              {navigationLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={isActive ? "is-active" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="theme-toggle-wrapper">
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
