import { Link } from "react-router";

interface INavLink {
  to: string;
  children: React.ReactNode;
}
const FooterLink = ({ to, children }: INavLink) => {
  return (
    <Link
      to={to}
      className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-carbon)]"
    >
      {children}
    </Link>
  );
};

export default FooterLink;
