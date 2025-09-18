import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyToken.mjs";
import {
  deleteComment,
  getAllCommentsOfABlog,
} from "../controller/commentController.mjs";

const commentRouter = Router();

commentRouter.get("/", getAllCommentsOfABlog);

commentRouter.use(verifyJwt);

commentRouter.post("/new");
commentRouter.patch("/:commentId");
commentRouter.delete("/:commentId", deleteComment);

export default commentRouter;
