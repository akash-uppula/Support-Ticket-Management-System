import { Request, Response, NextFunction } from "express";

import AppError from "../utils/AppError.js";
import { verifyToken } from "../utils/verifyToken.js";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Authorization token missing", 401);
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new AppError("Invalid token format", 401);
  }

  const token = parts[1];

  const decoded = verifyToken(token);

  req.user = {
    id: decoded.userId,
    role: decoded.role,
  };

  next();
};

export default authenticate;
