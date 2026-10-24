const express = require("express");
const mongoose = require("mongoose");

const { PORT, MONGODB_URI } = require("./utils/constants.utils");
const { registerUser, loginUser } = require("./controllers/authController");

const app = express();
app.use(express.json())

mongoose.connect(MONGODB_URI)

app.post("/api/auth/register", registerUser)
app.post("/api/auth/login", loginUser)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
