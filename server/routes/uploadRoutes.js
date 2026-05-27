import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { upload, uploadToCloudinary } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/", protect, upload.array("images", 5), async (req, res) => {
  try {
    console.log("Upload request received, files:", req.files ? req.files.length : 0);
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }
    const uploadPromises = req.files.map(file => {
      console.log("Uploading file:", file.originalname, "size:", file.size);
      return uploadToCloudinary(file.buffer, "pet-marketplace");
    });
    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map(result => result.secure_url);
    console.log("Upload successful, URLs:", imageUrls);
    res.json({ images: imageUrls });
  } catch (error) {
    console.error("❌ Upload error details:", error);
    // Log the full error object
    if (error.stack) console.error(error.stack);
    res.status(500).json({ msg: error.message });
  }
});

export default router;