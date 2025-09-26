import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { AuthContext } from "../contexts/AuthContext";

export const LayoutPage = () => {
  return (
    <AuthContext.Provider value={true}>
      <div className="h-screen">
        <NavBar />
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
};
