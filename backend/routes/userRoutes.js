import express from "express";
import { registerUser, loginUser, getMe } from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(getMe)

export { router as userRouter };
