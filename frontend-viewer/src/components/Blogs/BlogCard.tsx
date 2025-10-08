import { Link } from "react-router";
import type { IBlog } from "../../pages/BlogPage.tsx";
import { FaComment } from "react-icons/fa";
import { parseDate } from "../../util/parseDate.mts";

interface IBlogCardProps {
  blog: IBlog;
}

const BlogCard = ({ blog }: IBlogCardProps) => {
  const urlTitle = encodeURIComponent(
    blog.title.toLowerCase().replace(/\s+/g, "-"),
  );

  return (
    <Link
      to={`/blog/${urlTitle}---${blog.id}`}
      className="border rounded-xl border-[var(--color-border)] bg-[var(--color-darkish)] grid grid-rows-[auto_auto_auto] p-4 gap-2 md:gap-5"
    >
      <h2 className="text-md md:text-xl text-center font-semibold text-[var(--color-carbon)] truncate bg-[var(--color-primary)] rounded-xl p-1">
        {blog.title}
      </h2>
      <p className="text-[var(--color-muted)] truncate px-2 ">{blog.content}</p>
      <div className="flex justify-between items-center">
        <p>
          <span className="mx-4 text-[var(--color-carbon)]">on</span>
          <span className="italic text-[var(--color-stone-cold)]">
            {parseDate(blog.createdAt)}{" "}
          </span>
          <span className="mx-4 text-[var(--color-carbon)]">by</span>
          <span className="text-[var(--color-primary)] font-bold">
            {blog.author.userName}{" "}
          </span>
        </p>
        <span className="text-[var(--color-stone-cold)]">
          <FaComment className="inline" /> {blog._count.Comment}{" "}
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
