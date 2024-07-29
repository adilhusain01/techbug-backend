import express from 'express';
import {Contact} from '../controllers/contact.controller.js';

const router = express.Router();
router.post("/postContact", Contact);

export default router;
