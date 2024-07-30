import express from 'express';
import {
  createBlogpost,
  deleteBlogpost,
  getBlogpostById,
  getBlogposts,
  updateBlogpost,
} from '../controllers/blogpostController.js';

const router = express.Router();

router.route('/').get(getBlogposts).post(createBlogpost);

router
  .route('/:id')
  .get(getBlogpostById)
  .put(updateBlogpost)
  .delete(deleteBlogpost);

export default router;
