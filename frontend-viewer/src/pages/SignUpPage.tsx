import { Link } from "react-router";

const SignUpPage = () => {
  return (
    <main className="flex justify-center items-center ">
      <div className="w-full md:w-80">
        <p className="text-center text-3xl my-8 text-[var(--color-muted)]">
          Sign up for free
        </p>
        <div className="border-[var(--color-border)] border-2 rounded-xl p-4 bg-[var(--color-darkish)]">
          <form className="flex flex-col gap-3">
            <div>
              <label className="text-[var(--color-muted)] block mb-1">
                Username:
              </label>
              <input
                className=" bg-[var(--color-carbon)] rounded-l border-2 block w-full border-[var(--color-border)]"
                type="text"
                name="userName"
              />
            </div>
            <div>
              <label className=" text-[var(--color-muted)] block mb-1">
                Password:
              </label>
              <input
                className=" bg-[var(--color-carbon)]   rounded-l  border-2 block w-full border-[var(--color-border)]"
                type="password"
                name="password"
              />
            </div>
            <div>
              <label className="block mb-1 text-[var(--color-muted)]">
                Confirm password:
              </label>
              <input
                className=" bg-[var(--color-carbon)] rounded-l border-2 block w-full border-[var(--color-border)]"
                type="password"
                name="confirmPassword"
              />
            </div>
            <button className="text-center my-4 text-[var(--color-muted)] bg-[var(--color-carbon)] p-1 border border-[var(--color-border)] rounded-md hover:bg-[var(--color-carbon)]">
              Create Account
            </button>
          </form>
          <p className="text-[var(--color-muted)]">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-[var(--color-stone-cold)] hover:text-[var(--color-carbon)]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
