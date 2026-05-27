// frontend/src/components/PetCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import defaultPetImage from '../assets/default-pet.png'; // adjust path if needed

function PetCard({ pet, isFavorite, onFavoriteToggle }) {
  const { addToCart } = useCart();
  const imageUrl = pet.images && pet.images[0] ? pet.images[0] : defaultPetImage;

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={imageUrl} alt={pet.name} style={styles.image} />
        <div style={styles.buttonGroup}>
          <button
            onClick={() => addToCart(pet, 1)}
            style={styles.cartBtn}
            title="Add to cart"
          >
            🛒
          </button>
          <button
            onClick={() => onFavoriteToggle(pet._id, isFavorite)}
            style={{ ...styles.favBtn, color: isFavorite ? '#ef4444' : '#94a3b8' }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
      <div style={styles.content}>
        <h3 style={styles.name}>{pet.name}</h3>
        <p style={styles.breed}>{pet.breed}</p>
        <p style={styles.age}>{pet.age} months old</p>
        <p style={styles.description}>{pet.description?.substring(0, 60)}...</p>
        <div style={styles.footer}>
          <span>💰 ₹{pet.price}</span>
          <Link to={`/pets/${pet._id}`} style={styles.meetBtn}>
            Meet {pet.name}
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
  },
  imageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  buttonGroup: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    display: 'flex',
    gap: '8px',
  },
  cartBtn: {
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtn: {
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: '1rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: '0 0 0.25rem 0',
    color: '#1e2a3a',
  },
  breed: {
    color: '#5a6874',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  age: {
    fontSize: '0.85rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '0.85rem',
    color: '#6b7280',
    marginBottom: '1rem',
    lineHeight: '1.4',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  meetBtn: {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
};

export default PetCard;