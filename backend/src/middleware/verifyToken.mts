import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { TUserOnReq } from "../types/express.mjs";
import prisma from "../client/prismaClient.mjs";
import { generateTokens } from "../util/generateTokens.mjs";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!,
      ) as TUserOnReq;
      req.user = decoded;
      return next();
    } catch (err) {
      if (!(err instanceof jwt.TokenExpiredError))
        return res
          .status(403)
          .json({ success: false, message: "Invalid token" });
    }
  }
  if (refreshToken) {
    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
      ) as { id: string };
      const user = await prisma.user.findUnique({
        where: { id: decodedRefresh.id },
      });
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      const reqUser: TUserOnReq = {
        id: user.id,
        userName: user.userName,
        role: user.role,
      };
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        generateTokens(reqUser);
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      req.user = reqUser;
      return next();
    } catch {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token invalid or expired" });
    }
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
}
