import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

import dotenv from "dotenv";

import connectDB from "../config/db.js";

import { SALT_ROUNDS } from "../constants/security.js";

dotenv.config();

const createAdmin = async () => {
  await connectDB();

  const existingAdmin = await UserModel.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (existingAdmin) {
    console.log("Admin already exists");

    process.exit();
  }

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD!,
    SALT_ROUNDS,
  );

  await UserModel.create({
    name: process.env.ADMIN_NAME,

    email: process.env.ADMIN_EMAIL,

    password: hashedPassword,

    role: "admin",
  });

  console.log("Admin created successfully");

  process.exit();
};

createAdmin();
