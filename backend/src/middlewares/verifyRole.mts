import { type NextFunction, type Request, type Response } from "express";
import { Role } from "../generated/prisma/enums.js";

export default function verifyRole(role: Role) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    if (req.user.role === Role.ADMIN || req.user.role === role) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Forbidden: insufficient role",
    });
  };
}
