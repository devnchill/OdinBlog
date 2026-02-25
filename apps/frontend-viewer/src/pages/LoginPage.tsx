import { Link, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { sendLoginRequest } from "../api/login";
import type { TLoginFormInput } from "../types/login.types";
import { LoginForm } from "@odinblog/blog-shared-components";

const LoginPage = () => {
  const navigate = useNavigate();
  const { saveRole, saveId } = useAuth();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormInput>();

  const onSubmit: SubmitHandler<TLoginFormInput> = async (data) => {
    const { userName, password } = data;

    try {
      const json = await sendLoginRequest({ userName, password });

      if (!json.success) {
        setServerMessage(json.message);
        return;
      }

      saveRole(json.role);
      saveId(json.id);
      navigate("/");
    } catch (err: unknown) {
      setServerMessage("Network error.please try after some time");

      console.log(err);
    }
  };
  return (
    <main className="flex justify-center items-center ">
      <div className="w-full md:w-80">
        <p className="text-center text-3xl my-8 text-[var(--color-muted)]">
          Log in
        </p>
        <div className="border-[var(--color-border)] border-2 rounded-xl p-4 bg-[var(--color-darkish)]">
          <LoginForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            {...(serverMessage ? { serverMessage } : {})}
          />
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
