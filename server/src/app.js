import cors from "cors";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import { v2 as cloudinary } from "cloudinary";

import blogRouter from "./routes/blogs/blog.routes.js";
import userRouter from "./routes/users/user.routes.js";

const app = express();

app.use(cookieParser())

app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({
  limit: '50mb'
}));

app.use("/api/v1", blogRouter);
app.use("/api/v1", userRouter)

export default app;
