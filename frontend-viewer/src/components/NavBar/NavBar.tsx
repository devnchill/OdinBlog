import { Link } from "react-router";
import NavBtnLink from "./NavBtnLink";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <h1>
        <Link
          to="/"
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[var(--color-primary)]"
        >
          Chill Times
        </Link>
      </h1>
      <div className="flex gap-6">
        <NavBtnLink to="/" text="Home" />
        <NavBtnLink to="/blog" text="Blog" />
        <NavBtnLink to="/about" text="About" />
        <NavBtnLink to="/contact" text="Contact" />
      </div>
    </nav>
  );
};

export default NavBar;
