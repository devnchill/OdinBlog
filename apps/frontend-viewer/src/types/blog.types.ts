import type { TComment } from "./comment.types";

export interface IBlogResponse {
  data: IBlog[];
  success: boolean;
  message: string;
}

export interface IBlog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    userName: string;
  };
  _count: {
    Comment: number;
  };
}

export interface IBlogDetail extends IBlog {
  Comment: TComment[];
  Reaction: TReaction[];
}

export interface IBlogDetailResponse {
  data: IBlogDetail;
}

export type TReaction = {
  id: string;
  user: {
    id: string;
    userName: string;
  };
  type: "LIKE" | "DISLIKE";
  createdAt: string;
  updatedAt: string;
};
