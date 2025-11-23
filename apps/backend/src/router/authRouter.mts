import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../client/prismaClient.mjs";
import { generateTokens } from "../util/generateTokens.mjs";
import type { TUserOnReq } from "../types/express.mjs";

const authRouter = Router();

authRouter.get("/", async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!,
      ) as TUserOnReq;

      return res.json({
        success: true,
        user: {
          id: decoded.id,
          userName: decoded.userName,
          role: decoded.role,
        },
        message: "access token verified",
      });
    } catch (err) {
      if (!(err instanceof jwt.TokenExpiredError)) {
        return res
          .status(403)
          .json({ success: false, message: "invalid access token" });
      }
    }
  }

  if (refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
      ) as { id: string };

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, userName: true, role: true },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "refresh token valid but user not found",
        });
      }

      const { accessToken: newA, refreshToken: newR } = generateTokens(user);

      res.cookie("accessToken", newA, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
        maxAge: 30 * 60 * 1000,
      });

      res.cookie("refreshToken", newR, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        success: true,
        user,
        message: "refreshed tokens successfully",
      });
    } catch {
      return res.status(403).json({
        success: false,
        message: "invalid or expired refresh token",
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: "no valid tokens provided",
  });
});

export default authRouter;
