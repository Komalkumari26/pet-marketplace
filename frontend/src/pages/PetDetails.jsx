// frontend/src/pages/PetDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById, deletePet } from '../services/pets';
import { getCurrentUser } from '../services/auth';
import { addFavorite, removeFavorite, getFavorites } from '../services/favorites';
import defaultPetImage from '../assets/default-pet.png';

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [user, setUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const petRes = await getPetById(id);
        setPet(petRes.data);
        try {
          const userRes = await getCurrentUser();
          setUser(userRes.data);
          const favRes = await getFavorites();
          setIsFavorite(favRes.data.some(fav => fav._id === id));
        } catch {
          // Not logged in
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this pet? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await deletePet(id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete. Try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleFavorite = async () => {
    if (!user) return navigate('/login');
    if (isFavorite) {
      await removeFavorite(id);
      setIsFavorite(false);
    } else {
      await addFavorite(id);
      setIsFavorite(true);
    }
  };

  // WhatsApp pre‑filled message
  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in your pet listing "${pet?.name}" which I found on Pawfect Pets website.`
  );

  // Get seller details (phone may be optional)
  const sellerName = pet?.seller?.name || 'Unknown';
  const sellerEmail = pet?.seller?.email || 'Not provided';
  const sellerPhone = pet?.seller?.phone || '';

  if (loading) return <div style={styles.loading}>Loading pet details...</div>;
  if (!pet) return <div style={styles.error}>Pet not found.</div>;

  const imageUrl = pet.images && pet.images[0] ? pet.images[0] : defaultPetImage;
  const isOwner = user && (user.id === pet.seller?._id || user.role === 'admin');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.imageSection}>
          <img src={imageUrl} alt={pet.name} style={styles.image} />
        </div>
        <div style={styles.infoSection}>
          <h1 style={styles.name}>{pet.name}</h1>
          <div style={styles.detailsGrid}>
            <div><strong>🐕 Breed:</strong> {pet.breed}</div>
            <div><strong>📅 Age:</strong> {pet.age} months</div>
            <div><strong>💰 Price:</strong> ₹{pet.price}</div>
            <div><strong>📍 Location:</strong> {pet.location}</div>
            <div><strong>🐾 Category:</strong> {pet.category}</div>
          </div>
          <div style={styles.description}>
            <strong>📝 Description:</strong>
            <p>{pet.description || 'No description provided.'}</p>
          </div>

          {/* Seller Details Card */}
          <div style={styles.sellerCard}>
            <h3 style={styles.sellerTitle}>Seller Details</h3>
            <div style={styles.sellerInfo}>
              <p><strong>Name:</strong> {sellerName}</p>
              <p><strong>Email:</strong> {sellerEmail}</p>
              <p><strong>Phone:</strong> {sellerPhone || 'Not provided'}</p>
            </div>
            <div style={styles.actionButtons}>
              {sellerPhone && (
                <a href={`tel:${sellerPhone}`} style={styles.callBtn}>
                  📞 Call Seller
                </a>
              )}
              {sellerPhone && (
                <a
                  href={`https://wa.me/${sellerPhone.replace(/\D/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.whatsappBtn}
                >
                  💬 WhatsApp
                </a>
              )}
              {!sellerPhone && (
                <p style={styles.noPhone}>Seller phone number not available. Please use email.</p>
              )}
            </div>
          </div>

          {/* Owner actions (delete & favorite) */}
          <div style={styles.actions}>
            {isOwner && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{ ...styles.deleteBtn, ...(deleting ? styles.disabledBtn : {}) }}
              >
                {deleting ? 'Deleting...' : 'Delete Pet'}
              </button>
            )}
            {user && (
              <button onClick={handleFavorite} style={isFavorite ? styles.favBtnActive : styles.favBtn}>
                {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            )}
          </div>
          {!user && (
            <p style={styles.loginPrompt}>
              <a href="/login">Login</a> to add to favorites or contact seller.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '2rem',
    backgroundColor: '#f8fafc',
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    maxWidth: '1000px',
    width: '100%',
  },
  imageSection: {
    flex: '1',
    minWidth: '280px',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    maxHeight: '400px',
  },
  infoSection: {
    flex: '1.5',
    padding: '2rem',
  },
  name: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: '0 0 1rem 0',
    color: '#1e2a3a',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  description: {
    marginBottom: '2rem',
    fontSize: '1rem',
    color: '#2c3e50',
    lineHeight: '1.5',
  },
  sellerCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    padding: '1rem',
    marginBottom: '1.5rem',
    border: '1px solid #e2e8f0',
  },
  sellerTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#1e2a3a',
  },
  sellerInfo: {
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  callBtn: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  whatsappBtn: {
    backgroundColor: '#25D366',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  noPhone: {
    fontSize: '0.8rem',
    color: '#dc2626',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  disabledBtn: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  favBtn: {
    backgroundColor: '#f1f5f9',
    color: '#2c3e50',
    border: '1px solid #cbd5e1',
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  favBtnActive: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  loading: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: '#5a6874' },
  error: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: '#dc2626' },
  loginPrompt: { marginTop: '1rem', fontSize: '0.9rem', color: '#5a6874', textAlign: 'center' },
};

export default PetDetails;