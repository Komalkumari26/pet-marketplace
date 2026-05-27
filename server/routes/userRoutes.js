import express from "express";
import { 
  addToFavorites, 
  removeFromFavorites, 
  getFavorites,
  getUserProfile,
  updateProfile,
  getCurrentUser
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateProfile);
router.get("/current", protect, getCurrentUser);
router.get("/favorites", protect, getFavorites);
router.post("/favorites/:petId", protect, addToFavorites);
router.delete("/favorites/:petId", protect, removeFromFavorites);

export default router;