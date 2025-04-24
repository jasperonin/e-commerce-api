import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateApiKey = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(400).json({ message: `No token provided` });
  }

  const token = header.split(" ")[1];

  try {
    const decode = jwt.verify(token, env.process.JWT_SECRET_CODE);

    if (decode.role !== "admin") {
      return res.status(403).json({ message: `Not an Admin` });
    }

    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
