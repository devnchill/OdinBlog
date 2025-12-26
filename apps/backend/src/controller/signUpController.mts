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
    const existingUser = await prisma.user.findUnique({ where: { userName } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "userName already exists. Please use a different userName",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        userName,
        hashedPassword,
      },
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function createAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userName, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { userName } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "userName already exists. Please use a different userName",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        userName,
        hashedPassword,
        role: "AUTHOR",
      },
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
}
