import express from "express";
import cors from "cors";
import analyzeText from "./utils/textAnalizer.js";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/analyze", (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text  is required" });
    }

    const analysis = analyzeText(text);
    res.json(analysis);
  } catch (e) {
    console.error("Analyze Error", e);
    res
      .status(500)
      .json({ error: "Internal Server Error during text analysis" });
  }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})