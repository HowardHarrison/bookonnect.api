import express from 'express';
import { getBookById, getBooks } from '../controllers/book.js';
const router = express.Router();

//fetch all books
router.get('/', getBooks);
router.get('/:id', getBookById);

export default router;