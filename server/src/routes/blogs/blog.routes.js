import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "./blog.controllers.js";

import {protectedRoute} from "./../../middleware/protectedRoute.js"


const blogRouter = express.Router();

blogRouter.get("/allBlogs", getAllBlogs);
blogRouter.get("/blog/:id", getBlog);
blogRouter.post("/create", protectedRoute, createBlog);
blogRouter.delete("/blog/delete/:id", deleteBlog);
blogRouter.patch("/blog/update/:id", updateBlog);

export default blogRouter;
