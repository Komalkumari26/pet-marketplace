// routes/petRoutes.js
import express from "express";
import { 
  createPet, 
  getPets, 
  getPetById, 
  updatePet, 
  deletePet, 
  searchAndFilterPets 
} from "../controllers/petController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getPets);
router.get("/search", searchAndFilterPets);  // This should be BEFORE /:id route
router.get("/:id", getPetById);

// Protected routes
router.post("/", protect, createPet);
router.put("/:id", protect, updatePet);
router.delete("/:id", protect, deletePet);

export default router;