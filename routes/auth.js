import express from "express";
import { login, register } from "../controllers/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", upload.single('profileImage'), register);
export default router;