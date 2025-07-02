import express from 'express';
import { toggleReaction } from '../controllers/reaction';

const router = express.Router();

router.post('/', toggleReaction);

export default router;
