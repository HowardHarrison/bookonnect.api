import express from "express";
import { getUserById, toggleSavedBook, updateUserData } from '../../controllers/user/user.js';
import { verifyToken } from "../../middleware/auth.js";
import upload from "../../middleware/multer.js";

const router = express.Router();

router.get('/:id', verifyToken, getUserById);
router.patch('/:userId/toggle-book', verifyToken, toggleSavedBook);
router.put('/:userId', verifyToken, upload.single('profileImage'), updateUserData);
export default router;
