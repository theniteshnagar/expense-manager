const express = require("express");
const mongoose = require("mongoose");
const { PORT, MONGODB_URI } = require("./utils/constants.utils");

const app = express();

mongoose.connect(MONGODB_URI)

app.get("/", (req, res) => {
  res.send("SERVER RUNNING!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
