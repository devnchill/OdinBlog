import { BsThreeDotsVertical } from "react-icons/bs";
import { handleDeleteComment, handleEditComment } from "../../api/comment";
import type { ICommentSectionProp, TComment } from "../../types/comment.types";
import { parseDate } from "../../util/parseDate.mts";

const CommentSection = ({
  comments,
  editingCommentId,
  blogDetailResponse,
  editText,
  setEditText,
  setEditingCommentId,
  setComments,
  id,
  openMenuId,
  setOpenMenuId,
}: ICommentSectionProp) => {
  return (
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
  );
};

export default CommentSection;
