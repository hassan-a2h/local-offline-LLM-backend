const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;
const MODEL_URL = "http://localhost:11434/api/chat";

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
