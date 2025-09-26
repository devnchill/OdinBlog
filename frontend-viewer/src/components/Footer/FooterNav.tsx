import { Link } from "react-router";

const FooterNav = () => {
  return (
    <div>
      <p className="text-xl">Navigation</p>
      <nav className="flex flex-col p-2">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/blog"}>Blog</Link>
        <Link to={"/contact"}>Contact</Link>
      </nav>
    </div>
  );
};

export default FooterNav;
