import { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";

interface IBlogResponse {
  data: IBlog[];
  success: boolean;
  message: string;
}

export interface IBlog {
  title: string;
  content: string;
  createdAt: string;
  author: {
    userName: string;
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
  console.log(blogResponse);

  if (isLoading) return <main>Loading...</main>;
  if (!blogResponse?.success) {
    return <main>Error loading blogs.{blogResponse?.message}</main>;
  }
  return (
    <main className="grid gap-6 p-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] [grid-auto-rows:300px]">
      {blogResponse?.data.map((blog) => (
        <BlogCard blog={blog} />
      ))}
    </main>
  );
};
export default BlogPage;
