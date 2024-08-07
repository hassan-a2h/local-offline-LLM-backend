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

function createOllamaQuery(input) {
  return {
    model: "dolphin-llama3",
    messages: [{ role: "user", content: `${input}` }],
    stream: false,
  };
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
