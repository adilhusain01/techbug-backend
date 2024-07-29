import express from 'express';
import {getCard} from '../controllers/home.controller.js'
import {getTestimonial} from '../controllers/home.controller.js'

const router = express.Router();

router.get('/getCard', getCard);
router.get('/getTestimonial', getTestimonial);

export default router;