import type { Request, Response, NextFunction } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../middlewares/verifyOwnership.mjs";

export async function createReaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId } = req.params;
  const numberBlogId = Number(blogId);
  if (!blogId || Number.isNaN(numberBlogId)) {
    return res.status(400).json({
      success: false,
      message: `invalid blogId ${blogId}`,
    });
  }
  const { reactionType } = req.body;
  if (!reactionType) {
    return res.status(400).json({
      success: false,
      message: `invalid reaction`,
    });
  }
  try {
    const userId = req.user!.id;
    const createdReaction = await prisma.reaction.create({
      data: {
        userId,
        blogId: numberBlogId,
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
  const { blogId } = req.body;
  if (!blogId || !Number(blogId)) {
    return res.status(400).json({
      success: false,
      message: `invalid blogId ${blogId}`,
    });
  }
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
  const { reactionId } = req.params;
  const id = Number(reactionId);
  if (Number.isNaN(id) || !reactionId)
    return res.status(400).json({
      success: false,
      message: `invalid reactionId ${reactionId}`,
    });
  const { reactionType } = req.body;
  if (!reactionType)
    return res.status(400).json({
      success: false,
      message: "reaction not found in the body",
    });
  try {
    const existingReaction = await prisma.reaction.findUnique({
      where: {
        id,
      },
    });
    if (!existingReaction) {
      return res.status(404).json({
        success: false,
        message: "reaction not found",
      });
    }
    const isAllowed = await verifyOwnership(req.user!, existingReaction);
    if (isAllowed) {
      const updatedreaction = await prisma.reaction.update({
        where: {
          id,
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
  const { reactionId } = req.params;
  const id = Number(reactionId);
  if (Number.isNaN(id) || !reactionId)
    return res.status(400).json({
      success: false,
      message: `invalid reactionId ${reactionId}`,
    });
  try {
    const existingReaction = await prisma.reaction.findUnique({
      where: {
        id,
      },
    });
    if (!existingReaction) {
      return res.status(404).json({
        success: false,
        message: "reactiong not found",
      });
    }
    const isAllowed = await verifyOwnership(req.user!, existingReaction);
    if (isAllowed) {
      await prisma.reaction.delete({
        where: {
          id,
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
