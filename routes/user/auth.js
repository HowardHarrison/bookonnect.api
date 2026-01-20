import express from "express";
import { adminLogin, login, register } from "../../controllers/user/auth.js";
import upload from "../../middleware/multer.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", upload.single('profileImage'), register);

export default router;