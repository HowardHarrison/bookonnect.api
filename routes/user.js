import express from "express";
import { getUserById, removeSavedBook } from '../controllers/user.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', verifyToken, getUserById);
router.patch('/:userId/remove-saved-book', verifyToken, removeSavedBook);
export default router;
