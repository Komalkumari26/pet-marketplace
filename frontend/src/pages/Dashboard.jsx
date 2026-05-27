// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getPets } from '../services/pets';
import { getCurrentUser } from '../services/auth';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [myPets, setMyPets] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await getCurrentUser();
      setUser(userRes.data);
      const allPets = await getPets();
      setMyPets(allPets.data.filter(pet => pet.seller._id === userRes.data._id));
    };
    fetchData();
  }, []);

  const handleRoleSwitch = () => {
    localStorage.removeItem('userRole');
    window.location.reload(); // Reload to show role gateway again
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>My Listings</h2>
        <button
          onClick={handleRoleSwitch}
          style={{
            backgroundColor: '#f97316',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f97316'}
        >
          Switch Role (Buyer/Seller)
        </button>
      </div>

      {myPets.length === 0 && (
        <p>You haven't listed any pets yet. <Link to="/pets/new">Create one</Link></p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {myPets.map(pet => (
          <div key={pet._id} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '0', padding: '1rem', backgroundColor: '#fff' }}>
            <h3>{pet.name}</h3>
            <p>Price: ${pet.price}</p>
            <Link to={`/pets/${pet._id}`}>View Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;