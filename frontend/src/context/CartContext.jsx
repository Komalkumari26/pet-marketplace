// frontend/src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pawfect_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pawfect_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (pet, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.pet._id === pet._id);
      if (existing) {
        return prev.map(item =>
          item.pet._id === pet._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { pet, quantity }];
    });
  };

  const removeFromCart = (petId) => {
    setCartItems(prev => prev.filter(item => item.pet._id !== petId));
  };

  const updateQuantity = (petId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(petId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.pet._id === petId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.pet.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};