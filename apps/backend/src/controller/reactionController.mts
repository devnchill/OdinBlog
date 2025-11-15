import type { Request, Response, NextFunction } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../util/verifyOwnership.mjs";
import { Prisma } from "../generated/prisma/client.js";

export async function createReaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId, reactionType, id } = req.validationData;
  console.log(blogId);
  console.log(id);
  console.log(reactionType);

  try {
    const createdReaction = await prisma.reaction.create({
      data: { userId: id, blogId, type: reactionType },
    });

    return res.status(201).json({
      success: true,
      message: "Reaction created successfully",
      data: createdReaction,
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2003"
    ) {
      return res.status(404).json({
        success: false,
        message: "Blog or user not found",
      });
    }
    next(err);
  }
}

export async function getAllReactions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId } = req.validationData;
  try {
    const reactions = await prisma.reaction.findMany({
      where: { blogId },
      include: { user: { select: { userName: true } } },
    });

    return res.status(200).json({
      success: true,
      message: `Sending all reactions for blogId ${blogId}`,
      data: reactions,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateReaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { reactionId, reactionType } = req.validationData;
  try {
    const existingReaction = await prisma.reaction.findUniqueOrThrow({
      where: { id: reactionId },
    });

    const isAllowed = await verifyOwnership(req.user!, existingReaction);
    if (!isAllowed) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const updatedReaction = await prisma.reaction.update({
      where: { id: reactionId },
      data: { type: reactionType },
    });

    return res.status(200).json({
      success: true,
      message: `Updated reaction with id ${reactionId}`,
      data: updatedReaction,
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return res.status(404).json({
        success: false,
        message: `Reaction with id ${reactionId} not found`,
      });
    }
    next(err);
  }
}

export async function deleteReaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { reactionId } = req.validationData;
  try {
    console.log("deleting reaction with reactionid", reactionId);

    const existingReaction = await prisma.reaction.findUniqueOrThrow({
      where: { id: reactionId },
    });

    const isAllowed = await verifyOwnership(req.user!, existingReaction);
    console.log("value of is allowed is", isAllowed);

    if (!isAllowed) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await prisma.reaction.delete({ where: { id: reactionId } });

    return res.status(200).json({
      success: true,
      message: `Deleted reaction with id ${reactionId}`,
      data: existingReaction,
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return res.status(404).json({
        success: false,
        message: `Reaction with id ${reactionId} not found`,
      });
    }
    next(err);
  }
}
