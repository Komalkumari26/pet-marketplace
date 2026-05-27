// frontend/src/services/pets.js
import API from './api';

// Get all pets (with optional query params)
export const getPets = (params) => API.get('/pets', { params });

// Get a single pet by ID
export const getPetById = (id) => API.get(`/pets/${id}`);

// Create a new pet (requires authentication)
export const createPet = (petData) => API.post('/pets', petData);

// Update an existing pet (seller or admin only)
export const updatePet = (id, petData) => API.put(`/pets/${id}`, petData);

// Delete a pet (seller or admin only)
export const deletePet = (id) => API.delete(`/pets/${id}`);

// Search/filter pets with pagination
export const searchPets = (queryParams) => API.get('/pets/search', { params: queryParams });