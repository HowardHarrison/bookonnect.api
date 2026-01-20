import express from 'express';
import {
  upsertReview,
  getReviewsByBook,
  getUserReview,
  deleteReview,
} from '../controllers/uer/review.js';

const router = express.Router();

router.post('/', upsertReview); 
router.get('/book/:bookId', getReviewsByBook); 
router.get('/user', getUserReview); 
router.delete('/', deleteReview); 

export default router;