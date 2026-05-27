// frontend/src/components/Navbar.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/auth';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [careDropdownOpen, setCareDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const careDropdownRef = useRef(null);
  const { itemCount } = useCart();

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [location.pathname]);

  useEffect(() => {
    const handleUserChange = () => fetchUser();
    window.addEventListener('userLoggedIn', handleUserChange);
    window.addEventListener('userLoggedOut', handleUserChange);
    return () => {
      window.removeEventListener('userLoggedIn', handleUserChange);
      window.removeEventListener('userLoggedOut', handleUserChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      // Care dropdown is handled by hover, so no click outside needed.
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    window.dispatchEvent(new Event('userLoggedOut'));
    navigate('/');
    setMenuOpen(false);
    setDropdownOpen(false);
    setCareDropdownOpen(false);
  };

  const handleSwitchRole = () => {
    localStorage.removeItem('userRole');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pets', path: '/pets' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Care', isDropdown: true, items: ['Dog', 'Cat', 'Rabbit', 'Parrot', 'Fish'] },
  ];

  const handleCareItemClick = (item) => {
    const category = item.toLowerCase();
    navigate(`/care?category=${category}`);
    setCareDropdownOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Brand */}
        <Link to="/" style={styles.logo}>
          🐾 <span style={styles.logoText}>Pawfect</span> <span style={styles.logoHighlight}>PETS</span>
        </Link>

        {/* Hamburger (mobile) */}
        <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
        </div>

        {/* Desktop & mobile navigation links */}
        <div style={{ ...styles.links, ...(menuOpen ? styles.linksOpen : {}) }}>
          {navLinks.map(link => {
            if (link.isDropdown) {
              return (
                <div
                  key={link.name}
                  style={styles.dropdownWrapper}
                  ref={careDropdownRef}
                  onMouseEnter={() => setCareDropdownOpen(true)}
                  onMouseLeave={() => setCareDropdownOpen(false)}
                >
                  <button style={styles.linkButton}>
                    {link.name}
                  </button>
                  {careDropdownOpen && (
                    <div style={styles.dropdownMenu}>
                      {link.items.map(item => (
                        <button
                          key={item}
                          style={styles.dropdownMenuItem}
                          onClick={() => handleCareItemClick(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.path}
                style={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right section */}
        <div style={styles.rightSection}>
          <Link to="/cart" style={styles.cartLink}>
            🛒
            {itemCount > 0 && <span style={styles.cartBadge}>{itemCount}</span>}
          </Link>

          {user ? (
            <div style={styles.userMenu} ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={styles.userButton}
              >
                <span style={styles.userInitial}>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span style={styles.userName}>{user.name}</span>
                <span style={styles.dropdownArrow}>{dropdownOpen ? '▲' : '▼'}</span>
              </button>
              {dropdownOpen && (
                <div style={styles.dropdown}>
                  <Link to="/dashboard" style={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                    📊 Dashboard
                  </Link>
                  <Link to="/favorites" style={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                    ❤️ Favorites
                  </Link>
                  <Link to="/pets/new" style={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                    ➕ Sell a Pet
                  </Link>
                  {/* 👇 New My Profile link */}
                  <Link to="/profile" style={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                    👤 My Profile
                  </Link>
                  <button onClick={handleSwitchRole} style={styles.dropdownItemButton}>
                    🔄 Switch Role
                  </button>
                  <div style={styles.divider}></div>
                  <button onClick={handleLogout} style={styles.dropdownItemButton}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={styles.authButtons}>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0.8rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e2a3a',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.2rem',
  },
  logoText: { fontWeight: '700' },
  logoHighlight: { color: '#f97316', fontWeight: '700' },
  hamburger: { display: 'none', flexDirection: 'column', cursor: 'pointer' },
  bar: { width: '25px', height: '3px', backgroundColor: '#2c3e50', margin: '3px 0', borderRadius: '2px' },
  links: { display: 'flex', gap: '1.8rem', alignItems: 'center', flex: 1, justifyContent: 'center' },
  linksOpen: { display: 'flex', flexDirection: 'column', width: '100%', marginTop: '1rem', gap: '1rem' },
  link: {
    textDecoration: 'none',
    color: '#2c3e50',
    fontWeight: '500',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#2c3e50',
    fontWeight: '500',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: 0,
  },
  dropdownWrapper: { position: 'relative' },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
    minWidth: '120px',
    padding: '0.5rem 0',
    zIndex: 10,
    border: '1px solid #eef2f6',
  },
  dropdownMenuItem: {
    padding: '0.6rem 1rem',
    fontSize: '0.9rem',
    color: '#2c3e50',
    backgroundColor: 'white',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  rightSection: { display: 'flex', alignItems: 'center', gap: '1rem' },
  cartLink: {
    position: 'relative',
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: '#2c3e50',
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '0.5rem',
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-12px',
    backgroundColor: '#f97316',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    minWidth: '18px',
    textAlign: 'center',
  },
  authButtons: { display: 'flex', gap: '0.8rem' },
  loginBtn: { padding: '0.4rem 1.2rem', borderRadius: '30px', border: '1px solid #cbd5e1', textDecoration: 'none', color: '#2c3e50', fontWeight: '500' },
  registerBtn: { padding: '0.4rem 1.2rem', borderRadius: '30px', backgroundColor: '#f97316', color: 'white', textDecoration: 'none', fontWeight: '500' },
  userMenu: { position: 'relative' },
  userButton: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '40px', padding: '0.3rem 0.8rem 0.3rem 0.5rem', cursor: 'pointer' },
  userInitial: { backgroundColor: '#f97316', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' },
  userName: { maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  dropdownArrow: { fontSize: '0.7rem', marginLeft: '0.2rem' },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
    minWidth: '200px',
    padding: '0.5rem 0',
    zIndex: 10,
    border: '1px solid #eef2f6',
  },
  dropdownItem: {
    display: 'block',
    padding: '0.6rem 1rem',
    textDecoration: 'none',
    color: '#2c3e50',
    fontSize: '0.9rem',
    transition: 'background 0.2s',
    backgroundColor: 'white',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
  },
  dropdownItemButton: {
    padding: '0.6rem 1rem',
    fontSize: '0.9rem',
    color: '#2c3e50',
    backgroundColor: 'white',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  divider: {
    margin: '0.4rem 0',
    borderTop: '1px solid #eef2f6',
  },
};

// Hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .nav-link:hover, .link-button:hover { color: #f97316; }
  .dropdown-item:hover, .dropdown-item-button:hover, .dropdown-menu-item:hover { background-color: #f8fafc; }
  .login-btn:hover { background-color: #f1f5f9; border-color: #f97316; }
  .register-btn:hover { background-color: #ea580c; }
  .user-button:hover { background-color: #f1f5f9; border-color: #f97316; }
  @media (max-width: 768px) {
    .navbar-links { display: none; }
    .navbar-hamburger { display: flex; }
    .dropdown-menu { position: static; box-shadow: none; border: none; padding-left: 1rem; }
    .dropdown-wrapper .link-button { display: block; }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;