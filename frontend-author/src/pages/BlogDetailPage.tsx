import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { parseDate } from "../util/parseDate";
import type { IBlogDetailResponse } from "../types/blog.types";

const BlogDetailPage = () => {
  const [blogDetailResponse, setBlogDetailResponse] =
    useState<IBlogDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const blogId = slug?.split("---").pop();

  useEffect(() => {
    fetch(`/api/blog/authorBlogs/${blogId}`)
      .then((res) => {
        const data = res.json();
        return data;
      })
      // .catch((e) => console.log(e))
      .then((res: IBlogDetailResponse) => {
        console.log(res);

        setBlogDetailResponse(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [blogId]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/blog/${blogId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      navigate("/myblogs");
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${blogId}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="m-4 rounded-xl">
      <article className="bg-[var(--color-darkish)] m-4 rounded-xl p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-3xl font-bold text-center text-[var(--color-carbon)] bg-[var(--color-primary)] rounded-xl p-2 flex-1">
            {blogDetailResponse?.data?.title}
          </h2>
          <div className="flex gap-3 ml-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </header>

        <p className="text-[var(--color-surface)] my-8 md:text-lg whitespace-pre-wrap">
          {blogDetailResponse?.data?.content}
        </p>

        <section className="bg-[var(--color-black-pearl)] flex justify-between px-4 py-2 border-2 border-[var(--color-border)] rounded-md md:rounded-lg my-4">
          <p className="text-[var(--color-muted)] italic">
            {parseDate(blogDetailResponse!.data!.createdAt)}
          </p>
        </section>
      </article>
    </main>
  );
};

export default BlogDetailPage;
