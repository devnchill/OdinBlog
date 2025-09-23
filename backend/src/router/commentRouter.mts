import { Router } from "express";
import { verifyJwt } from "../middleware/verifyToken.mjs";
import {
  createComment,
  deleteComment,
  getAllCommentsOfABlog,
  updateComment,
} from "../controller/commentController.mjs";
import validateFields from "../util/validateFields.mjs";
import {
  blogIdSchema,
  commentIdSchema,
  commentSchema,
  idSchema,
} from "@odinblog/common";

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
      source: "params",
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
