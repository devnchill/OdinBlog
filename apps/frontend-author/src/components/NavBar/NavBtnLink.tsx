import { Link } from "react-router";

interface INavLinkProp {
  text: string;
  to: string;
}

const NavBtnLink = ({ text, to }: INavLinkProp) => {
  return (
    <Link
      to={to}
      className="text-[var(--color-surface)] text-semibold transition-colors hover:text-[var(--color-carbon)]"
    >
      {text}
    </Link>
  );
};

export default NavBtnLink;
