import FooterLink from "./FooterLink";

const FooterNav = () => {
  return (
    <div>
      <p className="text-xl font-semibold text-[var(--color-surface)] mb-2">
        Navigation
      </p>
      <nav className="flex flex-col gap-1 px-2">
        <FooterLink to="/">Home</FooterLink>
        <FooterLink to="/about"> About</FooterLink>
        <FooterLink to="/contact"> Contact</FooterLink>
      </nav>
    </div>
  );
};

export default FooterNav;
