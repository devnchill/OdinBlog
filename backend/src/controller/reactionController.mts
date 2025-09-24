import type { Request, Response, NextFunction } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../util/verifyOwnership.mjs";

export async function createReaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId, reactionType, userId } = req.validationData;
  try {
    const createdReaction = await prisma.reaction.create({
      data: {
        userId,
        blogId,
        type: reactionType,
      },
    });
    return res.status(200).json({
      success: true,
      message: "reaction created successfully",
      data: createdReaction,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllReaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId } = req.validationData;
  try {
    await prisma.reaction.findMany({
      where: {
        blogId,
      },
    });
    return res.status(200).json({
      success: true,
      message: `sending all reactions for blogId : ${blogId}`,
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
      where: {
        id: reactionId,
      },
    });

    const isAllowed = await verifyOwnership(req.user!, existingReaction);
    if (isAllowed) {
      const updatedreaction = await prisma.reaction.update({
        where: {
          id: reactionId,
        },
        data: {
          type: reactionType,
        },
      });
      return res.status(200).json({
        success: true,
        message: `updated reaction with reactionId ${reactionId}`,
        data: updatedreaction,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteReactiong(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { reactionId } = req.validationData;
  try {
    const existingReaction = await prisma.reaction.findUniqueOrThrow({
      where: {
        id: reactionId,
      },
    });
    const isAllowed = await verifyOwnership(req.user!, existingReaction);
    if (isAllowed) {
      await prisma.reaction.delete({
        where: {
          id: reactionId,
        },
      });
      return res.status(200).json({
        success: true,
        message: `deleted reactiong with reactionId ${reactionId}`,
        data: existingReaction,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    next(err);
  }
}
