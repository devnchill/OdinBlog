import { Router } from "express";
import { verifyJwt } from "../middleware/verifyToken.mjs";
import {
  createReaction,
  deleteReactiong,
  getAllReaction,
  updateReaction,
} from "../controller/reactionController.mjs";
import validateFields from "../util/validateFields.mjs";
import {
  blogIdSchema,
  idSchema,
  reactionIdSchema,
  reactionSchema,
} from "@odinblog/common";

const reactionRouter = Router({ mergeParams: true });

reactionRouter.get(
  "/",
  validateFields([
    {
      schema: blogIdSchema,
      source: "params",
    },
  ]),
  getAllReaction,
);

reactionRouter.use(
  verifyJwt,
  validateFields([
    {
      schema: idSchema,
      source: "user",
    },
  ]),
);

reactionRouter.post(
  "/new",
  validateFields([
    {
      schema: blogIdSchema,
      source: "params",
    },
    {
      schema: reactionSchema,
      source: "body",
    },
  ]),
  createReaction,
);
reactionRouter.patch(
  "/:reactionId",
  validateFields([
    {
      schema: reactionIdSchema,
      source: "params",
    },
    {
      schema: reactionSchema,
      source: "body",
    },
  ]),
  updateReaction,
);
reactionRouter.delete(
  "/:reactionId",
  validateFields([
    {
      schema: reactionIdSchema,
      source: "params",
    },
  ]),
  deleteReactiong,
);

export default reactionRouter;
