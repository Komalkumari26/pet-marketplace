// frontend/src/components/AdminRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

function AdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await getCurrentUser();
        setIsAdmin(res.data.role === 'admin');
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Checking admin access...</div>;
  return isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute;