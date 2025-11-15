import { Link } from "react-router";
import FormField from "../components/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

type TformInput = {
  userName: string;
  password: string;
  confirmPassword: string;
  role: "USER" | "AUTHOR" | "ADMIN";
  adminPassword?: string;
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<TformInput>();

  const role = watch("role", "USER");

  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<TformInput> = async (data) => {
    const { userName, password, confirmPassword, role, adminPassword } = data;
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      const resSignup = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password, role, adminPassword }),
      });

      const responseSignup = await resSignup.json();
      if (!responseSignup.success) {
        setServerMessage(responseSignup.message);
        return;
      }

      const resLog = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      const responseLogin = await resLog.json();
      if (!responseLogin.success) {
        setServerMessage(responseLogin.message);
        return;
      }
      navigate("/");
    } catch (err: unknown) {
      setServerMessage("Network error.please try after some time");
      console.log(err);
    }
  };

  return (
    <main className="flex justify-center items-center p-10 sm:p4">
      <div className="w-full sm:w-80">
        <p className="text-center text-3xl my-8 text-[var(--color-muted)]">
          Sign up for free
        </p>
        <div className="border-[var(--color-border)] border-2 rounded-xl p-4 bg-[var(--color-darkish)] mb-18 mt-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            method="post"
          >
            <FormField
              text="Username"
              name="userName"
              register={register}
              type="text"
              options={{
                required: { value: true, message: "Username is required" },
                minLength: {
                  value: 2,
                  message: "Username must be at least 2 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Username cannot exceed 10 characters",
                },
              }}
            />
            {errors.userName && (
              <span className="text-[var(--color-primary)] italic">
                {errors.userName.message}
              </span>
            )}

            <FormField
              text="Password"
              name="password"
              register={register}
              type="password"
              options={{ required: true }}
            />
            {errors.password && (
              <span className="text-[var(--color-primary)] italic">
                {errors.password.message}
              </span>
            )}

            <FormField
              text="Confirm password"
              name="confirmPassword"
              register={register}
              type="password"
              options={{ required: true }}
            />
            {errors.confirmPassword && (
              <span className="text-[var(--color-primary)] italic">
                {errors.confirmPassword.message}
              </span>
            )}
            {errors.root && (
              <span className="text-[var(--color-primary)] italic">
                {errors.root.message}
              </span>
            )}

            <select
              className="bg-[var(--color-carbon)] p-2 rounded-md text-[var(--color-muted)] font-semibold"
              {...register("role")}
              defaultValue={"User"}
            >
              <option value={"USER"} className="bg-[var(--color-background)]">
                User
              </option>
              <option value={"AUTHOR"} className="bg-[var(--color-background)]">
                Author
              </option>
              <option value={"ADMIN"} className="bg-[var(--color-background)]">
                Admin
              </option>
            </select>

            {role === "ADMIN" && (
              <>
                <FormField
                  text="Admin password"
                  name="adminPassword"
                  register={register}
                  type="password"
                  options={{
                    required: {
                      value: true,
                      message: "Admin password required",
                    },
                  }}
                />
              </>
            )}
            {serverMessage && (
              <span className="text-[var(--color-primary)] italic">
                {serverMessage}
              </span>
            )}

            <button className="text-center my-4 text-[var(--color-muted)] bg-[var(--color-black-pearl)] p-1 border border-[var(--color-border)] rounded-md hover:text-[var(--color-stone-cold)] hover:bg-[var(--color-carbon)]">
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
