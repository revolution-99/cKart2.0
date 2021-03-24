import React, { useState, useEffect } from "react";
import "../styles.css";
// Fetching the .env file which is defined in backend.js
import { API } from "../backend";
// This is just the declaration of the base. You have to mention what you want to put in <Base></Base>
import Base from "./Base";
import { isAuthenticated } from "../auth/helper/index";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const {
    user: { name },
  } = isAuthenticated();
  // Previuosly done these things in useState method
  const [products, setProducts] = useState([]);

  // This is not going to use at anywhere. This is just to inform the react that   are making some changes. This is what happens when we are going to remount something
  const [reload, setReload] = useState(false);

  //   This is going to fetch all the products to this page
//   This is the perfect use of the '[]'. Whenever we are going to forcefully update something for that if we need a reload then this '[]' comes into picture.
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    if (!products) {
      return <h1> No items in your cart </h1>;
    } else {
      return (
        <div>
          <h2>This section is to load all products</h2>
          {products.length > 0 &&
            products.map((product, index) => (
                // Beacuse the card expects 3 parameters product,removeFromCart,addToCart
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addtoCart={false}
                // The below two lines ensure the connection of the Cart to the Card
                setReload = {setReload}
                reload = {reload}
              />
            ))}
        </div>
      );
    }
  };

  const loadCheckout = () => {
    return (
      <div>
        <h1> For moving to checkout</h1>
      </div>
    );
  };

  return (
    <Base title={`${name}'s cart`} description="Ready to checkout">
      <h1 className="text-white">Your shopping cart</h1>
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
