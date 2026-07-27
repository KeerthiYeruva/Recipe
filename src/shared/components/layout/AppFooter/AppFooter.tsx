import Link from "next/link";

import "./app-footer.scss";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/meals", label: "Recipes" },
  { href: "/favorites", label: "Favorites" },
  { href: "/meals/share", label: "Share Recipe" },
  { href: "/community", label: "Community" },
];

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__brand">
          <span className="eyebrow">Savory Table</span>
          <h2>Cook something bright, quick, and worth repeating.</h2>
          <p>
            Discover fast recipes, keep your favorites close, and share the dishes that
            save busy weeknights.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="app-footer__nav">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
