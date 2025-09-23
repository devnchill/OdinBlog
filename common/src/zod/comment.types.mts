import { z } from "zod";

export const commentSchema = z.object({
  text: z.coerce.string(),
});
export const commentIdSchema = z.object({
  commentId: z.coerce.number(),
});
