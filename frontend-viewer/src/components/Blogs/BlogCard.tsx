import { Link } from "react-router";
import type { IBlog } from "../../pages/BlogPage.tsx";

interface IBlogCardProps {
  blog: IBlog;
}

const BlogCard = ({ blog }: IBlogCardProps) => {
  return (
    <div className="border rounded-xl border-[var(--color-border)] bg-[var(--color-darkish)] grid grid-rows-[20%_1fr_10%] p-4 gap-2 md:gap-5">
      <Link
        to={`/blog/${blog.id}`}
        className="text-lg md:text-2xl text-center font-semibold text-[var(--color-carbon)] truncate bg-[var(--color-primary)] rounded-xl p-3"
      >
        {blog.title}
      </Link>
      <p className="text-[var(--color-muted)] overflow-ellipsis px-2">
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
