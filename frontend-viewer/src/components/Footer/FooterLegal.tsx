import { Link } from "react-router";

const FooterLegal = () => {
  return (
    <div>
      <p className="text-xl">Legal</p>
      <div className="flex-col flex p-2">
        <Link to={"/privacy-policy"}>Privacy Policy</Link>
        <Link to={"terms-of-service"}>Terms of Service</Link>
        <Link to={"cookie-policy"}>Cookie Policy</Link>
      </div>
    </div>
  );
};

export default FooterLegal;
