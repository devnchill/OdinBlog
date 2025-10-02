import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlog,
} from "../controller/blogController.mjs";
import { verifyJwt } from "../middleware/verifyToken.mjs";
import verifyRole from "../middleware/verifyRole.mjs";
import { Role } from "../generated/prisma/enums.js";
import commentRouter from "./commentRouter.mjs";
import reactionRouter from "./reactionRouter.mjs";
import validateFields from "../middleware/validateFields.mjs";
import { idSchema, blogBodySchema, blogIdSchema } from "@odinblog/common";

const blogRouter = Router();

// ----- guest (no account) -----
blogRouter.get("/all", getAllBlogs);
blogRouter.get(
  "/:blogId",
  validateFields([{ schema: blogIdSchema, source: "params" }]),
  getBlog,
);

// ----- comments & reactions (auth required for CUD) {No auth for viewing the comments/reactions} -----
blogRouter.use("/:blogId/comments", commentRouter);
blogRouter.use("/:blogId/reactions", reactionRouter);

// ----- blog CRUD {author(only the one owned by him)/admin(owned by anyone) only} -----
blogRouter.use(
  verifyJwt,
  validateFields([{ schema: idSchema, source: "user" }]),
  verifyRole(Role.AUTHOR),
);

blogRouter.post(
  "/new",
  validateFields([{ schema: blogBodySchema, source: "body" }]),
  createBlog,
);

blogRouter.delete(
  "/:blogId",
  validateFields([{ schema: blogIdSchema, source: "params" }]),
  deleteBlog,
);

blogRouter.patch(
  "/:blogId",
  validateFields([
    { schema: blogBodySchema, source: "body" },
    { schema: blogIdSchema, source: "params" },
  ]),
  editBlog,
);

export default blogRouter;
