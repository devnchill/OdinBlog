import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IBlog } from "./BlogPage";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { parseDate } from "../util/parseDate.mts";
import { useAuth } from "../hooks/useAuth";
import { deleteReaction, reactBlog } from "../api/reaction";

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
  const [reactionId, setReactionId] = useState<string | null>(null);
  const [reactionType, setReactionType] = useState<"LIKE" | "DISLIKE" | null>(
    null,
  );
  const { slug } = useParams<{ slug: string }>();
  const blogId = slug?.split("---").pop();
  console.log("blogid", blogId);

  const { role } = useAuth();

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
      <h2 className="text-lg md:text-3xl font-bold text-center  text-[var(--color-carbon)] bg-[var(--color-primary)] rounded-xl p-2">
        {blogData?.title}
      </h2>
      <p className="text-[var(--color-muted)] my-8 md:text-lg">
        {blogData?.content}
      </p>
      <section className="bg-[var(--color-black-pearl)] flex justify-between p-2 rounded-md md:rounded-xl my-4">
        <p className="text-[var(--color-carbon)] italic">
          {parseDate(blogData!.createdAt)}
        </p>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <p className="flex items-center gap-3 text-[var(--color-stone-cold)]">
            <FaThumbsUp
              className={`hover:text-[var(--color-carbon)] ${
                reactionType === "LIKE"
                  ? "text-blue-600"
                  : "text-[var(--color-muted)]"
              }
              `}
              onClick={async () => {
                try {
                  if (reactionType === "LIKE") {
                    await deleteReaction(blogData!.id, reactionId!);
                    setReactionId(null);
                    setReactionType(null);
                  } else {
                    if (reactionType === "DISLIKE")
                      await deleteReaction(blogData!.id, reactionId!);
                    const reaction = await reactBlog(blogData!.id, "LIKE");
                    setReactionId(reaction.id);
                    setReactionType("LIKE");
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
            />
            {likeCount}
          </p>
          <p className="flex items-center gap-3 text-[var(--color-stone-cold)]">
            <FaThumbsDown
              className={`hover:text-[var(--color-carbon)] ${
                reactionType === "DISLIKE"
                  ? "text-blue-600"
                  : "text-[var(--color-muted)]"
              }
              `}
              onClick={async () => {
                try {
                  if (reactionType === "DISLIKE") {
                    await deleteReaction(blogData!.id, reactionId!);
                    setReactionId(null);
                    setReactionType(null);
                  } else {
                    if (reactionType === "LIKE")
                      await deleteReaction(blogData!.id, reactionId!);
                    const reaction = await reactBlog(blogData!.id, "DISLIKE");
                    setReactionId(reaction.id);
                    setReactionType("DISLIKE");
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
            />{" "}
            {dislikeCount}
          </p>
          <span className="text-[var(--color-primary)] font-bold hover:text-[var(--color-carbon)]">
            - {blogData?.author.userName}
          </span>
        </div>
      </section>
      <h4 className="text-[var(--color-stone-cold)] text-2xl">
        {blogData?.Comment.length == 0
          ? "No Comments"
          : blogData?.Comment.length + "Comments"}
      </h4>
      <input
        type="text"
        placeholder={
          role ? "Add a comment" : "You need to be logged in to comment"
        }
        className="border-b-2 w-full border-[var(--color-border)] my-4"
        disabled={!role}
      />
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
