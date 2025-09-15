import type { Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import bcrypt from "bcryptjs";

export async function createUser(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;
    //TODO: Use zod for validating and sanitizing data.

    const hasUserName = await prisma.user.findFirst({
      where: { userName },
    });

    if (hasUserName)
      return res.status(409).json({
        success: false,
        message: "Username already in use",
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
    //TODO: check for different types of error .
    console.log(err);

    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}
