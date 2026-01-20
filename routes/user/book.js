import express from 'express';
import { getBookById, getBooks, getSavedBooksById } from '../../controllers/user/book.js';
const router = express.Router();

router.get('/', getBooks);
router.get('/saved-books', getSavedBooksById);
router.get('/:id', getBookById);

export default router;