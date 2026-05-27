// frontend/src/pages/AboutUs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Our Journey to <span style={styles.highlight}>Pawfect Partnerships</span>
        </h1>
        <p style={styles.heroSubtitle}>Connecting hearts with healthy, happy lives.</p>
      </div>

      {/* Mission Statement */}
      <div style={styles.missionWrapper}>
        <p style={styles.missionText}>
          We mission to unite healthy, happy pets with loving families. From responsible breeding 
          to joyful adoption, our platform ensures every step is guided by compassion, trust, and lifelong care.
        </p>
      </div>

      {/* Our Story Section – Two columns */}
      <div style={styles.twoColumns}>
        <div style={styles.textColumn}>
          <h2 style={styles.sectionTitle}>Our Story</h2>
          <p style={styles.paragraph}>
            From a simple adoption idea to a trusted buy/sell marketplace, Pawfect Pets was founded 
            with one belief: every pet deserves a loving home, and every family deserves a healthy companion. 
            What started as a local initiative has grown into a nationwide community – always putting 
            animal welfare first.
          </p>
          <p style={styles.paragraph}>
            Today, we combine technology with ground-level compassion to ensure every listing meets 
            our high standards. Behind every tail is a story — we're here to make it a happy one.
          </p>
        </div>
        <div style={styles.imageColumn}>
          <img 
            src="https://media.istockphoto.com/id/1952747961/photo/smiling-woman-embracing-dog-on-sofa.jpg?b=1&s=612x612&w=0&k=20&c=eCPPixaEJlXawUbR-BpXeQwFtwhJokMRVSUvYGybE48=" 
            alt="Girl hugging a dog" 
            style={styles.affectionateImage} 
          />
          <p style={styles.imageCaption}>Happy Adoption Moments</p>
        </div>
      </div>

      {/* Core Values */}
      <div style={styles.valuesSection}>
        <h2 style={styles.sectionTitle}>Our Core Values</h2>
        <div style={styles.valuesGrid}>
          <div style={styles.valueCard}>
            <span style={styles.valueIcon}>🔒</span>
            <h3>Trust & Safety</h3>
            <p>Verified listings, secure payments, and transparent reviews.</p>
          </div>
          <div style={styles.valueCard}>
            <span style={styles.valueIcon}>🌿</span>
            <h3>Ethical Breeding</h3>
            <p>We promote responsible breeders and rescue partnerships.</p>
          </div>
          <div style={styles.valueCard}>
            <span style={styles.valueIcon}>💞</span>
            <h3>Lifelong Companionship</h3>
            <p>Support beyond adoption – training, health, and community.</p>
          </div>
        </div>
      </div>

      {/* Commitment to Care */}
      <div style={styles.commitment}>
        <h2 style={styles.sectionTitle}>Our Commitment to Care</h2>
        <div style={styles.commitmentGrid}>
          <div style={styles.commitmentItem}>✅ Verification process for all sellers</div>
          <div style={styles.commitmentItem}>🏥 Health checks & fraud prevention</div>
          <div style={styles.commitmentItem}>📋 Up‑to‑date vaccination records</div>
          <div style={styles.commitmentItem}>🎓 Ongoing support for pet ownership</div>
        </div>
      </div>

      {/* Technology + Local Partnerships */}
      <div style={styles.twoColumns}>
        <div style={styles.textColumn}>
          <h2 style={styles.sectionTitle}>The Technology of Care</h2>
          <p style={styles.paragraph}>
            Our proprietary vetting algorithms analyze millions of data points to ensure every breeder, 
            kennel, and local seller meets our industry‑best health and safety standards. 
            Technology makes it efficient; compassion makes it right.
          </p>
        </div>
        <div style={styles.textColumn}>
          <h2 style={styles.sectionTitle}>Local Field Partnerships</h2>
          <p style={styles.paragraph}>
            Beyond the algorithms, our local teams across the country make in‑person visits to inspect 
            facilities, meet the pets, and verify living conditions. True care happens on the ground.
          </p>
        </div>
      </div>

      {/* Special Offer Banner */}
      <div style={styles.offerBanner}>
        <div style={styles.offerContent}>
          <h2>🐾 A Special Offer for First‑Time Visitors</h2>
          <p>Get <strong>20% off</strong> in our Accessories section!</p>
          <Link to="/accessories" style={styles.offerBtn}>Learn More →</Link>
        </div>
      </div>

      {/* Guarantee Cards */}
      <div style={styles.guarantees}>
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
  hero: {
    textAlign: 'center',
    padding: '3rem 1rem',
    backgroundColor: '#fef9f0',
    borderRadius: '32px',
    marginBottom: '2rem',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#1e2a3a',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
  },
  highlight: { color: '#f97316' },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#5a6874',
  },
  missionWrapper: {
    maxWidth: '800px',
    margin: '0 auto 3rem',
    textAlign: 'center',
  },
  missionText: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#2c3e50',
    fontWeight: '500',
    backgroundColor: '#f8fafc',
    padding: '1.5rem 2rem',
    borderRadius: '24px',
    borderLeft: '4px solid #f97316',
  },
  twoColumns: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    marginBottom: '3rem',
  },
  textColumn: {
    flex: '1',
    minWidth: '250px',
  },
  imageColumn: {
    flex: '1',
    minWidth: '250px',
    textAlign: 'center',
  },
  affectionateImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '350px',
    objectFit: 'cover',
    borderRadius: '24px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
  imageCaption: {
    marginTop: '0.75rem',
    fontSize: '0.9rem',
    color: '#5a6874',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e2a3a',
    marginBottom: '1rem',
    letterSpacing: '-0.01em',
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  valuesSection: { marginBottom: '3rem' },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '1.5rem',
  },
  valueCard: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '24px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid #eef2f6',
  },
  valueIcon: { fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' },
  commitment: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '32px',
    marginBottom: '3rem',
  },
  commitmentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },
  commitmentItem: {
    backgroundColor: '#fff',
    padding: '0.75rem 1rem',
    borderRadius: '40px',
    textAlign: 'center',
    fontSize: '0.95rem',
    fontWeight: '500',
    border: '1px solid #e2e8f0',
  },
  offerBanner: {
    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    borderRadius: '32px',
    padding: '2rem',
    marginBottom: '3rem',
    textAlign: 'center',
    color: 'white',
  },
  offerContent: { maxWidth: '600px', margin: '0 auto' },
  offerBtn: {
    display: 'inline-block',
    backgroundColor: 'white',
    color: '#f97316',
    padding: '0.6rem 1.5rem',
    borderRadius: '40px',
    textDecoration: 'none',
    fontWeight: '600',
    marginTop: '1rem',
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
  guaranteeIcon: { fontSize: '2.5rem', display: 'block', marginBottom: '1rem' },
};

export default AboutUs;