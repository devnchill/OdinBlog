import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import bcrypt from "bcryptjs";
import { generateTokens } from "../util/generateTokens.mjs";

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      return res.status(401).json({
        success: false,
        message: "invalid body",
      });
    const user = await prisma.user.findFirst({ where: { userName } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "invalid userName or password",
      });
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: `invalid username or password`,
      });
    }
    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return res.status(200).json({
      message: "login successfull",
      success: true,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
}
