import { Blog } from "../models/Blog";
import { Request, Response } from "express";
import { BlogType } from "../models/Blog";

export const blogController = {
  createBlog: async function (req: Request, res: Response) {},
  getBlog: async function (req: Request, res: Response) {},
  updateBlog: async function (req: Request, res: Response) {},
  deleteBlog: async function (req: Request, res: Response) {},
};

blogController.createBlog = async (req: Request, res: Response) => {
  try {
    const { title, author, constent, date } = req.body;
    const newBlog = new Blog({ title, author, constent, date });
    await newBlog.save();
    res.status(200).json({ status: "ok", data: newBlog });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

blogController.getBlog = async (req: Request, res: Response) => {
  try {
    const blogList = await Blog.find({}).select("-__v");
    res.status(200).json({ status: "ok", data: blogList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

blogController.updateBlog = async (req: Request, res: Response) => {
  try {
    const item = (await Blog.findById(req.params?.id)) as BlogType; // type assertion
    if (!item) throw new Error("There no item you requested");
    const fields: string[] = Object.keys(req.body);
    fields.forEach((key: string) => (item[key] = req.body?.[key]));
    await item.save();
    res.status(200).json({ status: "ok", data: item });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

blogController.deleteBlog = async (req: Request, res: Response) => {
  try {
    const item = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "ok", data: item });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};
