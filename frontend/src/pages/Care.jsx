// frontend/src/pages/Care.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

// Care data for each pet (unchanged)
const careData = {
  dog: {
    name: 'Dog',
    sections: [
      { title: 'Nutrition', tips: ['Feed high‑quality dog food appropriate for age (puppy, adult, senior).', 'Provide fresh water at all times.', 'Avoid chocolate, grapes, onions, and xylitol.'] },
      { title: 'Exercise', tips: ['Daily walks (at least 30 minutes).', 'Play fetch or tug‑of‑war.', 'Mental stimulation with puzzle toys.'] },
      { title: 'Grooming', tips: ['Brush coat weekly (more often for shedding breeds).', 'Trim nails every 3‑4 weeks.', 'Clean ears and brush teeth regularly.'] },
      { title: 'Health', tips: ['Annual vet check‑ups and vaccinations.', 'Parasite prevention (fleas, ticks, heartworm).', 'Spay/neuter unless breeding.'] },
    ],
  },
  cat: {
    name: 'Cat',
    sections: [
      { title: 'Nutrition', tips: ['High‑protein, balanced cat food (wet or dry).', 'Fresh water daily; consider a water fountain.', 'Avoid dairy, onions, garlic, and raw dough.'] },
      { title: 'Exercise', tips: ['Interactive toys like feather wands.', 'Cat trees and scratching posts.', 'Daily play sessions (10‑15 minutes).'] },
      { title: 'Litter Box', tips: ['Clean litter box daily.', 'One box per cat plus one extra.', 'Use unscented, clumping litter.'] },
      { title: 'Health', tips: ['Annual vet visits and vaccinations.', 'Dental care (brushing or dental treats).', 'Microchip and ID tag.'] },
    ],
  },
  rabbit: {
    name: 'Rabbit',
    sections: [
      { title: 'Habitat', tips: ['Large enclosure (at least 4x4 feet).', 'Soft bedding and hiding spots.', 'Rabbit‑safe toys (wood, cardboard).'] },
      { title: 'Diet', tips: ['Unlimited hay (timothy hay).', 'Fresh leafy greens (romaine, cilantro).', 'Limited pellets and occasional fruit.'] },
      { title: 'Grooming', tips: ['Brush weekly (more during shedding).', 'Nail trimming every 6 weeks.', 'Check for flystrike in summer.'] },
      { title: 'Health', tips: ['Vet check for dental issues.', 'Spay/neuter to prevent cancer.', 'Vaccinations (RHDV2).'] },
    ],
  },
  parrot: {
    name: 'Parrot',
    sections: [
      { title: 'Cage & Environment', tips: ['Large cage with horizontal bars.', 'Variety of perches (different diameters).', 'Place away from drafts and kitchen fumes.'] },
      { title: 'Diet', tips: ['High‑quality pellets as base.', 'Fresh vegetables (carrots, broccoli).', 'Limited fruit and nuts. Avoid avocado, chocolate.'] },
      { title: 'Mental Stimulation', tips: ['Foraging toys and puzzle feeders.', 'Daily out‑of‑cage time.', 'Teach tricks and words.'] },
      { title: 'Health', tips: ['Annual avian vet check‑up.', 'Trim wings and nails if needed.', 'Watch for signs of illness (sneezing, fluffed feathers).'] },
    ],
  },
  fish: {
    name: 'Fish',
    sections: [
      { title: 'Tank Setup', tips: ['Choose appropriate tank size (at least 5 gallons).', 'Cycle tank before adding fish.', 'Maintain temperature 72‑82°F depending on species.'] },
      { title: 'Water Quality', tips: ['Test water weekly (ammonia, nitrite, nitrate).', 'Partial water changes (25% every 2 weeks).', 'Use dechlorinator.'] },
      { title: 'Feeding', tips: ['Feed small amounts 1‑2 times daily.', 'Use species‑specific food (flakes, pellets, frozen).', 'Avoid overfeeding – remove uneaten food.'] },
      { title: 'Health', tips: ['Quarantine new fish before adding.', 'Observe for signs of disease (spots, lethargy).', 'Consult aquatic vet if needed.'] },
    ],
  },
};

function Care() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'dog';
  const [selectedPet, setSelectedPet] = useState(category);

  useEffect(() => {
    setSelectedPet(category);
  }, [category]);

  const petInfo = careData[selectedPet] || careData.dog;

  const categories = [
    { key: 'dog', label: 'Dog' },
    { key: 'cat', label: 'Cat' },
    { key: 'rabbit', label: 'Rabbit' },
    { key: 'parrot', label: 'Parrot' },
    { key: 'fish', label: 'Fish' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Pet Care Guide</h1>
        <p style={styles.subtitle}>
          Made for the Ones Who Love Their Pets Like Family
          <br /><br />
          Every wagging tail, soft purr, playful jump, and tiny paw print brings happiness into our lives. 
          This guide is here to help you care for your pets with love, attention, and everything they need to stay happy and healthy.
        </p>
      </div>

      <div style={styles.pillsContainer}>
        {categories.map(cat => (
          <Link
            key={cat.key}
            to={`/care?category=${cat.key}`}
            style={{
              ...styles.pill,
              ...(selectedPet === cat.key ? styles.activePill : {}),
            }}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div style={styles.content}>
        <div style={styles.petHeader}>
          <h2 style={styles.petName}>{petInfo.name}</h2>
        </div>

        <div style={styles.cardsGrid}>
          {petInfo.sections.map((section, idx) => (
            <div key={idx} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{section.title}</h3>
              </div>
              <ul style={styles.tipsList}>
                {section.tips.map((tip, i) => (
                  <li key={i} style={styles.tipItem}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
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
    fontSize: '1rem',
    color: '#5a6874',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  pillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.8rem',
    marginBottom: '2rem',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#f1f5f9',
    borderRadius: '40px',
    textDecoration: 'none',
    color: '#2c3e50',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  activePill: {
    backgroundColor: '#f97316',
    color: 'white',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '2rem',
  },
  petHeader: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  petName: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e2a3a',
    margin: 0,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.75rem',
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: '20px',
    padding: '1.5rem',
    border: '1px solid #eef2f6',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardHeader: {
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1e2a3a',
    letterSpacing: '-0.01em',
    borderLeft: '4px solid #f97316',
    paddingLeft: '0.75rem',
  },
  tipsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  tipItem: {
    fontSize: '0.95rem',
    color: '#2c3e50',
    marginBottom: '0.75rem',
    lineHeight: '1.5',
    paddingLeft: '1.2rem',
    position: 'relative',
  },
};

// Add bullet points (clean) via CSS pseudo-element
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .tip-item::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #f97316;
    font-weight: bold;
  }
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.08);
    border-color: #e2e8f0;
  }
`;
document.head.appendChild(styleSheet);

export default Care;