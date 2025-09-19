import { type NextFunction, type Request, type Response } from "express";
import { Role } from "../generated/prisma/enums.js";
import prisma from "../client/prismaClient.mjs";
import type { User } from "../generated/prisma/client.js";

export default function verifyRole(role: Role) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }
    const { id } = req.user;
    const userFromDb: Pick<User, "role"> | null = await prisma.user.findUnique({
      where: { id },
      select: {
        role: true,
      },
    });

    if (!userFromDb) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (userFromDb.role === Role.ADMIN || userFromDb.role === role) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Forbidden: insufficient role",
    });
  };
}
