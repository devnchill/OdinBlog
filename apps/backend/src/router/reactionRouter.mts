import { Router } from "express";
import { verifyJwt } from "../middleware/verifyToken.mjs";
import {
  createReaction,
  deleteReaction,
  getAllReactions,
  updateReaction,
} from "../controller/reactionController.mjs";
import validateFields from "../middleware/validateFields.mjs";
import { blogIdSchema } from "../types/zod-types/blog.types.mjs";
import { idSchema } from "../types/zod-types/user.types.mjs";
import {
  reactionIdSchema,
  reactionSchema,
} from "../types/zod-types/reaction.types.mjs";

const reactionRouter = Router({ mergeParams: true });

reactionRouter.get(
  "/",
  validateFields([
    {
      schema: blogIdSchema,
      source: "params",
    },
  ]),
  getAllReactions,
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
  deleteReaction,
);

export default reactionRouter;
