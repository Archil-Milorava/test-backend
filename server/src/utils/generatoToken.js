import jwt from "jsonwebtoken";

export const generateToken = (id, role, res) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("userAuthentication", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return token;
};


