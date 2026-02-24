import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.jpg";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import "./main-header.scss";

const MainHeader = () => {
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
        </ul>
        <li className="theme-toggle-wrapper">
          <ThemeToggle />
        </li>
      </nav>
    </header>
  );
};
export default MainHeader;
