import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);

  const existingAdmin = await UserModel.findOne({
    email: "admin@test.com",
  });

  if (existingAdmin) {
    console.log("Admin already exists");

    process.exit();
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await UserModel.create({
    name: "Admin",

    email: "admin@test.com",

    password: hashedPassword,

    role: "admin",
  });

  console.log("Admin created successfully");

  process.exit();
};

createAdmin();
