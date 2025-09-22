import z from "zod";

//reactioncontroller validation   schema
export const reactionSchema = z.object({
  reactionType: z.enum(["LIKE", "DISLIKE"]),
});
export const reactionIdSchema = z.object({
  reactionId: z.coerce.number(),
});
