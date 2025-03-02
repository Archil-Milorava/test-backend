import User from "../../models/user.model.js";

import bcrypt from "bcrypt";
import Blog from "../../models/blog.model.js";
import { generateToken } from "../../utils/generatoToken.js";

export const createUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.status(400).json({
        message: "please enter credentials",
      });
    }

    if (userName.length > 15) {
      return res.status(400).json({
        message: "usern name must bu max 15 charachters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 charachters",
      });
    }

    const existingUsername = await User.findOne({ userName });

    if (existingUsername) {
      return res.status(400).json({
        message: "The username is already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      userName,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    console.log("error from create user", error);
    res.status(500).json({
      message: "error from internal server",
    });
  }
};

export const logIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.status(400).json({
        message: "please enter credentials",
      });
    }

    const existingUser = await User.findOne({ userName });

    if (!existingUser) {
      return res.status(400).json({
        message: "please enter valid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password || "");

    if (!isMatch) {
      return res.status(400).json({
        message: "please enter valid credentials",
      });
    }

    generateToken(existingUser._id, existingUser.role, res);

    existingUser.password = undefined;

    res.status(200).json({
      existingUser,
    });
  } catch (error) {
    console.log("error from login user", error);
    res.status(500).json({
      message: "error from internal server",
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("userAuthentication");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error from logout user", error);
    res.status(500).json({
      message: "error from internal server",
    });
  }
};

export const authCheck = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.log("error from authCheck", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likeUnlikePost = async (req, res) => {
  const userId = req.user._id;
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(400).json({
        message: "Blog can not be found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User can not be found",
      });
    }

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      //unlike
      await Blog.findByIdAndUpdate(blogId, { $pull: { likes: userId } });
      await User.findByIdAndUpdate(userId, { $pull: { likes: blogId } });
    } else {
      //like
      await Blog.findByIdAndUpdate(blogId, { $push: { likes: userId } });
      await User.findByIdAndUpdate(userId, { $push: { likes: blogId } });
    }

    res.status(201).json({
      message: alreadyLiked ? "unliked" : "liked",
    });
  } catch (error) {
    console.log("error from likeUnlikePost", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
