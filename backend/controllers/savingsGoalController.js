import { body } from "express-validator";
import { isDemoMode } from "../config/db.js";
import SavingsGoal from "../models/SavingsGoal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { demoStore } from "../utils/demoStore.js";

export const savingsGoalRules = [
  body("name").trim().isLength({ min: 2 }).withMessage("Goal name is required"),
  body("targetAmount").isFloat({ min: 0 }).withMessage("Target amount must be zero or more"),
  body("currentAmount").isFloat({ min: 0 }).withMessage("Current savings must be zero or more"),
  body("targetDate").optional({ checkFalsy: true }).isISO8601().withMessage("Target date must be valid")
];

export const getSavingsGoals = asyncHandler(async (req, res) => {
  if (isDemoMode()) return res.json(demoStore.listSavingsGoals(req.user._id));

  const goals = await SavingsGoal.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(goals);
});

export const createSavingsGoal = asyncHandler(async (req, res) => {
  if (isDemoMode()) return res.status(201).json(demoStore.createSavingsGoal(req.user._id, req.body));

  const goal = await SavingsGoal.create({ ...req.body, userId: req.user._id });
  res.status(201).json(goal);
});

export const updateSavingsGoal = asyncHandler(async (req, res) => {
  if (isDemoMode()) {
    const goal = demoStore.updateSavingsGoal(req.user._id, req.params.id, req.body);
    if (!goal) {
      const error = new Error("Savings goal not found");
      error.statusCode = 404;
      throw error;
    }
    return res.json(goal);
  }

  const goal = await SavingsGoal.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!goal) {
    const error = new Error("Savings goal not found");
    error.statusCode = 404;
    throw error;
  }
  res.json(goal);
});

export const deleteSavingsGoal = asyncHandler(async (req, res) => {
  if (isDemoMode()) {
    const goal = demoStore.deleteSavingsGoal(req.user._id, req.params.id);
    if (!goal) {
      const error = new Error("Savings goal not found");
      error.statusCode = 404;
      throw error;
    }
    return res.json({ message: "Savings goal deleted" });
  }

  const goal = await SavingsGoal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!goal) {
    const error = new Error("Savings goal not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ message: "Savings goal deleted" });
});
