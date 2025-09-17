import type { Request, Response } from "express";
import prisma from "../client/prismaClient.mjs";

export async function getAllBlogs(req: Request, res: Response) {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        isPublished: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "sending all blogs",
      blogs,
    });
  } catch (err) {
    console.log(err);
    //TODO: check for different prisma error
    return res.status(501).json({
      success: false,
      message: "internal server error",
    });
  }
}

export async function getBlog(req: Request, res: Response) {
  const { blogId } = req.params;
  if (Number.isNaN(blogId) || !blogId)
    return res.status(400).json({
      success: false,
      message: "invalid blogId",
    });
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: parseInt(blogId),
      },
    });
    return res.status(400).json({
      success: true,
      message: `sending blog with blogId ${blogId}`,
      blog,
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
  const { title, content } = req.body;
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
      },
    });
    return res.status(200).json({
      success: true,
      message: "blog created",
      blog,
    });
  } catch (err) {
    //TODO: check for different prisma error
    return res.status(501).json({
      success: false,
      message: "internal server error",
    });
  }
}

export async function deleteBlog(req: Request, res: Response) {
  const { blogId } = req.params;
  if (Number.isNaN(blogId) || !blogId)
    return res.status(400).json({
      success: false,
      message: "invalid blogId",
    });
  try {
    const blog = await prisma.blog.delete({
      where: {
        id: parseInt(blogId),
      },
    });
    return res.status(400).json({
      success: true,
      message: `deleted blog with blogId ${blogId}`,
      blog,
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

export function editBlog(req: Request, res: Response) {}
