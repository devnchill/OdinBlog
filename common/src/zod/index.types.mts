import { z } from "zod";

//blogcontroller validation schemas
export const blogIdSchema = z.object({
  blogId: z.coerce.number(),
});

export const blogBodySchema = z.object({
  title: z.coerce.string(),
  content: z.coerce.string(),
  isPublished: z.coerce.boolean(),
});
export const idSchema = z.object({
  id: z.coerce.number(),
});

//reactioncontroller validation   schema
export const ReactionSchema = z.enum(["LIKE", "DISLIKE"]);
