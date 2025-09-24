import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../util/verifyOwnership.mjs";

export async function getAllCommentsOfABlog(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId } = req.validationData;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        blogId,
      },
    });
    return res.status(200).json({
      success: true,
      message: `sending all comments for blogId : ${blogId}`,
      comments,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function createComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId, text } = req.validationData;
  try {
    const userId = req.user!.id;
    const comment = await prisma.comment.create({
      data: {
        userId,
        text,
        blogId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "comment created successfully",
      data: comment,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId, commentId } = req.validationData;
  try {
    await prisma.blog.findFirstOrThrow({
      where: {
        id: blogId,
      },
    });
    const comment = await prisma.comment.findUniqueOrThrow({
      where: {
        id: commentId,
      },
    });
    const isAllowed = await verifyOwnership(req.user!, comment);
    if (isAllowed) {
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
      return res.status(200).json({
        success: true,
        message: `deleted comment with blogId ${blogId}`,
        data: comment,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function updateComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { commentId, text } = req.validationData;
  try {
    const existingComment = await prisma.comment.findUniqueOrThrow({
      where: {
        id: commentId,
      },
    });
    const isAllowed = await verifyOwnership(req.user!, existingComment);
    if (isAllowed) {
      const updatedComment = await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          text,
        },
      });
      return res.status(200).json({
        success: true,
        message: `updated comment with commentId ${commentId}`,
        data: updatedComment,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
