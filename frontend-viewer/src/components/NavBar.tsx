import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="h-14 bg-linear-65 from-purple-500 to-pink-500 flex justify-around font-[Roboto]">
      <div className="flex  gap-8 items-center text-xl">
        <Link
          to={{
            pathname: "/",
          }}
        >
          Blogs
        </Link>
        <Link
          to={{
            pathname: "/about",
          }}
        >
          About
        </Link>
        <Link
          to={{
            pathname: "/contact",
          }}
        >
          Contact
        </Link>
      </div>
      <div className="flex  gap-8 items-center text-xl">
        <Link
          to={{
            pathname: "/theme",
          }}
        >
          Theme
        </Link>
        <Link
          to={{
            pathname: "/login",
          }}
        >
          Login
        </Link>
        <Link
          to={{
            pathname: "/signup",
          }}
        >
          SignUp
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
