import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyToken.mjs";
import {
  createReaction,
  deleteReactiong,
  getAllReaction,
  updateReaction,
} from "../controller/reactionController.mjs";

const reactionRouter = Router();

reactionRouter.get("/", getAllReaction);

reactionRouter.use(verifyJwt);

reactionRouter.post("/new", createReaction);
reactionRouter.patch("/:reactionId", updateReaction);
reactionRouter.delete("/:reactionId", deleteReactiong);

export default reactionRouter;
