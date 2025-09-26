import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";
import { AuthContext } from "../contexts/AuthContext";
import Footer from "../components/Footer/Footer";

export const LayoutPage = () => {
  return (
    <AuthContext.Provider value={false}>
      <div className="h-screen bg-[var(--color-background)] text-[var(--color-surface)]">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};
