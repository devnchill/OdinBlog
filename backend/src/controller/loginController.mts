import type { Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import bcrypt from "bcryptjs";

export async function loginUser(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;
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
  } catch (err) {}
}
