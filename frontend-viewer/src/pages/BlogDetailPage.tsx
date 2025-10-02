import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { IBlog } from "./BlogPage";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

interface IBlogDetailResponse {
  data: IBlogDetail;
}

interface IBlogDetail extends IBlog {
  Comment: {
    userName: string;
    text: string;
    createdAt: string;
    updatedAt: string;
  }[];
  Reaction: {
    userName: string;
    type: "LIKE" | "DISLIKE";
    createdAt: string;
    updatedAt: string;
  }[];
}

const BlogDetailPage = () => {
  const [blogDetailResponse, setBlogDetailResponse] =
    useState<IBlogDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { blogId } = useParams<{ blogId: string }>();
  useEffect(() => {
    fetch(`/api/blog/${blogId}`)
      .then((res) => res.json())
      .catch((e) => console.log(e))
      .then((data) => setBlogDetailResponse(data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [blogId]);
  if (blogDetailResponse) {
    console.log(blogDetailResponse);
  }
  if (isLoading) return <div>Loading...</div>;
  const blogData = blogDetailResponse?.data;
  let likeCount = 0,
    dislikeCount = 0;
  blogData?.Reaction.forEach((r) => {
    if (r.type === "LIKE") likeCount++;
    else dislikeCount++;
  });

  return (
    <main className="m-4 rounded-xl  bg-[var(--color-darkish)] p-8">
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-center  text-[var(--color-carbon)] bg-[var(--color-primary)] rounded-xl p-2">
        {blogData?.title}
      </h2>
      <p className="text-[var(--color-muted)] my-8 md:text-lg">
        {blogData?.content}
      </p>
      <div className="flex justify-end gap-10 ">
        <section className="flex justify-between items-center gap-6">
          <p className="text-[var(--color-stone-cold)] hover:text-[var(--color-carbon)]">
            <FaThumbsUp className="inline" /> {likeCount}
          </p>
          <p className="text-[var(--color-stone-cold)] hover:text-[var(--color-carbon)]">
            <FaThumbsDown className="inline" /> {dislikeCount}
          </p>
        </section>
        <Link
          to={`/profile/${22}`}
          className="text-[var(--color-primary)] font-bold hover:text-[var(--color-carbon)]"
        >
          {blogData?.author.userName}
        </Link>
      </div>
      <h4 className="text-[var(--color-stone-cold)] text-2xl">
        {blogData?.Comment.length == 0
          ? "No Comments"
          : blogData?.Comment.length + "Comments"}
      </h4>
      <div className="bg-[var(--color-carbon)]">
        {blogData?.Comment.map((com) => (
          <div>
            {com.userName}
            {com.text}
            {com.createdAt}
            {com.updatedAt}
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogDetailPage;
