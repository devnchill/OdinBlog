import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlog,
} from "../controller/blogController.mjs";
import { verifyJwt } from "../auth/verifyToken.mjs";
import verifyRole from "../auth/verifyRole.mjs";
import { Role } from "../generated/prisma/enums.js";

const blogRouter = Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:blogId", getBlog);

blogRouter.use(verifyJwt);
blogRouter.post("/new", verifyRole(Role.AUTHOR), createBlog);

export default blogRouter;
