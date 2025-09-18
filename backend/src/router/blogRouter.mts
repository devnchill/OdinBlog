import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlog,
} from "../controller/blogController.mjs";
import { verifyJwt } from "../middlewares/verifyToken.mjs";
import verifyRole from "../middlewares/verifyRole.mjs";
import { Role } from "../generated/prisma/enums.js";
import commentRouter from "./commentRouter.mjs";
import reactionRouter from "./reactionRouter.mjs";

const blogRouter = Router({ mergeParams: true });

// ----- guest (no account) -----
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:blogId", getBlog);

// ----- comments & reactions (auth required for CUD) {No auth for viewing the comments} -----
blogRouter.use("/:blogId/comments", commentRouter);
blogRouter.use("/:blogId/reactions", reactionRouter);

// ----- blog CRUD {author(only the one owned by him)/admin(owned by anyone) only} -----
blogRouter.use(verifyJwt, verifyRole(Role.AUTHOR));

blogRouter.post("/new", createBlog);
blogRouter.delete("/:blogId", deleteBlog);
blogRouter.patch("/:blogId", editBlog);

export default blogRouter;
