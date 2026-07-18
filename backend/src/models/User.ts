import { Schema, model, HydratedDocument } from "mongoose";

export interface IUser {
  name: string;

  email: string;

  password: string;

  role: "customer" | "admin";
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },

  {
    timestamps: true,
  },
);

export type User = HydratedDocument<IUser>;

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
