import { useNavigate } from "react-router";
import {
  addReaction,
  deleteReaction,
  updateReaction,
} from "../../api/reaction";
import type { IReaction } from "../../types/reaction.types";

export const ReactionComponent = ({
  IconComponent,
  reactionId,
  role,
  reactionType,
  blogDetailResponse,
  setReactionId,
  setReactionType,
  setLikeCount,
  setDislikeCount,
  reactionCount,
  iconType,
}: IReaction) => {
  const navigate = useNavigate();
  async function clickHandler() {
    if (!role) {
      navigate("/login");
      return;
    }
    try {
      if (iconType === "LIKE") {
        if (!reactionId && !reactionType) {
          const reactionResponse = await addReaction(
            blogDetailResponse!.data.id,
            "LIKE",
          );
          setReactionId(reactionResponse.data.id);
          setReactionType("LIKE");
          setLikeCount((prev) => prev + 1);
        } else if (reactionType === "LIKE") {
          // remove like
          await deleteReaction(blogDetailResponse!.data!.id, reactionId!);
          setLikeCount((prev) => prev - 1);
          setReactionId(null);
          setReactionType(null);
        } else {
          // switching  from dislike to like
          const reactionResponse = await updateReaction(
            blogDetailResponse!.data.id,
            reactionId!,
            "LIKE",
          );
          setDislikeCount((prev) => prev - 1);
          setLikeCount((prev) => prev + 1);
          setReactionId(reactionResponse.data.id);
          setReactionType("LIKE");
        }
      } else if (iconType === "DISLIKE") {
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
          await deleteReaction(blogDetailResponse!.data!.id, reactionId!);
          setDislikeCount((prev) => prev - 1);
          setReactionId(null);
          setReactionType(null);
        } else {
          // switching from like to dislike
          const reactionResponse = await updateReaction(
            blogDetailResponse!.data.id,
            reactionId!,
            "DISLIKE",
          );
          setDislikeCount((prev) => prev + 1);
          setLikeCount((prev) => prev - 1);
          setReactionId(reactionResponse.data.id);
          setReactionType("DISLIKE");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <p className="flex items-center gap-3 text-[var(--color-stone-cold)]">
      <IconComponent
        className={`hover:text-[var(--color-carbon)] ${
          reactionType === iconType
            ? "text-[var(--color-muted)]"
            : "text-[var(--color-carbon)]"
        }
                `}
        onClick={clickHandler}
      />
      {reactionCount}
    </p>
  );
};
