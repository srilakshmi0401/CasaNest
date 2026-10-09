/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("casanest-cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const persistCart = (items) => {
    localStorage.setItem("casanest-cart", JSON.stringify(items));
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      const updatedItems = existingItem
        ? currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
              : item
          )
        : [...currentItems, { ...product, quantity }];

      persistCart(updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item
      );
      persistCart(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.filter((item) => item.id !== productId);
      persistCart(updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("casanest-cart");
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}