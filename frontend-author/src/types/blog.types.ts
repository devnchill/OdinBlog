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
}

export interface IBlogDetail extends IBlog {
  Comment: TComment[];
  Reaction: TReaction[];
}

export interface IBlogDetailResponse {
  data: IBlogDetail;
}

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
