import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import bcrypt from "bcryptjs";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userName, password } = req.body;
    await prisma.user.findUniqueOrThrow({
      where: { userName },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        userName,
        hashedPassword,
      },
    });

    res.status(200).send({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    next(err);
  }
}
