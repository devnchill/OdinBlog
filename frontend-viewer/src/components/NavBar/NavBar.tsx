import { Link } from "react-router";
import Button from "./Button";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const NavBar = () => {
  const isLoggedIn = useContext(AuthContext);

  return (
    <nav className="h-14 flex justify-around font-[Roboto]">
      <div className="flex  gap-8 items-center text-xl">
        <Link
          to={{
            pathname: "/",
          }}
        >
          <Button text="Home" />
        </Link>
        <Link
          to={{
            pathname: "/about",
          }}
        >
          <Button text="About" />
        </Link>
        <Link
          to={{
            pathname: "/contact",
          }}
        >
          <Button text="Contact" />
        </Link>
      </div>
      <div className="flex  gap-8 items-center text-xl">
        <Link
          to={{
            pathname: "/theme",
          }}
        >
          <Button text="Theme" />
        </Link>
        {isLoggedIn ? (
          <Link
            to={{
              pathname: "/logout",
            }}
          >
            <Button text="Logout" />
          </Link>
        ) : (
          <>
            <Link
              to={{
                pathname: "/login",
              }}
            >
              <Button text="Login" />
            </Link>
            <Link
              to={{
                pathname: "/signup",
              }}
            >
              <Button text="SignUp" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
