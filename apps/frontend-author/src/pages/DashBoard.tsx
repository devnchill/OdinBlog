import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

interface IBlogResponse {
  id: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

const DashBoard = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<IBlogResponse[] | null>(null);
  useEffect(() => {
    try {
      fetch("/api/blog/myblogs")
        .then((res) => {
          return res.json();
        })
        .catch((e) => {
          throw e;
        })
        .then((res) => {
          if (!res.success) {
            return <p>{res.message}</p>;
          }
          console.log(res.data);

          setBlogs(res.data);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.log(err);
    }
    return () => {
      return;
    };
  }, []);
  if (loading) return <>loading</>;
  else {
    return (
      <>
        {blogs?.length == 0 ? (
          <main className="grid gap-6 p-8 auto-rows-min">
            <img
              className="h-screen w-screen"
              src="/empty.svg"
              alt="no blogs yet"
            />
          </main>
        ) : (
          <main className="grid gap-6 p-8 [grid-auto-rows:minmax(150px,250px)] [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </main>
        )}
      </>
    );
  }
};

export default DashBoard;
