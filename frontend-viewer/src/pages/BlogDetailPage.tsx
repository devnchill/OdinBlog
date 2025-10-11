import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IBlog } from "./BlogPage";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { parseDate } from "../util/parseDate.mts";
import { useAuth } from "../hooks/useAuth";
import { deleteReaction, reactBlog } from "../api/reaction";
import { handleAddComment } from "../api/comment";

interface IBlogDetailResponse {
  data: IBlogDetail;
}

type TComment = {
  userName: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

type TReaction = {
  userName: string;
  type: "LIKE" | "DISLIKE";
  createdAt: string;
  updatedAt: string;
};

interface IBlogDetail extends IBlog {
  Comment: TComment[];
  Reaction: TReaction[];
}

const BlogDetailPage = () => {
  const navigate = useNavigate();
  const [blogDetailResponse, setBlogDetailResponse] =
    useState<IBlogDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reactionId, setReactionId] = useState<string | null>(null);
  const [reactionType, setReactionType] = useState<"LIKE" | "DISLIKE" | null>(
    null,
  );
  const [comments, setComments] = useState<TComment[] | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [newComment, setNewComment] = useState<string>("");
  const { slug } = useParams<{ slug: string }>();
  const blogId = slug?.split("---").pop();
  console.log("blogid", blogId);

  const { role } = useAuth();

  useEffect(() => {
    fetch(`/api/blog/${blogId}`)
      .then((res) => res.json())
      .catch((e) => console.log(e))
      .then((data: IBlogDetailResponse) => {
        setBlogDetailResponse(data);
        const likeCount = data.data?.Reaction.filter(
          (r: TReaction) => r.type === "LIKE",
        ).length;
        const dislikeCount = data.data?.Reaction.filter(
          (r: TReaction) => r.type === "DISLIKE",
        ).length;
        setComments(data.data.Comment);
        setLikeCount(likeCount);
        setDislikeCount(dislikeCount);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [blogId]);

  if (blogDetailResponse) {
    console.log(blogDetailResponse);
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="m-4 rounded-xl  bg-[var(--color-darkish)] p-8">
      <h2 className="text-lg md:text-3xl font-bold text-center  text-[var(--color-carbon)] bg-[var(--color-primary)] rounded-xl p-2">
        {blogDetailResponse?.data?.title}
      </h2>
      <p className="text-[var(--color-muted)] my-8 md:text-lg">
        {blogDetailResponse?.data?.content}
      </p>
      <section className="bg-[var(--color-black-pearl)] flex justify-between p-2 rounded-md md:rounded-xl my-4">
        <p className="text-[var(--color-carbon)] italic">
          {parseDate(blogDetailResponse!.data!.createdAt)}
        </p>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <p className="flex items-center gap-3 text-[var(--color-stone-cold)]">
            <FaThumbsUp
              className={`hover:text-[var(--color-carbon)] ${
                reactionType === "LIKE"
                  ? "text-[var(--color-muted)]"
                  : "text-[var(--color-carbon)]"
              }
              `}
              onClick={async () => {
                if (!role) {
                  navigate("/login");
                  return;
                }
                try {
                  if (reactionType === "LIKE") {
                    // remove like
                    await deleteReaction(
                      blogDetailResponse!.data!.id,
                      reactionId!,
                    );
                    setLikeCount((prev) => prev - 1);
                    setReactionId(null);
                    setReactionType(null);
                  } else {
                    // switching  from dislike to like
                    if (reactionType === "DISLIKE") {
                      await deleteReaction(
                        blogDetailResponse!.data!.id,
                        reactionId!,
                      );
                      setDislikeCount((prev) => prev - 1);
                    }
                    //add like
                    const reaction = await reactBlog(
                      blogDetailResponse!.data!.id,
                      "LIKE",
                    );
                    setLikeCount((prev) => prev + 1);
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
                  ? "text-[var(--color-muted)]"
                  : "text-[var(--color-carbon)]"
              }
              `}
              onClick={async () => {
                try {
                  // removing dislike
                  if (reactionType === "DISLIKE") {
                    await deleteReaction(
                      blogDetailResponse!.data!.id,
                      reactionId!,
                    );
                    setDislikeCount((prev) => prev - 1);
                    setReactionId(null);
                    setReactionType(null);
                  } else {
                    // switching from like to dislike
                    if (reactionType === "LIKE") {
                      await deleteReaction(
                        blogDetailResponse!.data!.id,
                        reactionId!,
                      );
                      setLikeCount((prev) => prev - 1);
                    }
                    const reaction = await reactBlog(
                      blogDetailResponse!.data!.id,
                      "DISLIKE",
                    );
                    setReactionId(reaction.id);
                    setReactionType("DISLIKE");
                    setDislikeCount((prev) => prev + 1);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
            />{" "}
            {dislikeCount}
          </p>
          <span className="text-[var(--color-primary)] font-bold hover:text-[var(--color-carbon)]">
            - {blogDetailResponse?.data?.author.userName}
          </span>
        </div>
      </section>
      <h4 className="text-[var(--color-stone-cold)] text-2xl">
        {blogDetailResponse?.data?.Comment.length == 0
          ? "No Comments"
          : blogDetailResponse?.data?.Comment.length + "Comments"}
      </h4>
      <input
        type="text"
        placeholder={
          role ? "Add a comment" : "You need to be logged in to comment"
        }
        className="border-b-2 w-full border-[var(--color-border)] my-4"
        disabled={!role}
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      />
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setNewComment("")}
          className="text-[var(--color-muted)] border-2 border-[var(--color-border)] p-1 rounded-md bg-[var(--color-black-pearl)]"
        >
          Cancel
        </button>
        <button
          onClick={() => handleAddComment(newComment)}
          disabled={!newComment.trim()}
          className="text-[var(--color-muted)] border-2 border-[var(--color-border)] p-1 rounded-md bg-[var(--color-black-pearl)]"
        >
          Submit
        </button>
      </div>
      <div className="bg-[var(--color-carbon)]">
        {comments?.map((com: TComment) => (
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
