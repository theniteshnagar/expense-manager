const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please add a payment method"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
  },
  {
    timestamps: true,
  },
);

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
