import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, unique: true, max: 100 },
    password: { type: String, required: true, min: 5 },
    role: {
      type: String,
      enum: ["superadmin", "moderator", "editor"],
      default: "editor",
    },
    permissions: {
      manageUsers: { type: Boolean, default: false },
      manageCategories: { type: Boolean, default: true },
      manageBooks: { type: Boolean, default: true },
      manageReviews: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
