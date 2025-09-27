import { Link } from "react-router";

const FooterLegal = () => {
  return (
    <div>
      <p className="text-xl font-semibold">Legal</p>
      <div className="flex flex-col gap-1 p-2">
        <Link
          to="/privacy-policy"
          className="text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms-of-service"
          className="text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          Terms of Service
        </Link>
        <Link
          to="/cookie-policy"
          className="text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-glow)]"
        >
          Cookie Policy
        </Link>
      </div>
    </div>
  );
};

export default FooterLegal;
