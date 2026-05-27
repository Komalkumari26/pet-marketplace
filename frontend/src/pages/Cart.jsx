// frontend/src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your cart is empty</h2>
        <Link to="/pets" style={styles.shopBtn}>Browse Pets</Link>
      </div>
    );
  }

  const handleCheckout = () => {
    alert(`Thank you for your order! Total: $${cartTotal.toFixed(2)}\n\nWe will contact the sellers shortly.`);
    clearCart();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart</h1>
      <div style={styles.itemsList}>
        {cartItems.map(item => (
          <div key={item.pet._id} style={styles.cartItem}>
            <img
              src={item.pet.images?.[0] || 'https://via.placeholder.com/80'}
              alt={item.pet.name}
              style={styles.itemImage}
            />
            <div style={styles.itemDetails}>
              <h3>{item.pet.name}</h3>
              <p>Breed: {item.pet.breed}</p>
              <p>Price: ₹{item.pet.price}</p>
            </div>
            <div style={styles.itemActions}>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.pet._id, parseInt(e.target.value))}
                style={styles.quantityInput}
              />
              <button onClick={() => removeFromCart(item.pet._id)} style={styles.removeBtn}>
                Remove
              </button>
            </div>
            <div style={styles.itemTotal}>
              ₹{item.pet.price * item.quantity}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.summary}>
        <h3>Total: ₹{cartTotal.toFixed(2)}</h3>
        <button onClick={handleCheckout} style={styles.checkoutBtn}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' },
  title: { fontSize: '2rem', marginBottom: '2rem' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    borderBottom: '1px solid #e2e8f0',
    padding: '1rem',
    flexWrap: 'wrap',
  },
  itemImage: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' },
  itemDetails: { flex: 2 },
  itemActions: { display: 'flex', gap: '0.5rem', alignItems: 'center' },
  quantityInput: { width: '60px', padding: '0.3rem', textAlign: 'center' },
  removeBtn: { background: '#dc2626', color: 'white', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '20px', cursor: 'pointer' },
  itemTotal: { fontWeight: 'bold', minWidth: '80px', textAlign: 'right' },
  summary: { marginTop: '2rem', textAlign: 'right', borderTop: '2px solid #e2e8f0', paddingTop: '1rem' },
  checkoutBtn: { background: '#f97316', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem' },
  empty: { textAlign: 'center', padding: '4rem' },
  shopBtn: { display: 'inline-block', background: '#f97316', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '30px', textDecoration: 'none' },
};

export default Cart;