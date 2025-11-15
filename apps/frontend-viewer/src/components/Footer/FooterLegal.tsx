import FooterLink from "./FooterLink";
const FooterLegal = () => {
  return (
    <div>
      <p className="text-xl font-semibold text-[var(--color-surface)] mb-2">
        Legal
      </p>
      <div className="flex flex-col gap-1 p-2">
        <FooterLink to="privacy-policy">Privacy Policy</FooterLink>
        <FooterLink to="terms-of-service">Terms Of Service</FooterLink>
        <FooterLink to="cookie-policy">Cookie Policy</FooterLink>
      </div>
    </div>
  );
};

export default FooterLegal;
