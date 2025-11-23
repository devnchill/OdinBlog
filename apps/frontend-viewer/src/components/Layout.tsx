import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const Layout = () => {
  const { saveRole, saveId } = useAuth();
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const res = await fetch("/api/auth", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.success && data.user) {
          saveRole(data.user.role);
          saveId(data.user.id);
        } else {
          saveRole(null);
          saveId(null);
        }
      } catch {
        saveRole(null);
        saveId(null);
      }
    };

    bootstrapAuth();
  }, []);

  return (
    <div className="h-screen bg-[var(--color-background)] text-[var(--color-surface)] grid grid-rows-[7%_1fr_auto]">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
