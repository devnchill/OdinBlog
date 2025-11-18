import { FormField } from "./FormField.tsx";

const LoginForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  serverMessage,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
  );
};

export { LoginForm };
