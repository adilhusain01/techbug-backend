import express from 'express';
import {
  createBlogpost,
  deleteBlogpost,
  getBlogpostById,
  getBlogpostBySlug,
  getBlogpostMetaByTag,
  getBlogposts,
  getBlogpostsMeta,
  getBlogpostsMetaAll,
  updateBlogpost,
} from '../controllers/blogpostController.js';

const router = express.Router();

router.route('/posts').get(getBlogposts).post(createBlogpost);

router
  .route('/posts/:id')
  .get(getBlogpostById)
  .get(getBlogpostByIdAll)
  .put(updateBlogpost)
  .delete(deleteBlogpost);
router.route('/posts/slug/:slug').get(getBlogpostBySlug);

//only enough content of a post
router.get('/meta', getBlogpostsMeta);
router.get('/meta/:tags', getBlogpostMetaByTag);

//for the dashboard all published and unpublished ones
router.get('/allmeta', getBlogpostsMetaAll);

export default router;
