import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Hardcode for testing – remove later
cloudinary.config({
  cloud_name: "dkasg3wgl",
  api_key: "899462418464185",
  api_secret: "HlR_d33ry_lhXPFGiaqbWvq7Jpw"
});

const storage = multer.memoryStorage();

export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only image files are allowed'));
  }
});

export const uploadToCloudinary = (fileBuffer, folder = "pet-marketplace") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export default cloudinary;