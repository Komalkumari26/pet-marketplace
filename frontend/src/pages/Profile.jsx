import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/auth';
import API from '../services/api';

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
        setName(res.data.name);
        setPhone(res.data.phone || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await API.put('/users/profile', { name, phone });
      setMessage('Profile updated successfully!');
      // Refresh user data
      const res = await getCurrentUser();
      setUser(res.data);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={styles.loading}>Loading profile...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>My Profile</h2>
        {message && <div style={message.includes('success') ? styles.success : styles.error}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
          </div>
          <div style={styles.field}>
            <label>Email Address</label>
            <input type="email" value={user?.email || ''} disabled style={{ ...styles.input, background: '#f1f5f9' }} />
            <small>Email cannot be changed.</small>
          </div>
          <div style={styles.field}>
            <label>Phone Number (for buyers to contact you)</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., +91 98765 43210" style={styles.input} />
            <small>This will be shown on your pet listings for potential buyers to call or WhatsApp.</small>
          </div>
          <button type="submit" disabled={saving} style={styles.button}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f8fafc', padding: '1rem' },
  card: { backgroundColor: '#fff', borderRadius: '24px', padding: '2rem', maxWidth: '500px', width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  title: { fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center', color: '#1e2a3a' },
  field: { marginBottom: '1.2rem' },
  label: { display: 'block', fontWeight: '500', marginBottom: '0.3rem', color: '#2c3e50' },
  input: { width: '100%', padding: '0.7rem', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '1rem' },
  button: { width: '100%', padding: '0.8rem', backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '30px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '1rem' },
  success: { backgroundColor: '#dcfce7', color: '#166534', padding: '0.5rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' },
  error: { backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.5rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' },
  loading: { textAlign: 'center', padding: '2rem' }
};

export default Profile;