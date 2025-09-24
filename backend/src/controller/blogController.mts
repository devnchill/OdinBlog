import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../util/verifyOwnership.mjs";

export async function getAllBlogs(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  //TODO: Allow pagination so that not all blogs are fetched together.
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        isPublished: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "sending all blogs",
      data: blogs,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getBlog(req: Request, res: Response, next: NextFunction) {
  const { blogId } = req.validationData;
  try {
    const blog = await prisma.blog.findUniqueOrThrow({
      where: {
        id: blogId,
      },
    });

    return res.status(200).json({
      success: true,
      message: `sending blog with blogId ${blogId}`,
      data: blog,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id, title, content, isPublished } = req.validationData;
  try {
    const blog = await prisma.blog.create({
      data: {
        authorId: id,
        title,
        content,
        isPublished,
      },
    });
    return res.status(201).json({
      success: true,
      message: "blog created",
      data: blog,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteBlog(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId } = req.validationData;
  try {
    const blog = await prisma.blog.findUniqueOrThrow({
      where: {
        id: blogId,
      },
    });
    const isAllowed = await verifyOwnership(req.user!, blog);
    if (isAllowed) {
      await prisma.blog.delete({
        where: {
          id: blogId,
        },
      });
      return res.status(200).json({
        success: true,
        message: `deleted blog with blogId ${blogId}`,
        data: blog,
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

export async function editBlog(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogId, title, content, isPublished } = req.validationData;

  try {
    const blog = await prisma.blog.findUniqueOrThrow({
      where: {
        id: blogId,
      },
    });
    const isAllowed = await verifyOwnership(req.user!, blog);
    if (isAllowed) {
      const updatedBLog = await prisma.blog.update({
        data: {
          title,
          content,
          isPublished,
        },
        where: {
          id: blogId,
        },
      });
      return res.status(200).json({
        success: true,
        message: `edited blog with blogId ${blogId}`,
        data: updatedBLog,
      });
    }

    return res.status(401).json({
      success: false,
      message: `Unauthorized`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
