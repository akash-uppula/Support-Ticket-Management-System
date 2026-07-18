import jwt from "jsonwebtoken";

import { IUser } from "../models/User.js";

interface TokenPayload {
  userId: string;

  role: IUser["role"];
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
};
