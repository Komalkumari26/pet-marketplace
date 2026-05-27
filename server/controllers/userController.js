import User from "../models/User.js";
import Pet from "../models/Pet.js";

export const addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const pet = await Pet.findById(req.params.petId);
    
    if (!pet) return res.status(404).json({ msg: "Pet not found" });
    
    if (!user.favorites.includes(pet._id)) {
      user.favorites.push(pet._id);
      await user.save();
    }
    
    res.json({ msg: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(id => id.toString() !== req.params.petId);
    await user.save();
    res.json({ msg: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (name) user.name = name;
    if (phone) user.phone = phone;
    await user.save();
    res.json({
      msg: "Profile updated",
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};