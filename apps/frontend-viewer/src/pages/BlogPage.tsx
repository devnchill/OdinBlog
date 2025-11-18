import BlogCard from "../components/Blogs/BlogCard";
import { useBlogs } from "../hooks/useBlogs";

const BlogPage = () => {
  const { data, loading, error } = useBlogs();

  if (loading)
    return (
      <main className="text-center text-[var(--color-primary-glow)]">
        Loading...
      </main>
    );

  if (!data?.success) {
    return <main>Error loading blogs.{data?.message}</main>;
  }

  if (error)
    return (
      <main className="text-center text-[var(--color-primary)]">{error}</main>
    );

  return (
    <main className="grid gap-6 p-8 auto-rows-min">
      {data?.data.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}
    </main>
  );
};
export default BlogPage;
