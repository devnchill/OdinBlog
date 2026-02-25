import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SignUpForm } from "@odinblog/blog-shared-components";
import sendSignUpRequest from "../api/signup";
import type { TSignUpFormInput } from "../types/signup.types";

const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TSignUpFormInput>();

  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<TSignUpFormInput> = async (data) => {
    const { userName, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      const responseSignup = await sendSignUpRequest({
        userName,
        password,
      });

      if (!responseSignup.success) {
        setServerMessage(responseSignup.message);
        return;
      }

      navigate("/login");
    } catch (err) {
      console.log(err);
      setServerMessage("Network error.please try after some time");
    }
  };

  return (
    <main className="flex justify-center items-center p-10 sm:p4">
      <div className="w-full sm:w-80">
        <p className="text-center text-3xl my-8 text-[var(--color-muted)]">
          Sign up for free
        </p>
        <div className="border-[var(--color-border)] border-2 rounded-xl p-4 bg-[var(--color-darkish)] mb-18 mt-8">
          <SignUpForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            {...(serverMessage ? { serverMessage } : {})}
          />
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
