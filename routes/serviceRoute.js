import express from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = express.Router();

router.route('/').get(getServices).post(createService);

router.route('/:id').put(updateService).delete(deleteService);

export default router;
