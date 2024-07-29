import express from 'express';
import { Contact } from '../controllers/contactController.js';

const router = express.Router();
router.post('/postContact', Contact);

export default router;
