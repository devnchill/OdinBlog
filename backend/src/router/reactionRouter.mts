import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyToken.mjs";
import {
  createReaction,
  getAllReaction,
} from "../controller/reactionController.mjs";

const reactionRouter = Router();

reactionRouter.get("/", getAllReaction);

reactionRouter.use(verifyJwt);

reactionRouter.post("/new", createReaction);
reactionRouter.patch("/:reactionId");
reactionRouter.delete("/:reactionId");

export default reactionRouter;
