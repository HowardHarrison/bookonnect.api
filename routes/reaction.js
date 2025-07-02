import express from 'express';
import { toggleReaction, getReactionStatus } from '../controllers/reaction.js';

const router = express.Router();

router.post('/', toggleReaction);
router.get('/status', getReactionStatus);

export default router;
