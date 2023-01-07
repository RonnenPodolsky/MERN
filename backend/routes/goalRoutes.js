import express from "express";
import { deleteGoal, getGoals, setGoals, updateGoal } from '../controllers/goalController.js';
const router = express.Router();

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').put(updateGoal).delete(deleteGoal)

export { router as goalsRouter };
