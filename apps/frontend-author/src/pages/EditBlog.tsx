import { useNavigate, useLocation } from "react-router";
import { FormField } from "@odinblog/blog-shared-components";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";

type TformInput = {
  title: string;
  content: string;
  publish: boolean;
};

const EditBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blogData = location.state;

  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TformInput>({
    defaultValues: {
      title: "",
      content: "",
      publish: false,
    },
  });

  useEffect(() => {
    if (blogData) {
      reset({
        title: blogData.title,
        content: blogData.content,
        publish: blogData.publish,
      });
    }
  }, [blogData, reset]);

  const onSubmit: SubmitHandler<TformInput> = async (data) => {
    const { title, content, publish } = data;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blog/${blogData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, isPublished: publish }),
      });

      const json = await response.json();
      if (!json.success) {
        setServerMessage(json.message);
        setIsSubmitting(false);
        return;
      }
      navigate(`/blog/${blogData.id}`);
    } catch (err: unknown) {
      console.error(err);
      setServerMessage("Network error. Please try again later.");
      setIsSubmitting(false);
    }
  };

  if (!blogData) {
    return (
      <div className="text-center text-[var(--color-primary)] mt-10">
        No blog data found. Try reopening the editor.
      </div>
    );
  }

  return (
    <main className="flex justify-center items-center p-8">
      <div className="w-full md:w-80">
        <p className="text-center text-3xl my-8 text-[var(--color-muted)]">
          Edit Blog
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
              type="textarea"
              options={{ required: true }}
            />
            {errors.content && (
              <span className="text-[var(--color-primary)] italic">
                {errors.content.message}
              </span>
            )}

            <div className="flex items-center gap-2 mt-2">
              <label htmlFor="publish" className="text-[var(--color-muted)]">
                Publish:
              </label>
              <input
                id="publish"
                type="checkbox"
                {...register("publish")}
                className="accent-[var(--color-primary)]"
              />
            </div>

            {serverMessage && (
              <span className="text-[var(--color-primary)] italic">
                {serverMessage}
              </span>
            )}
            <button
              disabled={isSubmitting}
              className="text-center my-4 text-[var(--color-muted)] bg-[var(--color-carbon)] p-1 border border-[var(--color-border)] rounded-md hover:bg-[var(--color-carbon)] disabled:opacity-60"
            >
              {isSubmitting ? "Updating..." : "Update Blog"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditBlog;
