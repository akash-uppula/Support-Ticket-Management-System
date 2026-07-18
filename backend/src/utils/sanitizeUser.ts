import { User } from "../models/User.js";

export const sanitizeUser = (user: User) => {
  const userObject = user.toObject();

  const { password, ...safeUser } = userObject;

  return safeUser;
};
