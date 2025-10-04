import { Link } from "react-router";
import FormField from "../components/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

type TformInput = {
  userName: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TformInput>();

  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TformInput> = async (data) => {
    const { userName, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      const response = await res.json();
      if (!response.success) {
        setIsError(true);
      } else {
        setIsError(false);
      }
      setServerMessage(response.message);
      console.log(response);
    } catch (err: any) {
      setServerMessage(err || "Network error.please try after some time");
      setIsError(true);
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
            {serverMessage && (
              <span
                className={
                  isError
                    ? "text-[var(--color-primary)] italic"
                    : "text-green-400 italic"
                }
              >
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
