import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { ReactionComponent } from "./ReactionComponent";
import { parseDate } from "../../util/parseDate.mts";
import type { IReactionBar } from "../../types/reaction.types";

const ReactionBar = ({
  blogDetailResponse,
  reactionId,
  role,
  reactionType,
  likeCount,
  dislikeCount,
  setReactionId,
  setReactionType,
  setLikeCount,
  setDislikeCount,
}: IReactionBar) => {
  return (
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
  );
};

export default ReactionBar;
