import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GOOGLE_API_KEY; // Load API key from .env
if (!apiKey) {
  throw new Error("API key not found. Please add GOOGLE_API_KEY to your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle AI prompts
app.post("/api/prompt", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response;

    res.json({ response: response.text() });
  } catch (error) {
    console.error("Error communicating with Generative AI API:", error.message);
    res.status(500).json({ error: "Failed to fetch response from Generative AI API." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
