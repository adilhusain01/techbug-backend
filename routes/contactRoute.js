import express from 'express';
import {
  createContact,
  getContacts,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/').get(getContacts).post(createContact);

router.delete('/:id', deleteContact);

export default router;
