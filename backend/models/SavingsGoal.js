import mongoose from "mongoose";

const savingsGoalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    targetAmount: { type: Number, required: true, min: 0 },
    currentAmount: { type: Number, required: true, min: 0, default: 0 },
    targetDate: { type: Date }
  },
  { timestamps: true }
);

savingsGoalSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("SavingsGoal", savingsGoalSchema);
