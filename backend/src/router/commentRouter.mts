import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyToken.mjs";
import {
  createComment,
  deleteComment,
  getAllCommentsOfABlog,
  updateComment,
} from "../controller/commentController.mjs";

const commentRouter = Router();

commentRouter.get("/", getAllCommentsOfABlog);

commentRouter.use(verifyJwt);

commentRouter.post("/new", createComment);
commentRouter.patch("/:commentId", updateComment);
commentRouter.delete("/:commentId", deleteComment);

export default commentRouter;
