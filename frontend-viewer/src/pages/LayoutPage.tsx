import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export const LayoutPage = () => {
  return (
    <div className="h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
};
