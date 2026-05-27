import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  price: Number,
  location: String,
  category: String,
  description: String,
  images: [String],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isSold: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'active', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model("Pet", petSchema);