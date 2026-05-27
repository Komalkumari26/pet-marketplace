// frontend/src/pages/Home.jsx (professional – no switch button on page, + About preview)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPets } from '../services/pets';
import { getCurrentUser } from '../services/auth';
import PetCard from '../components/PetCard';

function Home() {
  const [allPets, setAllPets] = useState([]);
  const [displayedPets, setDisplayedPets] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const categories = [
    { id: 'all', name: 'All Pets' },
    { id: 'dog', name: 'Dog' },
    { id: 'cat', name: 'Cat' },
    { id: 'bird', name: 'Bird' },
    { id: 'fish', name: 'Fish' },
    { id: 'rabbit', name: 'Rabbit' },
    { id: 'other', name: 'Other' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        try {
          const userRes = await getCurrentUser();
          setUser(userRes.data);
        } catch {
          setUser(null);
        }

        const petRes = await getPets();
        const pets = Array.isArray(petRes.data) ? petRes.data : petRes.data.pets || [];
        setAllPets(pets);
        filterAndDisplay(pets, activeCategory);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterAndDisplay = (pets, category) => {
    const filtered = category === 'all' ? pets : pets.filter(pet => pet.category === category);
    setDisplayedPets(filtered.slice(0, visibleCount));
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setVisibleCount(8);
    filterAndDisplay(allPets, categoryId);
  };

  const handleLoadMore = () => {
    const newCount = visibleCount + 8;
    setVisibleCount(newCount);
    const filtered = activeCategory === 'all' ? allPets : allPets.filter(pet => pet.category === activeCategory);
    setDisplayedPets(filtered.slice(0, newCount));
  };

  const handleFavoriteToggle = async (petId, isFav) => {
    console.log('Toggle favorite', petId, isFav);
  };

  if (loading) return <div style={styles.loading}>Finding furry friends...</div>;

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Find Your<br />Perfect<br />Pet Companion
          </h1>
          <p style={styles.heroDescription}>
            Discover healthy, happy, and adorable pets<br />
            waiting to fill your home with love and joy.
          </p>
          <div style={styles.buttons}>
            <Link to="/pets" style={styles.shopBtn}>Shop Pets →</Link>
            <Link to="/about" style={styles.learnBtn}>Learn More</Link>
          </div>
        </div>
        <div style={styles.heroImage}>
          <img 
            src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Happy dog" 
            style={styles.image} 
          />
        </div>
      </section>

      {/* Intro lines */}
      <div style={styles.introContainer}>
        <h2 style={styles.introTitle}>Meet Your Future Companion</h2>
        <p style={styles.introText}>Thousands of pets waiting for a loving home</p>
      </div>

      {/* ========== About Us Preview Section ========== */}
      <div style={styles.aboutPreview}>
        <div style={styles.aboutContent}>
          <h2 style={styles.aboutTitle}>Our Journey to <span style={{ color: '#f97316' }}>Pawfect Partnerships</span></h2>
          <p style={styles.aboutText}>
            From a simple adoption idea to a trusted buy/sell marketplace, Pawfect Pets was founded 
            with one belief: every pet deserves a loving home, and every family deserves a healthy companion.
          </p>
          <div style={styles.aboutValues}>
            <div>🔒 Trust & Safety</div>
            <div>🌿 Ethical Breeding</div>
            <div>💞 Lifelong Companionship</div>
          </div>
          <Link to="/about" style={styles.aboutBtn}>Read Our Full Story →</Link>
        </div>
        <div style={styles.aboutImage}>
          <img 
            src="https://media.istockphoto.com/id/1952747961/photo/smiling-woman-embracing-dog-on-sofa.jpg?b=1&s=612x612&w=0&k=20&c=eCPPixaEJlXawUbR-BpXeQwFtwhJokMRVSUvYGybE48=" 
            alt="Happy adoption" 
            style={styles.aboutImg}
          />
        </div>
      </div>
      {/* ========== End of About Preview ========== */}

      {/* Category Tabs */}
      <div style={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            style={{
              ...styles.categoryBtn,
              ...(activeCategory === cat.id ? styles.activeCategory : {})
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Pet Grid */}
      <div style={styles.gridContainer}>
        <div style={styles.grid}>
          {displayedPets.map(pet => (
            <PetCard
              key={pet._id}
              pet={pet}
              isFavorite={false}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {displayedPets.length < (activeCategory === 'all' ? allPets.length : allPets.filter(p => p.category === activeCategory).length) && (
        <div style={styles.loadMoreContainer}>
          <button onClick={handleLoadMore} style={styles.loadMoreBtn}>
            Load More Pets →
          </button>
        </div>
      )}

      {/* Guarantee Cards */}
      <section style={styles.guarantees}>
        <div style={styles.guaranteeCard}>
          <span style={styles.guaranteeIcon}>🚚</span>
          <h3>Safe Delivery Across the Country</h3>
        </div>
        <div style={styles.guaranteeCard}>
          <span style={styles.guaranteeIcon}>💰</span>
          <h3>30-Day Guarantee Money-Back Promise</h3>
        </div>
        <div style={styles.guaranteeCard}>
          <span style={styles.guaranteeIcon}>🎧</span>
          <h3>24/7 Support We're Here to Help</h3>
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '4rem 2rem',
    gap: '2rem',
  },
  heroContent: {
    flex: '1',
    minWidth: '280px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '1rem',
    color: '#1e2a3a',
  },
  heroDescription: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#5a6874',
    marginBottom: '2rem',
    maxWidth: '500px',
    background: 'linear-gradient(135deg, #2c3e50 0%, #5a6874 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontWeight: '500',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  shopBtn: {
    backgroundColor: '#f97316',
    color: 'white',
    padding: '0.8rem 2rem',
    borderRadius: '40px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'background 0.2s',
  },
  learnBtn: {
    border: '2px solid #f97316',
    color: '#f97316',
    padding: '0.8rem 2rem',
    borderRadius: '40px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  heroImage: {
    flex: '1',
    minWidth: '280px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '350px',
    height: 'auto',
    borderRadius: '24px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    objectFit: 'cover',
  },
  introContainer: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  introTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e2a3a',
    marginBottom: '0.5rem',
  },
  introText: {
    fontSize: '1.2rem',
    color: '#5a6874',
  },
  // About Preview Styles
  aboutPreview: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '2rem',
    backgroundColor: '#fffaf5',
    borderRadius: '32px',
    padding: '2rem',
    margin: '2rem auto',
    maxWidth: '1200px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  aboutContent: {
    flex: '1.5',
    minWidth: '250px',
  },
  aboutTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#1e2a3a',
  },
  aboutText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#2c3e50',
    marginBottom: '1.5rem',
  },
  aboutValues: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  aboutBtn: {
    display: 'inline-block',
    backgroundColor: '#f97316',
    color: 'white',
    padding: '0.6rem 1.5rem',
    borderRadius: '30px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'background 0.2s',
  },
  aboutImage: {
    flex: '1',
    minWidth: '200px',
    textAlign: 'center',
  },
  aboutImg: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
  categories: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  },
  categoryBtn: {
    padding: '0.5rem 1.5rem',
    borderRadius: '30px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  activeCategory: {
    backgroundColor: '#f97316',
    color: 'white',
    borderColor: '#f97316',
  },
  gridContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  loadMoreContainer: {
    textAlign: 'center',
    margin: '2rem 0 3rem',
  },
  loadMoreBtn: {
    backgroundColor: '#f97316',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '40px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  guarantees: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '2rem',
    backgroundColor: '#1e2a3a',
    color: 'white',
    padding: '3rem 2rem',
    borderRadius: '32px',
    marginTop: '1rem',
  },
  guaranteeCard: {
    textAlign: 'center',
    maxWidth: '250px',
  },
  guaranteeIcon: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.2rem',
    color: '#5a6874',
  },
};

export default Home;