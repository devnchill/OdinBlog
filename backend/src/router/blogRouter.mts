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

//for guest (who haven't created account)
blogRouter.get("/", getAllBlogs);

//for user who have created account. can CRUD comments/like they made
blogRouter.use("/:blogId/comments", verifyJwt);
blogRouter.use("/:blogId/likes", verifyJwt);

//for guest (who haven't created account)
blogRouter.get("/:blogId", getBlog);

//for author and admin
blogRouter.use(verifyRole(Role.AUTHOR));

blogRouter.post("/new", createBlog);
blogRouter.delete("/:blogId", deleteBlog);
blogRouter.put("/:blogId", editBlog);

export default blogRouter;
