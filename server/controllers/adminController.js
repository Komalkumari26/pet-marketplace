import User from "../models/User.js";
import Pet from "../models/Pet.js";

// Get dashboard stats
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPets = await Pet.countDocuments();
    const soldPets = await Pet.countDocuments({ isSold: true });
    res.json({ totalUsers, totalPets, soldPets });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete any user (admin only)
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Change user role (admin only)
export const changeUserRole = async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ msg: "Invalid role" });
  }
  try {
    await User.findByIdAndUpdate(req.params.id, { role });
    res.json({ msg: "Role updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all pets (admin only)
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate("seller", "name email");
    res.json(pets);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete any pet (admin only)
export const deleteAnyPet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ msg: "Pet deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Mark pet as sold (admin only)
export const markPetSold = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ msg: "Pet not found" });
    pet.isSold = true;
    await pet.save();
    res.json({ msg: "Pet marked as sold" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get pending pets
export const getPendingPets = async (req, res) => {
  try {
    const pending = await Pet.find({ status: 'pending' }).populate('seller', 'name email');
    res.json(pending);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePetStatus = async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'active', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};