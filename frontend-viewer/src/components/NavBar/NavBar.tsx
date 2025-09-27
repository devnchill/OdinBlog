import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <div>
        <Link to="/" className="text-2xl font-bold text-[var(--color-primary)]">
          Chill Times
        </Link>
      </div>
      <div className="flex gap-6">
        <Link
          to="/"
          className="text-[var(--color-surface)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-[var(--color-surface)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          About
        </Link>
        <Link
          to="/blog"
          className="text-[var(--color-surface)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          Blog
        </Link>
        <Link
          to="/contact"
          className="text-[var(--color-surface)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
