import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const userId = new mongoose.Types.ObjectId();

export const seedUser = async () => {
  const hashedPassword = await bcrypt.hash("ThureinUser123", 10);

  const user = {
    _id: userId,
    firstName: "Thurein",
    lastName: "Win Htun",
    email: "thurein.zotefamily@gmail.com",
    password: hashedPassword,
    profileImage: "",
    savedBooks: ["685636ba9ddf61d16dbc882c","685636ba9ddf61d16dbc8829"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const existing = await User.findOne({ email: user.email });
  if (!existing) {
    await User.create(user);
    console.log("✅ User seeded");
  } else {
    console.log("ℹ️ User already exists");
  }
};
