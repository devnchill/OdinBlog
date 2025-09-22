import { Router } from "express";
import { verifyJwt } from "../middleware/verifyToken.mjs";
import {
  createReaction,
  deleteReactiong,
  getAllReaction,
  updateReaction,
} from "../controller/reactionController.mjs";

const reactionRouter = Router({ mergeParams: true });

reactionRouter.get("/", getAllReaction);

reactionRouter.use(verifyJwt);

reactionRouter.post("/new", createReaction);
reactionRouter.patch("/:reactionId", updateReaction);
reactionRouter.delete("/:reactionId", deleteReactiong);

export default reactionRouter;
