import express from "express";
import { adminLogin, login, register } from "../controllers/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

//user
router.post("/login", login);
router.post("/register", upload.single('profileImage'), register);
//admin
router.post("/admin/login", adminLogin);

export default router;