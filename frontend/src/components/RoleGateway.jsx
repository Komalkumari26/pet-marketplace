// frontend/src/components/RoleGateway.jsx
import React, { useState, useEffect } from 'react';

const RoleGateway = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole && (savedRole === 'buyer' || savedRole === 'seller')) {
      setRole(savedRole);
    }
    setLoading(false);
  }, []);

  const handleRoleSelection = (selectedRole) => {
    localStorage.setItem('userRole', selectedRole);
    setRole(selectedRole);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  if (role) {
    return <>{children}</>;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h1 style={styles.title}>Welcome to Pawfect Pets</h1>
        <p style={styles.subtitle}>Please tell us how you'd like to use our platform</p>
        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, ...styles.buyerButton }}
            onClick={() => handleRoleSelection('buyer')}
          >
            <span style={styles.buttonIcon}>🐾</span>
            I'm a Buyer
            <span style={styles.buttonDesc}>Looking for a pet</span>
          </button>
          <button
            style={{ ...styles.button, ...styles.sellerButton }}
            onClick={() => handleRoleSelection('seller')}
          >
            <span style={styles.buttonIcon}>📦</span>
            I'm a Seller
            <span style={styles.buttonDesc}>List pets for sale</span>
          </button>
        </div>
        <p style={styles.footer}>You can change this later in your profile settings.</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '1rem',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '32px',
    maxWidth: '700px',
    width: '100%',
    padding: '2.5rem',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#1e2a3a',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#5a6874',
    marginBottom: '2rem',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  button: {
    flex: '1',
    minWidth: '200px',
    padding: '1.5rem 1rem',
    borderRadius: '24px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  buyerButton: {
    backgroundColor: '#eef2ff',
    color: '#3b82f6',
    border: '1px solid #c7d2fe',
  },
  sellerButton: {
    backgroundColor: '#fff7ed',
    color: '#f97316',
    border: '1px solid #fed7aa',
  },
  buttonIcon: {
    fontSize: '2rem',
  },
  buttonDesc: {
    fontSize: '0.8rem',
    fontWeight: 'normal',
    opacity: 0.8,
  },
  footer: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    marginTop: '1rem',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e2e8f0',
    borderTop: '3px solid #f97316',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default RoleGateway;