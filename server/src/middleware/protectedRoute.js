import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const authToken = req.cookies.userAuthentication;

    if (!authToken) {
      return res.status(400).json({
        message: "please log in first",
      });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "session expired" });
    }

    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(401).json({ message: "Please log in first" });
    }

    req.user = currentUser;

    next();
  } catch (error) {
    console.log("error from protectedRoute", error);
    res.status(500).json({ message: "error from protectedRoute" });
  }
};
