import { Link } from "react-router";
import NavBtnLink from "./NavBtnLink";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <div>
        <Link to="/" className="text-2xl font-bold text-[var(--color-primary)]">
          Chill Times
        </Link>
      </div>
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
