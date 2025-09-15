import type { Blog } from "../generated/prisma/client.js";
import { Role } from "../generated/prisma/enums.js";
import type { TUserOnReq } from "../types/express.mjs";

export default function verifyOwnership(
  user: TUserOnReq,
  blog: Blog,
): { success: boolean } {
  if (
    user.role === Role.ADMIN ||
    (user.role === Role.AUTHOR && blog.authorId === user.id)
  )
    return { success: true };

  return { success: false };
}
