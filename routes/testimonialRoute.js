import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';

const router = express.Router();

router.route('/').get(getTestimonials).post(createTestimonial);

router.route('/:id').put(updateTestimonial).delete(deleteTestimonial);

export default router;
