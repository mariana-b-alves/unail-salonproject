/*CartContext.jsx -> CART'S LOGIC AND DATA FETCHING SIDE*/

import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

/*GETS ITEMS STORE INSIDE LOCALSTORAGE*/
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  /*SYNC CARTITEMS TO LOCALSTORAGE EVERYTIME THE CART'S CHANGED*/
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  /*ADD A NEW PRODUCT TO CART OR ADD IF THERE'S AT LEAST ONE INSIDE IT*/
  const addToCart = (product) => {
    /*CHECK IF THE ITEM'S THERE*/
    const quantity = product.quantity > 0 ? product.quantity : 1;

    setCartItems(prev =>
      prev.some(item => item.id === product.id && item.color === product.color)
        /*IF SO, ADD MORE TO IT...*/
        ? prev.map(item =>
            item.id === product.id && item.color === product.color
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        /*OTHERWISE, ADD NEW ONE.*/
        : [...prev, { ...product, quantity }]
    );
  };

  /*REMOVE A/THE PRODUCT TO CART*/
  const removeFromCart = (id, color) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.color === color)));
  };

  /*ADD/REMOVE AN ITEM IS ALREADY INSIDE THE CART BY CHECKING ITS ID/COLOUR*/
  const updateQuantity = (id, color, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.color === color
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item
      )
    );
  };

  /*CLEAR CART*/
  const clearCart = () => setCartItems([]);

  /*CHECK IF AN ITEM IS ALREADY INSIDE THE CART BY CHECKING ITS ID/COLOUR*/
  const isInCart = (id, color) => cartItems.some(item => item.id === id && item.color === color);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
