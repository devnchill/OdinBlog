import FooterAbout from "./FooterAbout";
import FooterConnect from "./FooterConnect";
import FooterLegal from "./FooterLegal";
import FooterNav from "./FooterNav";

const Footer = () => {
  return (
    <footer className="p-4">
      <div className="grid lg:grid-cols-4  grid-cols-2 gap-4">
        <FooterAbout />
        <FooterNav />
        <FooterLegal />
        <FooterConnect />
      </div>
      <div className="flex justify-around border-t-2 border-[var(--color-border)]">
        <p>
          &copy; <span>Chill Times </span>all rights reserved.
        </p>
        <p>Made by Viena aka devnchill</p>
      </div>
    </footer>
  );
};

export default Footer;
