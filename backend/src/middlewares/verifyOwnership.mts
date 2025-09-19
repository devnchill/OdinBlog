import prisma from "../client/prismaClient.mjs";
import type { User } from "../generated/prisma/client.js";
import { Role } from "../generated/prisma/enums.js";
import type { TUserOnReq } from "../types/express.mjs";

type Ownable = { authorId: number } | { userId: number };

export default async function verifyOwnership<T extends Ownable>(
  user: TUserOnReq,
  resource: T,
): Promise<boolean> {
  const { id } = user;
  const userFromDb: Pick<User, "role"> | null = await prisma.user.findUnique({
    where: { id },
    select: {
      role: true,
    },
  });
  if (!userFromDb) {
    return false;
  }
  if (
    userFromDb.role === Role.ADMIN ||
    (userFromDb.role === Role.AUTHOR &&
      (("userId" in resource && resource.userId === user.id) ||
        ("authorId" in resource && resource.authorId === user.id)))
  ) {
    return true;
  }

  return false;
}
