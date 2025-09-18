import { Role } from "../generated/prisma/enums.js";
import type { TUserOnReq } from "../types/express.mjs";

type Ownable = { authorId: number } | { userId: number };

export default function verifyOwnership<T extends Ownable>(
  user: TUserOnReq,
  resource: T,
): { success: boolean } {
  if (
    user.role === Role.ADMIN ||
    (user.role === Role.AUTHOR &&
      (("userId" in resource && resource.userId === user.id) ||
        ("authorId" in resource && resource.authorId === user.id)))
  ) {
    return { success: true };
  }

  return { success: false };
}
