import type { IconType } from "react-icons";

interface IIconProp {
  icon: IconType;
  href: string;
}

const FooterIcons = ({ icon: Icon, href }: IIconProp) => {
  return (
    <a
      className="text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] transition-colors hover:scale-110 text-xl"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon />
    </a>
  );
};

export default FooterIcons;
