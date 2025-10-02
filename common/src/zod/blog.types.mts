import { z } from "zod";

//blogcontroller validation schemas
export const blogIdSchema = z.object({
  blogId: z.coerce.string(),
});

export const blogBodySchema = z.object({
  title: z.coerce.string(),
  content: z.coerce.string(),
  isPublished: z.coerce.boolean(),
});
