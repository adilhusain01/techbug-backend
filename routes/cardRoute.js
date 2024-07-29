import express from 'express';
import { getCards } from '../controllers/cardController.js';
import { addCard } from '../controllers/cardController.js';

const router = express.Router();

router.route('/').get(getCards).post(addCard);

export default router;
