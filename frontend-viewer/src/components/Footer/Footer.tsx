import FooterAbout from "./FooterAbout";
import FooterConnect from "./FooterConnect";
import FooterLegal from "./FooterLegal";
import FooterNav from "./FooterNav";

const Footer = () => {
  return (
    <footer className="p-12">
      <div className="grid lg:grid-cols-[35%_21%_22%_1fr]  grid-cols-2 gap-4 m-auto">
        <FooterAbout />
        <FooterNav />
        <FooterLegal />
        <FooterConnect />
      </div>
      <div className="flex justify-around border-t-2 border-[var(--color-border)] py-3">
        <p>
          <span className="text-3xl align-middle text-[var(--color-muted)]">
            &copy;{" "}
          </span>
          <span className="text-[var(--color-primary)]">Chill Times </span>all
          rights reserved.
        </p>
        <p>
          Made by Viena<span className="text-[var(--color-muted)]"> aka </span>
          devnchill
        </p>
      </div>
    </footer>
  );
};

export default Footer;
