import API from './api';

export const getStats = () => API.get('/admin/stats');
export const getAllUsers = () => API.get('/admin/users');
export const deleteUser = (userId) => API.delete(`/admin/users/${userId}`);
export const changeUserRole = (userId, role) => API.put(`/admin/users/${userId}/role`, { role });
export const getAllPets = () => API.get('/admin/pets');
export const deletePet = (petId) => API.delete(`/admin/pets/${petId}`);
export const markPetSold = (petId) => API.put(`/admin/pets/${petId}/sold`);
export const getPendingPets = () => API.get('/admin/pets/pending');
export const updatePetStatus = (petId, status) => API.put(`/admin/pets/${petId}/status`, { status });