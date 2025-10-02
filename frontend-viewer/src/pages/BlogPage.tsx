import { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";

interface IBlogResponse {
  data: IBlog[];
  success: boolean;
  message: string;
}

export interface IBlog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    userName: string;
  };
  _count: {
    Comment: number;
  };
}

const BlogPage = () => {
  const [blogResponse, setBlogResponse] = useState<IBlogResponse | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch("/api/blog/all")
      .then((res) => res.json())
      .catch((e) => console.error(e))
      .then((data) => setBlogResponse(data))
      .finally(() => setisLoading(false));
  }, []);

  if (isLoading)
    return (
      <main className="text-center text-[var(--color-primary-glow)]">
        Loading...
      </main>
    );
  if (!blogResponse?.success) {
    return <main>Error loading blogs.{blogResponse?.message}</main>;
  }
  console.log(blogResponse.data);

  return (
    <main className="grid gap-6 p-8 auto-rows-min">
      {blogResponse?.data.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}
    </main>
  );
};
export default BlogPage;
