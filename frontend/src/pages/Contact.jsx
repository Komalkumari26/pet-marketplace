// frontend/src/pages/Contact.jsx
import React, { useState } from 'react';
import API from '../services/api';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      await API.post('/feedback/submit', formData);
      setSubmitStatus({ type: 'success', message: 'Thank you! Your feedback has been received.' });
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSubmitStatus({ type: 'error', message: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* New emotional header */}
      <div style={styles.header}>
        <h1 style={styles.title}>We're Here for You and Your Furry Family ❤️</h1>
        <p style={styles.subtitle}>
          Whether you need advice, have a question about a pet, or just want to share a happy tail – 
          our team is ready to support you. Your pet's well‑being is our passion.
        </p>
      </div>

      <div style={styles.grid}>
        {/* Left Column – Feedback Form */}
        <div style={styles.formCard}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={styles.textarea}
              />
            </div>
            {submitStatus && (
              <div style={submitStatus.type === 'success' ? styles.successMsg : styles.errorMsg}>
                {submitStatus.message}
              </div>
            )}
            <button type="submit" disabled={submitting} style={styles.button}>
              {submitting ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </div>

        {/* Right Column – Map + Phone Support */}
        <div style={styles.rightColumn}>
          {/* Map */}
          <div style={styles.mapCard}>
            <h3 style={styles.infoTitle}>📍 Our Location</h3>
            <div style={styles.mapContainer}>
              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?q=28.6139,77.2090&z=15&output=embed"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <p style={styles.addressText}>123 Pet Street, Delhi, India</p>
            </div>
          </div>

          {/* Phone Support */}
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>📞 Phone Support</h3>
            <p style={styles.infoText}>+1 (113) 456-7890</p>
            <p style={styles.infoText}>Hours: Mon-Fri 8am-8pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
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
    maxWidth: '700px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.9fr',
    gap: '2rem',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: '24px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  label: {
    fontWeight: '500',
    color: '#2c3e50',
  },
  input: {
    padding: '0.7rem',
    fontSize: '1rem',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    outline: 'none',
  },
  textarea: {
    padding: '0.7rem',
    fontSize: '1rem',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#f97316',
    color: 'white',
    border: 'none',
    padding: '0.8rem',
    borderRadius: '40px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background 0.2s',
  },
  successMsg: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '0.5rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  errorMsg: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '0.5rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  mapCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  mapContainer: {
    marginTop: '0.5rem',
  },
  addressText: {
    fontSize: '0.85rem',
    color: '#5a6874',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  infoTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#1e2a3a',
  },
  infoText: {
    color: '#2c3e50',
    margin: '0.25rem 0',
  },
};

export default Contact;