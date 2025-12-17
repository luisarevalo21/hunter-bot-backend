const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRouter = require("./controller/chat");
const app = express();

const PORT = process.env.PORT || 8000;
const isProduction = process.env.NODE_ENV === "production";
const corsOptions = {
  origin: isProduction
    ? process.env.FRONTEND_URL
    : ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hunter Bot API is running!");
});

// Health check endpoint for frontend to check if server is awake
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is awake and ready",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/openai", chatRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
