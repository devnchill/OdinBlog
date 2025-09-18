import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyToken.mjs";

const likeRouter = Router();

likeRouter.get("/");

likeRouter.use(verifyJwt);

likeRouter.post("/new");
likeRouter.patch("/:likeId");
likeRouter.delete("/:likeId");

export default likeRouter;
