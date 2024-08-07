const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createOllamaQuery = require("./utils/createInputQuery");

// Constants
const app = express();
const PORT = 3000;
const MODEL_URL = "http://localhost:11434/api/chat";

// Middlewares defined
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/chat", async (req, res) => {
  const placerholderQuery = 'just say "Hello, how can I help you today?"';
  const query = req?.body?.query || placerholderQuery;

  try {
    const response = await axios.post(MODEL_URL, createOllamaQuery(query));
    const {
      message: { content },
    } = response?.data;

    res.json({ content });
  } catch (error) {
    console.log("Error fetching model response, full error - ", error);
    res.status(500).json({ error: "Error fetching model response" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
