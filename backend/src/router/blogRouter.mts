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

const blogRouter = Router({ mergeParams: true });

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:blogId", getBlog);

//for user who have created account
blogRouter.use(verifyJwt);

//for author as well as admin
blogRouter.use(verifyRole(Role.AUTHOR));

blogRouter.post("/new", createBlog);
blogRouter.delete("/:blogId", deleteBlog);
blogRouter.put("/:blogId", editBlog);

export default blogRouter;
