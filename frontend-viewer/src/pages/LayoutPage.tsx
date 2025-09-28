import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

export const LayoutPage = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="h-screen bg-[var(--color-background)] text-[var(--color-surface)]">
      <NavBar />
      {children ?? <Outlet />}
      <Footer />
    </div>
  );
};
