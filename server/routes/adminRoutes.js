// server/routes/adminRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js"; 
import {
  getStats,
  getAllUsers,
  deleteUser,
  changeUserRole,
  getAllPets,
  deleteAnyPet,
  markPetSold,
  getPendingPets,
  updatePetStatus
} from "../controllers/adminController.js";

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
});

router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/role", changeUserRole);
router.get("/pets", getAllPets);
router.delete("/pets/:id", deleteAnyPet);
router.put("/pets/:id/sold", markPetSold);
router.get('/pets/pending', getPendingPets);
router.put('/pets/:id/status', updatePetStatus);

export default router;