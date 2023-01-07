import express from "express";
import { getMe, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.get('/me', protect, getMe)
// router.route('/me', protect).get(getMe)

export { router as userRouter };
