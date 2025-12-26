import type { IconType } from "react-icons";

interface IIconProp {
  icon: IconType;
  href: string;
}

const FooterIcons = ({ icon: Icon, href }: IIconProp) => {
  return (
    <a
      className="text-[var(--color-primary)] hover:text-[var(--color-carbon)]"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon />
    </a>
  );
};

export default FooterIcons;
