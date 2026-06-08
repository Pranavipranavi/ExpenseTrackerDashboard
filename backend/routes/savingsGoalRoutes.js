import express from "express";
import {
  createSavingsGoal,
  deleteSavingsGoal,
  getSavingsGoals,
  savingsGoalRules,
  updateSavingsGoal
} from "../controllers/savingsGoalController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(protect);
router.get("/", getSavingsGoals);
router.post("/", savingsGoalRules, validate, createSavingsGoal);
router.put("/:id", savingsGoalRules, validate, updateSavingsGoal);
router.delete("/:id", deleteSavingsGoal);

export default router;
