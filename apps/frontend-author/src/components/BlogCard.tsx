import { Link } from "react-router";
import { parseDate } from "../util/parseDate";
import type { IBlog } from "../types/blog.types";

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
      className="border text-lg rounded-xl border-[var(--color-border)] bg-[var(--color-darkish)] grid grid-rows-[auto_auto_auto] p-4 gap-2 p-auto"
    >
      <h2 className="text-lg md:text-3xl text-center font-semibold text-[var(--color-carbon)] truncate bg-[var(--color-primary)] rounded-xl p-1 my-auto">
        {blog.title}
      </h2>
      <p className="text-[var(--color-muted)] truncate px-2 ">{blog.content}</p>
      <div className="flex justify-between items-center">
        <p>
          <span className="mx-4 text-[var(--color-carbon)]">on</span>
          <span className="italic text-[var(--color-stone-cold)]">
            {parseDate(blog.createdAt)}{" "}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
