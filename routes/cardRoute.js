import express from 'express';
import {
  getCards,
  addCard,
  updateCard,
  deleteCard,
} from '../controllers/cardController.js';

const router = express.Router();

router.route('/').get(getCards).post(addCard);

router.route('/:id').put(updateCard).delete(deleteCard);

export default router;
