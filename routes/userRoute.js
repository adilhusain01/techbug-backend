import express from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsersMeta,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/meta').get(getUsersMeta);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default router;
