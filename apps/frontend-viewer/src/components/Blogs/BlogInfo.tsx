import type { IBlogDetailResponse } from "../../types/blog.types";

interface IBlogInfo {
  blogDetailResponse: IBlogDetailResponse;
}

const BlogInfo = ({ blogDetailResponse }: IBlogInfo) => {
  return (
    <>
      <header>
        <h2 className="text-lg md:text-3xl font-bold text-center  text-[var(--color-carbon)] bg-[var(--color-primary)] rounded-xl p-2">
          {blogDetailResponse?.data?.title}
        </h2>
      </header>
      <p className="text-[var(--color-surface)] my-8 md:text-lg">
        {blogDetailResponse?.data?.content}
      </p>
    </>
  );
};

export default BlogInfo;
