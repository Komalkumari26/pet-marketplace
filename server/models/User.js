import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  phone: { type: String, default: '' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }]
});

export default mongoose.model("User", userSchema);