import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../lib/types"; // Adjust this path as needed

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    res.status(403).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JWTPayload;
    req.user = decoded;
    next(); // go to next middleware or route handler
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
