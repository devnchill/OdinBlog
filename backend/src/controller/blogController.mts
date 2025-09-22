import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../util/verifyOwnership.mjs";
import { blogIdSchema, blogBodySchema, authorIdSchema } from "@odinblog/common";

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
  const id = req.validationData;
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: `Blog ${id} not found` });
    }

    return res.status(200).json({
      success: true,
      message: `sending blog with blogId ${id}`,
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
  const blogValidation = req.validationData;
  const authorId = req.user?.id;
  const authorIdValidation = authorIdSchema.safeParse(authorId);
  if (!authorIdValidation.success) {
    return res.status(400).json({
      success: false,
      message: authorIdValidation.error.issues,
    });
  }
  try {
    const blog = await prisma.blog.create({
      data: {
        authorId: authorIdValidation.data,
        title: blogValidation.data.title,
        content: blogValidation.data.content,
        isPublished: blogValidation.data.isPublished,
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
  const { blogId } = req.params;
  const blogValidation = blogIdSchema.safeParse(blogId);
  if (!blogValidation.success) {
    return res.status(400).json({
      success: false,
      message: blogValidation.error.issues,
    });
  }
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogValidation.data,
      },
    });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const isAllowed = await verifyOwnership(req.user!, blog);
    if (isAllowed) {
      await prisma.blog.delete({
        where: {
          id: blogValidation.data,
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
  const { blogId } = req.params;
  const blogIdValidation = blogIdSchema.safeParse(blogId);
  const blogPayload = req.body;
  const blogValidation = blogBodySchema.safeParse(blogPayload);
  if (!blogValidation.success) {
    return res.status(400).json({
      success: false,
      message: blogValidation.error.issues,
    });
  }
  if (!blogIdValidation.success) {
    return res.status(400).json({
      success: false,
      message: blogIdValidation.error.issues,
    });
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogIdValidation.data,
      },
    });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const isAllowed = await verifyOwnership(req.user!, blog);
    if (isAllowed) {
      const updatedBLog = await prisma.blog.update({
        data: {
          title: blogValidation.data.title,
          content: blogValidation.data.content,
          isPublished: blogValidation.data.isPublished,
        },
        where: {
          id: blogIdValidation.data,
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
