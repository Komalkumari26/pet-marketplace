// frontend/src/pages/Pets.jsx (organized & professional filter bar)
import React, { useState, useEffect } from 'react';
import { getPets } from '../services/pets';
import PetCard from '../components/PetCard';

function Pets() {
  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    location: '',
    sortBy: 'newest'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 12;

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await getPets();
      const pets = Array.isArray(res.data) ? res.data : res.data.pets || [];
      setAllPets(pets);
      applyFilters(pets, searchTerm, filters);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (pets, search, filterObj) => {
    let result = [...pets];

    if (search.trim()) {
      result = result.filter(pet =>
        pet.name.toLowerCase().includes(search.toLowerCase()) ||
        pet.breed.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterObj.category !== 'all') {
      result = result.filter(pet => pet.category === filterObj.category);
    }
    if (filterObj.minPrice) {
      result = result.filter(pet => pet.price >= parseInt(filterObj.minPrice));
    }
    if (filterObj.maxPrice) {
      result = result.filter(pet => pet.price <= parseInt(filterObj.maxPrice));
    }
    if (filterObj.location.trim()) {
      result = result.filter(pet =>
        pet.location.toLowerCase().includes(filterObj.location.toLowerCase())
      );
    }

    switch (filterObj.sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'age':
        result.sort((a, b) => a.age - b.age);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredPets(result);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(allPets, value, filters);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(allPets, searchTerm, newFilters);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      location: '',
      sortBy: 'newest'
    });
    applyFilters(allPets, '', {
      category: 'all',
      minPrice: '',
      maxPrice: '',
      location: '',
      sortBy: 'newest'
    });
  };

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFavoriteToggle = (petId, isFav) => {
    console.log('Toggle favorite', petId, isFav);
  };

  if (loading) return <div style={styles.loading}>Loading pets...</div>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Browse All Pets</h1>
        <p style={styles.subtitle}>Find your perfect companion</p>
      </div>

      {/* Search + Sort Row */}
      <div style={styles.searchRow}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by name or breed..."
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.rightControls}>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            style={styles.sortSelect}
          >
            <option value="newest">Newest First</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="age">Age: Youngest</option>
          </select>
          <button onClick={handleClearFilters} style={styles.clearBtn}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div style={styles.filterRow}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            style={styles.select}
          >
            <option value="all">All Categories</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="fish">Fish</option>
            <option value="rabbit">Rabbit</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Price Range</label>
          <div style={styles.priceRange}>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              style={styles.priceInput}
            />
            <span style={styles.priceDash}>—</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              style={styles.priceInput}
            />
          </div>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Location</label>
          <input
            type="text"
            placeholder="City, state"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            style={styles.locationInput}
          />
        </div>
      </div>

      {/* Results count */}
      <div style={styles.resultsCount}>
        Showing {currentPets.length} of {filteredPets.length} pets
      </div>

      {/* Pet grid */}
      {currentPets.length === 0 ? (
        <div style={styles.noResults}>
          <p>No pets found. Try adjusting your filters.</p>
          <button onClick={handleClearFilters} style={styles.resetBtn}>
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div style={styles.grid}>
            {currentPets.map(pet => (
              <PetCard
                key={pet._id}
                pet={pet}
                isFavorite={false}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                style={styles.pageBtn}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => paginate(idx + 1)}
                  style={{
                    ...styles.pageNum,
                    ...(currentPage === idx + 1 ? styles.activePage : {})
                  }}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={styles.pageBtn}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Guarantee Cards - Clean & Professional (outside pagination) */}
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
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#1e2a3a',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#5a6874',
  },
  searchRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  searchWrapper: {
    flex: 2,
    minWidth: '250px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    fontSize: '1rem',
    opacity: 0.6,
  },
  searchInput: {
    width: '100%',
    padding: '0.7rem 1rem 0.7rem 2.5rem',
    borderRadius: '40px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    backgroundColor: '#fff',
    outline: 'none',
  },
  rightControls: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sortSelect: {
    padding: '0.7rem 1rem',
    borderRadius: '40px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  clearBtn: {
    backgroundColor: '#e2e8f0',
    border: 'none',
    padding: '0.7rem 1.2rem',
    borderRadius: '40px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    backgroundColor: '#f8fafc',
    padding: '1.2rem 1.5rem',
    borderRadius: '20px',
    marginBottom: '1.5rem',
    alignItems: 'flex-end',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  filterLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#2c3e50',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  select: {
    padding: '0.6rem 1rem',
    borderRadius: '30px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    minWidth: '140px',
    fontSize: '0.9rem',
  },
  priceRange: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  priceInput: {
    width: '90px',
    padding: '0.6rem 0.8rem',
    borderRadius: '30px',
    border: '1px solid #cbd5e1',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  priceDash: { color: '#5a6874' },
  locationInput: {
    padding: '0.6rem 1rem',
    borderRadius: '30px',
    border: '1px solid #cbd5e1',
    width: '160px',
    fontSize: '0.9rem',
  },
  resultsCount: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#5a6874',
    fontSize: '0.9rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  noResults: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#f8fafc',
    borderRadius: '20px',
  },
  resetBtn: {
    backgroundColor: '#f97316',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '30px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '2.5rem',
    flexWrap: 'wrap',
  },
  pageBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  pageNum: {
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  activePage: {
    backgroundColor: '#f97316',
    color: 'white',
    borderColor: '#f97316',
  },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.2rem',
    color: '#5a6874',
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
   marginBottom: '1rem' 
  },
};

export default Pets;