import express from "express";
import { router as blogApi } from "./blog.api";

export const router = express.Router();

router.use("/blog", blogApi);
