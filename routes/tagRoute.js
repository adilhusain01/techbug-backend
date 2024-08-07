import express from 'express';
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from '../controllers/tagController.js';

const router = express.Router();

router.route('/').get(getTags).post(createTag);

router.route('/:id').put(updateTag).delete(deleteTag);

export default router;
