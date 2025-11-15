import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../util/verifyOwnership.mjs";
import { Prisma } from "../generated/prisma/client.js";

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
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    });
    console.log(comments);

    return res.status(200).json({
      success: true,
      message: `sending all comments for blogId : ${blogId}`,
      comments,
    });
  } catch (err) {
    next(err);
  }
}

export async function createComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId, text, id } = req.validationData;
  const userId = id;
  try {
    const comment = await prisma.comment.create({
      data: {
        userId,
        text,
        blogId,
      },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
          },
        },
      },
    });
    return res.status(201).json({
      success: true,
      message: "comment created successfully",
      data: comment,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2003") {
        return res.status(404).json({
          success: false,
          message: `Could not find blog with blogId ${blogId}`,
        });
      }
    }
    next(e);
  }
}

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId, commentId, id } = req.validationData;
  console.log("blogId", blogId, "commentId", commentId, "userid", id);

  try {
    const comment = await prisma.comment.findUniqueOrThrow({
      where: {
        id: commentId,
      },
    });
    const isAllowed = await verifyOwnership(req.user!, comment);
    console.log(isAllowed);

    if (isAllowed) {
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
      return res.status(200).json({
        success: true,
        message: `Deleted comment ${commentId} from blog ${blogId}`,
        data: comment,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Comment or blog not found" });
    }
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
      where: { id: commentId },
    });

    const isAllowed = await verifyOwnership(req.user!, existingComment);
    if (!isAllowed) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { text },
    });

    return res.status(200).json({
      success: true,
      message: `Updated comment with id ${commentId}`,
      data: updatedComment,
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return res.status(404).json({
        success: false,
        message: `Comment with id ${commentId} not found`,
      });
    }
    next(err);
  }
}
