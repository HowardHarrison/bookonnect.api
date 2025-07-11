import express from "express";
import { login, register } from "../controllers/auth.js";
//import multer from "multer";
import upload from "../middleware/multer.js";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });
const router = express.Router();

router.post("/login", login);
router.post("/register", upload.single('profileImage'), register);
export default router;