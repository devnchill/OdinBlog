import type { Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";
import verifyOwnership from "../middlewares/verifyOwnership.mjs";

export async function getAllBlogs(_req: Request, res: Response) {
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
    //TODO: check for different prisma error
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export async function getBlog(req: Request, res: Response) {
  const { blogId } = req.params;
  const id = Number(blogId);
  if (!blogId || Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "invalid blogId" });
  }
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
      message: `sending blog with blogId ${blogId}`,
      data: blog,
    });
  } catch (err) {
    //TODO: check for different prisma error
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export async function createBlog(req: Request, res: Response) {
  const { title, content, isPublished } = req.body;
  const authorId = req.user.id;
  if (!title || !content || !authorId)
    return res.status(400).json({
      success: false,
      message: "authorId,title or content for creating blog not found",
    });
  try {
    const blog = await prisma.blog.create({
      data: {
        authorId,
        title,
        content,
        isPublished: isPublished ?? true,
      },
    });
    return res.status(201).json({
      success: true,
      message: "blog created",
      data: blog,
    });
  } catch (err) {
    //TODO: check for different prisma error
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export async function deleteBlog(req: Request, res: Response) {
  const { blogId } = req.params;
  const id = Number(blogId);
  if (Number.isNaN(id) || !blogId)
    return res.status(400).json({
      success: false,
      message: "invalid blogId",
    });
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const isAllowed = verifyOwnership(req.user, blog);
    if (isAllowed) {
      await prisma.blog.delete({
        where: {
          id,
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
    //TODO: check for different prisma error
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export async function editBlog(req: Request, res: Response) {
  const { blogId } = req.params;
  const id = Number(blogId);
  if (!blogId || Number.isNaN(id))
    return res.status(400).json({
      success: false,
      message: "invalid blogId",
    });
  const { title, content, isPublished } = req.body;
  if (!title || !content)
    return res.status(400).json({
      success: false,
      message: "authorId,title or content for creating blog not found",
    });
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const isAllowed = verifyOwnership(req.user, blog);
    if (isAllowed) {
      await prisma.blog.update({
        data: {
          title,
          content,
          isPublished: isPublished ?? true,
        },
        where: {
          id,
        },
      });
      return res.status(200).json({
        success: true,
        message: `deleted blog with blogId ${blogId}`,
        data: blog,
      });
    }

    return res.status(401).json({
      success: false,
      message: `Unauthorized`,
    });
  } catch (err) {
    console.log(err);
    //TODO: check for different prisma error
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}
