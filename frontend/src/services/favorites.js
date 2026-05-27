// src/services/favorites.js
import API from './api';

export const getFavorites = () => API.get('/users/favorites');
export const addFavorite = (petId) => API.post(`/users/favorites/${petId}`);
export const removeFavorite = (petId) => API.delete(`/users/favorites/${petId}`);