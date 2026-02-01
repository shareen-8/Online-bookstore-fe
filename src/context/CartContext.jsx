import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    const exists = cart.find(item => item.book._id === book._id);
    if (exists) {
      setCart(
        cart.map(item =>
          item.book._id === book._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { book, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.book._id !== id));
  };

  const clearCart = () => setCart([]);


  const updateQuantity = (bookId, qty) => {
  setCart(prev =>
    prev.map(item =>
      item.book._id === bookId
        ? { ...item, qty }
        : item
    )
  );
};


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
