import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import bcrypt from "bcryptjs";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userName, password, role, adminPassword } = req.body;
    console.log(role);

    const existingUser = await prisma.user.findUnique({ where: { userName } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "userName already exists. Please use a different userName",
      });
    }
    if (role === "ADMIN") {
      console.log(adminPassword);

      if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({
          success: false,
          message: "invalid admin password you cheeky bastard",
        });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        userName,
        hashedPassword,
        role,
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
