import Pet from "../models/Pet.js";

// ===== ORIGINAL FUNCTIONS =====
export const createPet = async (req, res) => {
  const pet = await Pet.create({
    ...req.body,
    seller: req.user.id,
    status: 'pending'   
  });
  res.json(pet);
};

export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate("seller", "name");
    res.json(pets);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ===== UPDATED FUNCTIONS (with phone) =====
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("seller", "name email phone");
    if (!pet) return res.status(404).json({ msg: "Pet not found" });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) return res.status(404).json({ msg: "Pet not found" });
    if (pet.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: "Not authorized" });
    }
    
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) return res.status(404).json({ msg: "Pet not found" });
    if (pet.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: "Not authorized" });
    }
    
    await pet.deleteOne();
    res.json({ msg: "Pet removed" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const searchAndFilterPets = async (req, res) => {
  try {
    const { category, breed, minPrice, maxPrice, location, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (breed) filter.breed = new RegExp(breed, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    const pets = await Pet.find(filter)
      .populate("seller", "name email phone")
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Pet.countDocuments(filter);
    
    res.json({
      pets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};