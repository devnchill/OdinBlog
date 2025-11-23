import type { Dispatch, SetStateAction } from "react";
import type { IBlogDetailResponse } from "./blog.types";
import type { IconType } from "react-icons";

export interface IReaction {
  blogDetailResponse: IBlogDetailResponse | null;
  reactionId: string | null;
  role: string | null;
  reactionType: "LIKE" | "DISLIKE" | null;
  reactionCount: number;
  iconType: "LIKE" | "DISLIKE";
  setReactionId: (param: string | null) => void;
  setReactionType: Dispatch<SetStateAction<"LIKE" | "DISLIKE" | null>>;
  setLikeCount: (param: (p: number) => number) => void;
  setDislikeCount: (param: (p: number) => number) => void;
  IconComponent: IconType;
}

export interface IReactionBar {
  blogDetailResponse: IBlogDetailResponse | null;
  reactionId: string | null;
  role: string | null;
  reactionType: "LIKE" | "DISLIKE" | null;
  likeCount: number;
  dislikeCount: number;
  setReactionId: (param: string | null) => void;
  setReactionType: Dispatch<SetStateAction<"LIKE" | "DISLIKE" | null>>;
  setLikeCount: (param: (p: number) => number) => void;
  setDislikeCount: (param: (p: number) => number) => void;
}
