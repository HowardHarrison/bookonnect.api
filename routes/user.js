import express from "express";
import { getUserById, toggleSavedBook } from '../controllers/user.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', verifyToken, getUserById);
router.patch('/:userId/toggle-book', verifyToken, toggleSavedBook);
export default router;
