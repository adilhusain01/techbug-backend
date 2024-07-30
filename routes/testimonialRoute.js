import express from 'express';
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';

const router = express.Router();

router.route('/').get(getTestimonials).post(addTestimonial);

router.route('/:id').put(updateTestimonial).delete(deleteTestimonial);

export default router;
