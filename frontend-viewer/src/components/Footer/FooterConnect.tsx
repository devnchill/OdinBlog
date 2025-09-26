import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import FooterIcons from "./FooterIcons";

const FooterConnect = () => {
  return (
    <div className="flex flex-col items-center gap-3 ">
      <p className="text-xl">Connect</p>
      <div className="flex gap-3">
        <FooterIcons icon={FaGithub} href="https://github.com/devnchill" />
        <FooterIcons icon={SiLeetcode} href="https://leetcode.com/0xviena" />
        <FooterIcons
          icon={FaYoutube}
          href="https://www.youtube.com/@devnchill"
        />
      </div>
    </div>
  );
};

export default FooterConnect;
