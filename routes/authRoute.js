import express from 'express';
import { handleLogin, handleLogout } from '../controllers/authController.js';

const router = express.Router();

router.route('/login').post(handleLogin);
router.route('/logout').get(handleLogout);

export default router;
