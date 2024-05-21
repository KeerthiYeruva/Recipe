import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.jpg";
import "./main-header.scss";

const MainHeader = () => {
  return (
    <header className="header">
      <Link className="logo" href={"/"}>
        <Image src={Logo} alt="logo" priority />
        Recipes
      </Link>
      <nav className="nav">
        <ul>
          <li>
            <Link href="/meals">Meals</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
