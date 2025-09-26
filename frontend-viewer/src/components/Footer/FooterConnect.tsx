import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";

const FooterConnect = () => {
  return (
    <div>
      <div className="">Connect</div>
      <div className="flex gap-2">
        <a
          href="https://github.com/devnchill"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>

        <a
          href="https://leetcode.com/0xviena"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiLeetcode />
        </a>

        <a
          href="https://www.youtube.com/@mid3ee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default FooterConnect;
