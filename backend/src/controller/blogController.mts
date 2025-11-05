import type { NextFunction, Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../util/verifyOwnership.mjs";
import { Prisma } from "../generated/prisma/client.js";

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
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            userName: true,
          },
        },
        _count: {
          select: {
            Comment: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "sending all blogs",
      data: blogs,
    });
  } catch (e) {
    next(e);
  }
}
export async function getBlogOfAuthor(
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
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            userName: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      message: `sending blog with blogId ${blogId}`,
      data: blog,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: `Could not find blog with blogId ${blogId}`,
        });
      }
    }
    next(e);
  }
}

export async function getBlog(req: Request, res: Response, next: NextFunction) {
  const { blogId } = req.validationData;
  try {
    const blog = await prisma.blog.findUniqueOrThrow({
      where: {
        id: blogId,
        isPublished: true,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            userName: true,
          },
        },
        Comment: {
          select: {
            user: {
              select: {
                id: true,
                userName: true,
              },
            },
            id: true,
            text: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        Reaction: {
          select: {
            user: {
              select: {
                id: true,
                userName: true,
              },
            },
            id: true,
            type: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      message: `sending blog with blogId ${blogId}`,
      data: blog,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: `Could not find blog with blogId ${blogId}`,
        });
      }
    }
    next(e);
  }
}

export async function getAllBlogsOfAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.validationData;
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: id,
      },
    });
    return res.status(200).json({
      success: true,
      message: `sending all blogs created by author with authorId ${id}`,
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
}

export async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id, title, content, isPublished } = req.validationData;
  console.log("id while creating blog is", id);

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
        select: {
          title: true,
          content: true,
          updatedAt: true,
          createdAt: true,
          author: {
            select: {
              userName: true,
            },
          },
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
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: `Could not find blog with blogId ${blogId}`,
        });
      }
    }
    next(e);
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
        select: {
          title: true,
          content: true,
          updatedAt: true,
          createdAt: true,
          author: {
            select: {
              userName: true,
            },
          },
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
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: `Could not find blog with blogId ${blogId}`,
        });
      }
    }
    next(e);
  }
}
