import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../middlewares/verifyOwnership.mjs";

export async function getAllCommentsOfABlog(
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
    await prisma.comment.findMany({
      where: {
        blogId,
      },
    });
    return res.status(200).json({
      success: true,
      message: `sending all comments for blogId : ${blogId}`,
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
  const { blogId } = req.params;
  const numberBlogId = Number(blogId);
  if (!blogId || Number.isNaN(numberBlogId)) {
    return res.status(400).json({
      success: false,
      message: `invalid blogId ${blogId}`,
    });
  }
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({
      success: false,
      message: `invalid comment`,
    });
  }
  try {
    const userId = req.user!.id;
    const comment = await prisma.comment.create({
      data: {
        userId,
        text,
        blogId: numberBlogId,
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
  const { blogId } = req.params;
  const id = Number(blogId);
  if (Number.isNaN(id) || !blogId)
    return res.status(400).json({
      success: false,
      message: `invalid blogId ${blogId}`,
    });
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "comment not found",
      });
    }
    const isAllowed = await verifyOwnership(req.user!, comment);
    if (isAllowed) {
      await prisma.comment.delete({
        where: {
          id,
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
  const { commentId } = req.params;
  const id = Number(commentId);
  if (Number.isNaN(id) || !commentId)
    return res.status(400).json({
      success: false,
      message: `invalid commentId ${commentId}`,
    });
  const { comment } = req.body;
  if (!comment)
    return res.status(400).json({
      success: false,
      message: "comment not found in the body",
    });
  try {
    const existingComment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "comment not found",
      });
    }
    const isAllowed = await verifyOwnership(req.user!, existingComment);
    if (isAllowed) {
      const updatedComment = await prisma.comment.update({
        where: {
          id,
        },
        data: {
          text: comment,
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
