import express from 'express';
import { toggleReaction, getReactionStatus, getAllReactionStatus } from '../controllers/user/reaction.js';

const router = express.Router();

router.post('/', toggleReaction);
router.get('/status', getReactionStatus);
router.get('/all', getAllReactionStatus);
export default router;
