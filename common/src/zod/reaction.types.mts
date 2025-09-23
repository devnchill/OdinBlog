import z from "zod";

//reactioncontroller validation   schema
export const reactionSchema = z.object({
  reactionType: z.enum(["LIKE", "DISLIKE"]),
});
