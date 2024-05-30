import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface BlogType {
  title: string;
  author: string;
  body: string;
  date: Date;
  [key: string]: any; // Index signature
}

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
