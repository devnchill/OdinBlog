import { Role } from "../../generated/prisma/enums.js";
import type { TUserOnReq } from "../types/express.mjs";

type Ownable = { authorId: string } | { userId: string };

export default async function verifyOwnership<T extends Ownable>(
  user: TUserOnReq,
  resource: T,
): Promise<boolean> {
  const { role } = user;
  if (
    role === Role.ADMIN ||
    ("userId" in resource && resource.userId === user.id) ||
    ("authorId" in resource && resource.authorId === user.id)
  ) {
    return true;
  }

  return false;
}
