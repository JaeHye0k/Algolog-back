import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { router as indexRouter } from "./routes/index";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);
const port = 8000;

const mongoURI: string = "mongodb://localhost:27017/blog-demo";
mongoose.connect(mongoURI).then(
  () => console.log("mongoose connected!"),
  () => console.log("connect failed")
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
