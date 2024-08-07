import express from 'express';
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';

const router = express.Router();

router.route('/').get(getNews).post(createNews);

router.route('/:id').put(updateNews).delete(deleteNews);

export default router;
