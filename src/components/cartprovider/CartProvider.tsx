import React, { createContext, useState, useEffect } from "react";
import { PostersType } from "../main/Main";

export const CartContext: any = createContext(null);

function CartProvider({ children }: any) {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (article: PostersType) => {
    const alredyExist = cart.find((element: PostersType) => {
      return element._id === article._id;
    });

    if (!alredyExist) {
      setCart([...cart, article]);
    }
  };

  const removeFromCart = (articleId: string) => {
    setCart(cart.filter((article: PostersType) => article._id !== articleId));
  };

  return (
    <div>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    </div>
  );
}

export default CartProvider;
