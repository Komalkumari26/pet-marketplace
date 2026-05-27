import dotenv from "dotenv";
dotenv.config();
console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "YES (length " + process.env.JWT_SECRET.length + ")" : "MISSING");

import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

// Unhandled error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true 
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Pet Marketplace API is running..." });
});

// Error handling middleware (last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    msg: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));