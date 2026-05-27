// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../services/favorites';
import PetCard from '../components/PetCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavs = async () => {
      const res = await getFavorites();
      setFavorites(res.data);
    };
    fetchFavs();
  }, []);

  const handleRemove = async (petId) => {
    await removeFavorite(petId);
    setFavorites(favorites.filter(p => p._id !== petId));
  };

  return (
    <div>
      <h2>Your Wishlist</h2>
      {favorites.length === 0 && <p>No favorites yet. Start adding pets!</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {favorites.map(pet => (
          <div key={pet._id}>
            <PetCard pet={pet} />
            <button onClick={() => handleRemove(pet._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;