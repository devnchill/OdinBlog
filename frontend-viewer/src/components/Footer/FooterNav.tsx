import { Link } from "react-router";

const FooterNav = () => {
  return (
    <div>
      <p className="text-xl font-semibold text-[var(--color-surface)] mb-2">
        Navigation
      </p>
      <nav className="flex flex-col gap-1 px-2">
        <Link
          to="/"
          className="text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          About
        </Link>
        <Link
          to="/blog"
          className="text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          Blog
        </Link>
        <Link
          to="/contact"
          className="text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default FooterNav;
