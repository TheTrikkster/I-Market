import React, { useContext } from "react";
import { CartContext } from "../../components/cartprovider/CartProvider";

function Cart() {
  const { cart, removeFromCart }: any = useContext(CartContext);

  return (
    <div>
      {cart.length ? (
        cart.map((article: any, index: number) => {
          return (
            <div key={index}>
              <p>{article.name}</p>
              <p>{article.date}</p>
              <button onClick={() => removeFromCart(article._id)}>
                Remove
              </button>
            </div>
          );
        })
      ) : (
        <p>don&apos;t have article</p>
      )}
    </div>
  );
}

export default Cart;
