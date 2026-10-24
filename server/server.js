const express = require("express");
const mongoose = require("mongoose");

const { PORT, MONGODB_URI } = require("./utils/constants.utils");
const { registerUser, loginUser } = require("./controllers/authController");
const { getExpenses, createExpense, updateExpense, deleteExpense, getExpenseById } = require("./controllers/expenseController");
const { protect } = require("./middleware/authMiddleware");

const app = express();
app.use(express.json())

mongoose.connect(MONGODB_URI)

app.post("/api/auth/register", registerUser)
app.post("/api/auth/login", loginUser)

app.get("/api/expenses", protect, getExpenses)
app.get("/api/expenses", protect, getExpenseById)
app.post("/api/expenses", protect, createExpense)
app.post("/api/expenses", protect, updateExpense)
app.post("/api/expenses", protect, deleteExpense)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
