import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../client/prismaClient.mjs";
import { generateTokens } from "../util/generateTokens.mjs";
import type { TUserOnReq } from "../types/express.mjs";

const authRouter = Router();

authRouter.get("/refresh", async (req: Request, res: Response) => {
  const rToken = req.cookies.refreshToken;
  if (!rToken) return res.sendStatus(401);

  try {
    const payload = jwt.verify(rToken, process.env.REFRESH_TOKEN_SECRET!) as {
      id: string;
    };

    const user: TUserOnReq | null = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, userName: true, role: true },
    });

    if (!user) return res.sendStatus(404);

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      success: true,
      accessToken,
      message: "generated new accessToken",
      role: user.role,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: "something went wrong while verifying refreshToken",
    });
  }
});

export default authRouter;
