import express from 'express';
import { makeContact } from '../controllers/contactController.js';

const router = express.Router();

router.route('/').post(makeContact);

export default router;
