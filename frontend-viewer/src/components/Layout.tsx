import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

export const LayoutPage = () => {
  return (
    <div className="h-screen bg-[var(--color-background)] text-[var(--color-surface)] grid grid-rows-[7%_1fr_auto]">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
