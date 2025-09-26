import type { IconType } from "react-icons";

interface IIconProp {
  icon: IconType;
  href: string;
}

const FooterIcons = ({ icon: Icon, href }: IIconProp) => {
  return (
    <a
      className="text-xl"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon />
    </a>
  );
};

export default FooterIcons;
