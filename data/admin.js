import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

export const adminId = new mongoose.Types.ObjectId();

export const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("HowardAdmin123", 10);

  const admin = {
    _id: adminId,
    firstName: "Howard",
    lastName: "Harrison",
    email: "peterthureain@gmail.com",
    password: hashedPassword,
    role: "superadmin",
    permissions: {
      manageUsers: true,
      manageCategories: true,
      manageBooks: true,
      manageReviews: true,
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const existing = await Admin.findOne({ email: admin.email });
  if (!existing) {
    await Admin.create(admin);
    console.log("✅ Admin seeded");
  } else {
    console.log("ℹ️ Admin already exists");
  }
};
