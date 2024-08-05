import express from 'express';
import {
  createBlogpost,
  deleteBlogpost,
  getBlogpostById,
  getBlogpostBySlug,
  getBlogpostMetaByTag,
  getBlogposts,
  getBlogpostsMeta,
  updateBlogpost,
} from '../controllers/blogpostController.js';

const router = express.Router();

router.route('/posts').get(getBlogposts).post(createBlogpost);

router
  .route('/posts/:id')
  .get(getBlogpostById)
  .put(updateBlogpost)
  .delete(deleteBlogpost);

router.route('/posts/slug/:slug').get(getBlogpostBySlug);

router.route('/meta').get(getBlogpostsMeta).post(getBlogpostMetaByTag);

export default router;
