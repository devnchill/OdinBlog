import { FormField } from "./FormField";
import {
  type FieldErrors,
  type UseFormRegister,
  type SubmitHandler,
  type UseFormHandleSubmit,
} from "react-hook-form";

type SignUpFormValues = {
  userName: string;
  password: string;
  confirmPassword: string;
  root?: string;
};

type SignUpFormProp = {
  handleSubmit: UseFormHandleSubmit<SignUpFormValues>;
  onSubmit: SubmitHandler<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  register: UseFormRegister<SignUpFormValues>;
  serverMessage?: string;
};

const SignUpForm = ({
  handleSubmit,
  onSubmit,
  errors,
  register,
  serverMessage,
}: SignUpFormProp) => {
  return (
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
        <span className="text-[var(--color-primary)] italic">
          {serverMessage}
        </span>
      )}

      <button className="text-center my-4 text-[var(--color-muted)] bg-[var(--color-black-pearl)] p-1 border border-[var(--color-border)] rounded-md hover:text-[var(--color-stone-cold)] hover:bg-[var(--color-carbon)]">
        Create Account
      </button>
    </form>
  );
};

export { SignUpForm };
