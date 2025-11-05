import { useNavigate } from "react-router";
import FormField from "../components/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

type TformInput = {
  title: string;
  content: string;
  publish: boolean;
};

const AddBlog = () => {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TformInput>();

  const onSubmit: SubmitHandler<TformInput> = async (data) => {
    const { title, content } = data;
    try {
      const responseLogin = await fetch("/api/blog/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const json = await responseLogin.json();

      if (!json.success) {
        setServerMessage(json.message);
        return;
      }
      navigate("/dashboard");
    } catch (err: unknown) {
      setServerMessage("Network error.please try after some time");
      console.log(err);
    }
  };
  return (
    <main className="flex justify-center items-center ">
      <div className="w-full md:w-80">
        <p className="text-center text-3xl my-8 text-[var(--color-muted)]">
          Create Blog
        </p>
        <div className="border-[var(--color-border)] border-2 rounded-xl p-4 bg-[var(--color-darkish)]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              text="title"
              name="title"
              register={register}
              type="text"
              options={{
                required: { value: true, message: "title is required" },
                minLength: {
                  value: 8,
                  message: "title must be at least 8 characters",
                },
                maxLength: {
                  value: 30,
                  message: "title cannot exceed 30 characters",
                },
              }}
            />
            {errors.title && (
              <span className="text-[var(--color-primary)] italic">
                {errors.title.message}
              </span>
            )}
            <FormField
              text="content"
              name="content"
              register={register}
              type="text"
              options={{ required: true }}
            />
            {errors.content && (
              <span className="text-[var(--color-primary)] italic">
                {errors.content.message}
              </span>
            )}
            {serverMessage && (
              <span className="text-[var(--color-primary)] italic">
                {serverMessage}
              </span>
            )}
            <button className="text-center my-4 text-[var(--color-muted)] bg-[var(--color-carbon)] p-1 border border-[var(--color-border)] rounded-md hover:bg-[var(--color-carbon)]">
              Create Blog
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddBlog;
