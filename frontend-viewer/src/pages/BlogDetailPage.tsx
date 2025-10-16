import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { parseDate } from "../util/parseDate.mts";
import { useAuth } from "../hooks/useAuth";
import {
  handleAddComment,
  handleDeleteComment,
  handleEditComment,
} from "../api/comment";
import { BsThreeDotsVertical } from "react-icons/bs";
import type {
  IBlogDetailResponse,
  TComment,
  TReaction,
} from "../types/blog.types";
import { ReactionComponent } from "../components/Blogs/ReactionComponent";

const BlogDetailPage = () => {
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
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const blogId = slug?.split("---").pop();

  const { role, id } = useAuth();

  useEffect(() => {
    fetch(`/api/blog/${blogId}`)
      .then((res) => res.json())
      .catch((e) => console.log(e))
      .then((res: IBlogDetailResponse) => {
        setBlogDetailResponse(res);
        const likeCount = res.data?.Reaction.filter(
          (r: TReaction) => r.type === "LIKE",
        ).length;
        const dislikeCount = res.data?.Reaction.filter(
          (r: TReaction) => r.type === "DISLIKE",
        ).length;
        setComments(res.data.Comment);
        setLikeCount(likeCount);
        setDislikeCount(dislikeCount);
        const reactionByUser = res.data.Reaction.find((r) => r.user.id === id);
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
    <main className="m-4 rounded-xl">
      <article className="bg-[var(--color-darkish)] m-4 rounded-xl p-8">
        <header>
          <h2 className="text-lg md:text-3xl font-bold text-center  text-[var(--color-carbon)] bg-[var(--color-primary)] rounded-xl p-2">
            {blogDetailResponse?.data?.title}
          </h2>
        </header>
        <p className="text-[var(--color-surface)] my-8 md:text-lg">
          {blogDetailResponse?.data?.content}
        </p>
        <section className="bg-[var(--color-black-pearl)] flex justify-between px-4 py-2 border-2 border-[var(--color-border)] rounded-md md:rounded-lg my-4">
          <p className="text-[var(--color-muted)] italic">
            {parseDate(blogDetailResponse!.data!.createdAt)}
          </p>
          <div className="flex flex-1 justify-end gap-8 items-center">
            <ReactionComponent
              IconComponent={FaThumbsUp}
              reactionId={reactionId}
              role={role}
              reactionType={reactionType}
              blogDetailResponse={blogDetailResponse}
              setReactionId={setReactionId}
              setReactionType={setReactionType}
              setLikeCount={setLikeCount}
              setDislikeCount={setDislikeCount}
              reactionCount={likeCount}
              iconType="LIKE"
            />
            <ReactionComponent
              IconComponent={FaThumbsDown}
              reactionId={reactionId}
              role={role}
              reactionType={reactionType}
              blogDetailResponse={blogDetailResponse}
              setReactionId={setReactionId}
              setReactionType={setReactionType}
              setLikeCount={setLikeCount}
              setDislikeCount={setDislikeCount}
              reactionCount={dislikeCount}
              iconType="DISLIKE"
            />
            <span className="text-[var(--color-primary)] font-bold hover:text-[var(--color-carbon)]">
              - {blogDetailResponse?.data?.author.userName}
            </span>
          </div>
        </section>
      </article>
      <section>
        <section className="rounded-md p-3 my-6">
          <div>
            <h4 className="text-[var(--color-stone-cold)] text-2xl">
              {blogDetailResponse?.data?.Comment.length == 0
                ? "No Comments"
                : blogDetailResponse?.data?.Comment.length + " Comments"}
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
          </div>
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
                setNewComment("");
              }}
              disabled={!newComment.trim()}
              className="text-[var(--color-muted)] border-2 border-[var(--color-border)] p-1 rounded-md bg-[var(--color-black-pearl)]"
            >
              Submit
            </button>
          </div>
        </section>
        <section className="rounded-md p-3 my-6 flex flex-col gap-2">
          {comments?.map((com: TComment) => (
            <div
              key={com.id}
              className="rounded-lg my-2 flex justify-between items-center gap-4 p-2 border-2 border-[var(--color-border)] relative"
            >
              <div>
                <div className="font-semibold text-[var(--color-primary)] flex flex-start gap-2 ">
                  <p className="text-md ">@{com.user.userName}</p>
                  <p className="text-[var(--color-muted)] text-sm italic">
                    {parseDate(com.updatedAt)}
                  </p>
                </div>
                {editingCommentId === com.id ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="rounded-md border p-1 text-[var(--color-primary)] flex-1"
                    />
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="px-2 py-1 bg-gray-600 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        await handleEditComment(
                          blogDetailResponse!.data!.id,
                          com.id,
                          editText,
                        );
                        setEditingCommentId(null);
                        setEditText("");
                        setComments((allComments) =>
                          allComments!.map((c) =>
                            c.id === editingCommentId
                              ? { ...c, text: editText }
                              : c,
                          ),
                        );
                      }}
                      className="px-2 py-1 bg-[var(--color-primary)] rounded-md"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="text-[var(--color-muted)] text-lg my-2">
                    {com.text}
                  </p>
                )}
              </div>
              {com.user.id === id && (
                <div>
                  <button
                    className="text-[var(--color-primary)]"
                    onClick={() =>
                      setOpenMenuId(openMenuId === com.id ? null : com.id)
                    }
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {openMenuId === com.id && (
                    <div className="absolute bottom-0 right-0 border-2 border-[var(--color-border)] rounded-md bg-[var(--color-darkish)] z-10">
                      <button
                        className="m-2 text-[var(--color-primary)]"
                        onClick={async () => {
                          const commentResponse = await handleDeleteComment(
                            blogDetailResponse!.data!.id,
                            com.id,
                          );
                          if (!commentResponse.success) {
                            return <p>Error deleting comment</p>;
                          }
                          setComments((allComments) =>
                            allComments!.filter(
                              (com) => com.id !== commentResponse.data.id,
                            ),
                          );
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="m-2 text-[var(--color-primary)]"
                        onClick={async () => {
                          setEditingCommentId(com.id);
                          setEditText(com.text);
                          setOpenMenuId(null);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      </section>
    </main>
  );
};

export default BlogDetailPage;
