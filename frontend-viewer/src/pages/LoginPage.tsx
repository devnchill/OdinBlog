import { Link } from "react-router";
import FormField from "../components/FormField";

const LoginPage = () => {
  return (
    <main className="flex justify-center items-center ">
      <div className="w-full md:w-80">
        <p className="text-center text-3xl my-8 text-[var(--color-muted)]">
          Log in
        </p>
        <div className="border-[var(--color-border)] border-2 rounded-xl p-4 bg-[var(--color-darkish)]">
          <form className="flex flex-col gap-3">
            <FormField text="Username" name="userName" type="text" />
            <FormField text="Password" name="password" type="password" />
            <button className="text-center my-4 text-[var(--color-muted)] bg-[var(--color-carbon)] p-1 border border-[var(--color-border)] rounded-md hover:bg-[var(--color-carbon)]">
              Log in
            </button>
          </form>
          <p className="text-[var(--color-muted)]">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-[var(--color-stone-cold)] hover:text-[var(--color-carbon)]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
