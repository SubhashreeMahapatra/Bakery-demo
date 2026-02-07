import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const getItemQty = (id) => {
    const item = cart.find(item => item.id === id);
    return item ? item.qty : 0;
  };
const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
const getCartCount = () => {
  return cart.reduce((sum, item) => sum + item.qty, 0);
};
const getTotal = () => {
  return cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
};


  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, getItemQty, removeFromCart, getCartCount, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

