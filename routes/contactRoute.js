import express from 'express';
import {
  makeContact,
  getContacts,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/').get(getContacts).post(makeContact);

router.delete('/:id', deleteContact);

export default router;
