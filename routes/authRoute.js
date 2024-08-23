import express from 'express';
import { handleLogin, handleLogout } from '../controllers/authController.js';

const router = express.Router();

router.route('/logout').post(handleLogout);
router.route('/login').post(handleLogin);

export default router;
