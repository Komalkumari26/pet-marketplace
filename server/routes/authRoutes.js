// server/routes/authRoutes.js
import express from "express";
import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);   // ✅ added logout route

export default router;