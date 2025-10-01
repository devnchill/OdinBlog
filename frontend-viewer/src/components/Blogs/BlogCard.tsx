import type { IBlog } from "../../pages/BlogPage.tsx";

interface IBlogCardProps {
  blog: IBlog;
}

const BlogCard = ({ blog }: IBlogCardProps) => {
  return (
    <div
      key={blog.title}
      className="border rounded-xl border-[var(--color-border)] bg-[var(--color-darkish)] grid grid-rows-[20%_1fr_10%] p-4 gap-2 md:gap-5"
    >
      <p className="text-lg md:text-xl text-center font-semibold text-[var(--color-stone-cold)] overflow-ellipsis">
        {blog.title}
      </p>
      <p className="text-[var(--color-muted)] overflow-ellipsis">
        {blog.content}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-[var(--color-stone-cold)] italic">
          {blog.createdAt}
        </p>
        <p className="text-[var(--color-primary)] font-semibold">
          {blog.author.userName}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
