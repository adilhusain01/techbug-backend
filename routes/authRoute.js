import express from 'express';
import { handleLogin, handleLogout } from '../controllers/authController';

const router = express.Router();

router.route('/login').post(handleLogin);
router.route('/logout').post(handleLogout);

export default router;
