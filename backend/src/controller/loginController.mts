import type { Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { TUserOnReq } from "../types/express.mjs";

export async function loginUser(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      return res.status(401).json({
        success: false,
        message: "invalid body",
      });
    const user = await prisma.user.findFirst({ where: { userName } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `user with username ${userName} does not exists`,
      });
    }
    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
      return res.status(404).json({
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
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "login successfull",
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}
