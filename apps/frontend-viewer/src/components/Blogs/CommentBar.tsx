import { handleAddComment } from "../../api/comment";
import type { ICommentBarProps, TComment } from "../../types/comment.types";

const CommentBar = ({
  blogDetailResponse,
  role,
  newComment,
  setNewComment,
  setComments,
}: ICommentBarProps) => {
  return (
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
            setComments((pre: TComment[] | null) =>
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
  );
};

export default CommentBar;
