import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { TUserOnReq } from "../types/express.mjs";

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
    const reqUser: TUserOnReq = {
      id: user.id,
      userName: user.userName,
    };

    const token = jwt.sign(
      reqUser,
      process.env.SECRET || "shhhhit'sasecretyeahdon'ttellanyone",
    );

    return res.status(200).json({
      message: "login successfull",
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
}
