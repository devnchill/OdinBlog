import { useEffect, useState } from "react";
import type {
  IBlogDetailResponse,
  TComment,
  TReaction,
} from "../types/blog.types";
import { useParams } from "react-router";

const useBlogDetails = (id: string) => {
  const { slug } = useParams<{ slug: string }>();
  const blogId = slug?.split("---").pop();
  const [blogDetailResponse, setBlogDetailResponse] =
    useState<IBlogDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<TComment[] | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [reactionId, setReactionId] = useState<string | null>(null);
  const [reactionType, setReactionType] = useState<"LIKE" | "DISLIKE" | null>(
    null,
  );
  useEffect(() => {
    setIsLoading(true);
    async function load() {
      try {
        const response = await fetch(`/api/blog/${blogId}`);
        const responseJson: IBlogDetailResponse = await response.json();

        setBlogDetailResponse(responseJson);

        const likeCount = responseJson.data?.Reaction.filter(
          (r: TReaction) => r.type === "LIKE",
        ).length;

        const dislikeCount = responseJson.data?.Reaction.filter(
          (r: TReaction) => r.type === "DISLIKE",
        ).length;

        setComments(responseJson.data.Comment);
        setLikeCount(likeCount);
        setDislikeCount(dislikeCount);

        const reactionByUser = responseJson.data.Reaction.find(
          (r) => r.user.id === id,
        );
        if (reactionByUser) {
          setReactionId(reactionByUser.id);
          setReactionType(reactionByUser.type);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [blogId, id]);

  return {
    blogDetailResponse,
    isLoading,
    comments,
    likeCount,
    dislikeCount,
    reactionId,
    reactionType,
    setReactionId,
    setReactionType,
    setLikeCount,
    setDislikeCount,
    setComments,
  };
};

export default useBlogDetails;
