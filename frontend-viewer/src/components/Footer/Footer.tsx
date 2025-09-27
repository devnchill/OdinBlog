import FooterAbout from "./FooterAbout";
import FooterConnect from "./FooterConnect";
import FooterLegal from "./FooterLegal";
import FooterNav from "./FooterNav";

const Footer = () => {
  return (
    <footer className="p-12">
      <div className="grid lg:grid-cols-[35%_21%_22%_1fr]  grid-cols-2 gap-12 m-auto my-4">
        <FooterAbout />
        <FooterNav />
        <FooterLegal />
        <FooterConnect />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between border-t-2 border-[var(--color-border)] py-3 gap-2">
        <p className="text-[var(--color-surface)]">
          <span className="text-2xl align-middle text-[var(--color-muted)]">
            &copy;{" "}
          </span>
          <span className="text-[var(--color-primary)] font-semibold mr-1">
            Chill Times{" "}
          </span>
          all rights reserved.
        </p>
        <p className="text-[var(--color-surface)]">
          Made by <span className="font-semibold">Viena</span>
          <span className="text-[var(--color-muted)] ml-1 mr-1">aka</span>
          <span className="font-semibold">devnchill</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
