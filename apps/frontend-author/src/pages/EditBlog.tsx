import { useNavigate, useLocation } from "react-router";
import { FormField } from "@odinblog/blog-shared-components";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

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
    control,
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
      <div className="text-center text-(--color-primary) mt-10">
        No blog data found. Try reopening the editor.
      </div>
    );
  }

  return (
    <main className="flex justify-center items-center p-8">
      <div className="w-full md:w-4xl">
        <p className="text-center text-3xl my-8 text-(--color-muted)">
          Edit Blog
        </p>
        <div className="border-(--color-border) border-2 rounded-xl p-4 bg-(--color-darkish)">
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
            <Controller
              name="content"
              control={control}
              defaultValue=""
              rules={{
                required: "Content is required",
              }}
              render={({ field }) => (
                <Editor
                  apiKey="m9xlcut1e23m1vh78du64dyxwboghuzoak8wgy82gmub9bzw"
                  value={field.value}
                  onEditorChange={field.onChange}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: ["link", "image", "lists", "code", "table"],
                    toolbar:
                      "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | code",
                  }}
                />
              )}
            />
            {errors.title && (
              <span className="text-(--color-primary) italic">
                {errors.title.message}
              </span>
            )}
            {errors.content && (
              <span className="text-(--color-primary) italic">
                {errors.content.message}
              </span>
            )}

            <div className="flex items-center gap-2 mt-2">
              <label htmlFor="publish" className="text-(--color-muted)">
                Publish:
              </label>
              <input
                id="publish"
                type="checkbox"
                {...register("publish")}
                className="accent-(--color-primary)"
              />
            </div>

            {serverMessage && (
              <span className="text-(--color-primary) italic">
                {serverMessage}
              </span>
            )}
            <button
              disabled={isSubmitting}
              className="text-center my-4 text-(--color-muted) bg-(--color-carbon) p-1 border border-(--color-border) rounded-md hover:bg-(--color-carbon) disabled:opacity-60"
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
