import express from 'express';
import { getTestimonials } from '../controllers/testimonialController.js';
import { addTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();

router.route('/').get(getTestimonials).post(addTestimonial);

export default router;
