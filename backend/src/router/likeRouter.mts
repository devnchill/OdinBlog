import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyToken.mjs";

const reactionRouter = Router();

reactionRouter.get("/");

reactionRouter.use(verifyJwt);

reactionRouter.post("/new");
reactionRouter.patch("/:reactionId");
reactionRouter.delete("/:reactionId");

export default reactionRouter;
