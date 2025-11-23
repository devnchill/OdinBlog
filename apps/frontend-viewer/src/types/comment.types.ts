import type { Dispatch, SetStateAction } from "react";
import type { IBlogDetailResponse } from "./blog.types";

export type TComment = {
  user: {
    userName: string;
    id: string;
  };
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export interface ITCommentResponse {
  success: boolean;
  message?: string;
  data: TComment;
}

export interface ICommentBarProps {
  blogDetailResponse: IBlogDetailResponse | null;
  role: string | null;
  newComment: string;
  setNewComment: Dispatch<SetStateAction<string>>;
  setComments: Dispatch<SetStateAction<TComment[] | null>>;
}

export interface ICommentSectionProp {
  comments: TComment[] | null;
  editingCommentId: string | null;
  blogDetailResponse: IBlogDetailResponse | null;
  editText: string;
  setEditText: Dispatch<SetStateAction<string>>;
  setEditingCommentId: Dispatch<SetStateAction<string | null>>;
  setComments: Dispatch<SetStateAction<TComment[] | null>>;
  id: string | null;
  openMenuId: string | null;
  setOpenMenuId: Dispatch<SetStateAction<string | null>>;
}
