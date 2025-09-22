import { z } from "zod";

//blogcontroller validation schemas
export const blogIdSchema = z.coerce.number();
export const blogBodySchema = z.object({
  title: z.coerce.string(),
  content: z.coerce.string(),
  isPublished: z.coerce.boolean(),
});
export const authorIdSchema = z.coerce.number();

//reactioncontroller validation   schema
export const ReactionSchema = z.enum(["LIKE", "DISLIKE"]);
