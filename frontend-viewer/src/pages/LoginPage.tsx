import { Link, useNavigate } from "react-router";
import FormField from "../components/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

type TformInput = {
  userName: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { saveRole } = useAuth();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TformInput>();

  const onSubmit: SubmitHandler<TformInput> = async (data) => {
    const { userName, password } = data;
    try {
      const responseLogin = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      const json = await responseLogin.json();

      if (!json.success) {
        setServerMessage(json.message);
        return;
      }
      console.log(responseLogin);
      saveRole(json.role);
      navigate("/");
    } catch (err: unknown) {
      console.log(err);
      setServerMessage("Network error.please try after some time");
    }
  };
  return (
    <main className="flex justify-center items-center ">
      <div className="w-full md:w-80">
        <p className="text-center text-3xl my-8 text-[var(--color-muted)]">
          Log in
        </p>
        <div className="border-[var(--color-border)] border-2 rounded-xl p-4 bg-[var(--color-darkish)]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
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
            {serverMessage && (
              <span className="text-[var(--color-primary)] italic">
                {serverMessage}
              </span>
            )}
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
