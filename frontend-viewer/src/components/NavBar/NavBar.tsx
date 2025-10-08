import { Link } from "react-router";
import NavBtnLink from "./NavBtnLink";
import { useAuth } from "../../hooks/useAuth";

const NavBar = () => {
  const { role, saveRole } = useAuth();
  const signOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      const json = await response.json();

      if (json.success) {
        saveRole("");
      } else {
        console.error("Logout failed:", json.message);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4">
      <h1>
        <Link
          to="/"
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[var(--color-primary)]"
        >
          Chill Times
        </Link>
      </h1>
      <div className="flex gap-6">
        <NavBtnLink to="/" text="Home" />
        <NavBtnLink to="/blog" text="Blog" />
        <NavBtnLink to="/about" text="About" />
        <NavBtnLink to="/contact" text="Contact" />
        {role ? (
          <button onClick={signOut}>Signout</button>
        ) : (
          <>
            <NavBtnLink to="/login" text="Login" />
            <NavBtnLink to="/signup" text="Signup" />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
