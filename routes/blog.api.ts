import express from "express";
import { blogController } from "../controllers/blog.controller";
export const router = express.Router();

router.post("/", blogController.createBlog);
router.get("/", blogController.getBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
