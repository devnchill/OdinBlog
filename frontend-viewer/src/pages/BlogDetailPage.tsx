import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IBlog } from "./BlogPage";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { parseDate } from "../util/parseDate.mts";
import { useAuth } from "../hooks/useAuth";
import { addReaction, deleteReaction, editReaction } from "../api/reaction";
import { handleAddComment, handleDeleteComment } from "../api/comment";

interface IBlogDetailResponse {
  data: IBlogDetail;
}

type TComment = {
  user: {
    userName: string;
    id: string;
  };
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

type TReaction = {
  id: string;
  user: {
    id: string;
    userName: string;
  };
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
  const [reactionId, setReactionId] = useState<string | null>();
  const [reactionType, setReactionType] = useState<"LIKE" | "DISLIKE" | null>(
    null,
  );
  const [comments, setComments] = useState<TComment[] | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [newComment, setNewComment] = useState<string>("");
  const { slug } = useParams<{ slug: string }>();
  const blogId = slug?.split("---").pop();

  const { role, id } = useAuth();
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
        const reactionByUser = data.data.Reaction.find((r) => r.user.id === id);
        if (reactionByUser) {
          setReactionId(reactionByUser.id);
          setReactionType(reactionByUser.type);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [blogId, id]);

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
                  if (!reactionId && !reactionType) {
                    const reactionResponse = await addReaction(
                      blogDetailResponse!.data.id,
                      "LIKE",
                    );
                    console.log(reactionResponse);

                    setReactionId(reactionResponse.data.id);
                    setReactionType("LIKE");
                    setLikeCount((prev) => prev + 1);
                  } else if (reactionType === "LIKE") {
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

                    const reactionResponse = await editReaction(
                      blogDetailResponse!.data.id,
                      reactionId!,
                      "LIKE",
                    );
                    setDislikeCount((prev) => prev - 1);
                    setLikeCount((prev) => prev + 1);
                    setReactionId(reactionResponse.data.id);
                    setReactionType("LIKE");
                  }
                } catch (err) {
                  console.log(err);
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
                  // dislike
                  if (!reactionId && !reactionType) {
                    console.log(reactionId);
                    console.log(blogDetailResponse);

                    const reactionResponse = await addReaction(
                      blogDetailResponse!.data.id,
                      "DISLIKE",
                    );
                    setReactionId(reactionResponse.data.id);
                    setReactionType("DISLIKE");
                    setDislikeCount((prev) => prev + 1);
                  }
                  // removing dislike
                  else if (reactionType === "DISLIKE") {
                    await deleteReaction(
                      blogDetailResponse!.data!.id,
                      reactionId!,
                    );
                    setDislikeCount((prev) => prev - 1);
                    setReactionId(null);
                    setReactionType(null);
                  } else {
                    // switching from like to dislike
                    const reactionResponse = editReaction(
                      blogDetailResponse!.data.id,
                      reactionId!,
                      "DISLIKE",
                    );
                    setDislikeCount((prev) => prev + 1);
                    setLikeCount((prev) => prev - 1);
                    setReactionType("DISLIKE");
                  }
                } catch (err) {
                  console.log(err);
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
          onClick={async () => {
            const commentResponse = await handleAddComment(
              newComment,
              blogDetailResponse!.data.id,
            );
            if (!commentResponse.success) {
              return <p>Error creating comment</p>;
            }
            setComments((pre) =>
              pre ? [...pre, commentResponse.data] : [commentResponse.data],
            );
          }}
          disabled={!newComment.trim()}
          className="text-[var(--color-muted)] border-2 border-[var(--color-border)] p-1 rounded-md bg-[var(--color-black-pearl)]"
        >
          Submit
        </button>
      </div>
      <div className="bg-[var(--color-carbon)] rounded-md p-3 my-6 flex flex-col gap-2">
        {comments?.map((com: TComment) => (
          <div
            key={com.id}
            className="bg-[var(--color-stone-cold)] rounded-md p-2 my-2 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{com.user.userName}</div>
              <div>{com.text}</div>
              <div className="text-sm text-gray-500">{com.updatedAt}</div>
            </div>

            {/* Only show delete button if comment belongs to logged-in user */}
            {com.user.id === id && (
              <button
                onClick={() =>
                  handleDeleteComment(com.id, blogDetailResponse!.data!.id)
                }
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogDetailPage;
