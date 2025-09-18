import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyToken.mjs";

const commentRouter = Router();

commentRouter.get("/");

commentRouter.use(verifyJwt);

commentRouter.post("/new");
commentRouter.patch("/:commentId");
commentRouter.delete("/:commentId");

export default commentRouter;
