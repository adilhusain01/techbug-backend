import express from 'express';
import {
  getWorks,
  createWork,
  updateWork,
  deleteWork,
  getWorkByTag,
} from '../controllers/workController.js';

const router = express.Router();

router.route('/').get(getWorks).post(createWork);

router.route('/:id').put(updateWork).delete(deleteWork);

router.route('/:tag').get(getWorkByTag);

export default router;
