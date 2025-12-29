import { Router } from "express";
import { verifyJwt } from "../middleware/verifyToken.mjs";
import {
  createComment,
  deleteComment,
  getAllCommentsOfABlog,
  updateComment,
} from "../controller/commentController.mjs";
import validateFields from "../middleware/validateFields.mjs";
import {
  commentIdSchema,
  commentSchema,
} from "../types/zod-types/comment.types.mjs";
import { idSchema } from "../types/zod-types/user.types.mjs";
import { blogIdSchema } from "../types/zod-types/blog.types.mjs";

const commentRouter = Router({ mergeParams: true });

commentRouter.get(
  "/",
  validateFields([
    {
      schema: blogIdSchema,
      source: "params",
    },
  ]),
  getAllCommentsOfABlog,
);

commentRouter.use(
  verifyJwt,
  validateFields([{ schema: idSchema, source: "user" }]),
);

commentRouter.post(
  "/new",
  validateFields([
    {
      schema: blogIdSchema,
      source: "params",
    },
    {
      schema: commentSchema,
      source: "body",
    },
  ]),
  createComment,
);
commentRouter.patch(
  "/:commentId",

  validateFields([
    {
      schema: commentIdSchema,
      source: "params",
    },
    {
      schema: commentSchema,
      source: "body",
    },
  ]),
  updateComment,
);
commentRouter.delete(
  "/:commentId",
  validateFields([
    {
      schema: blogIdSchema,
      source: "params",
    },
    {
      schema: commentIdSchema,
      source: "params",
    },
    {
      schema: commentSchema,
      source: "body",
    },
  ]),
  deleteComment,
);

export default commentRouter;
