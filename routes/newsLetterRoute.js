import express from 'express';
import {
  getNewsLetter,
  createNewsLetter,
  updateNewsLetter,
  deleteNewsLetter,
} from '../controllers/newsLetterController.js';

const router = express.Router();

router.route('/').get(getNewsLetter).post(createNewsLetter);

router.route('/:id').put(updateNewsLetter).delete(deleteNewsLetter);

export default router;
