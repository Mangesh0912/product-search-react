import React from "react";
import { useState, useContext } from "react";
import { CartContext } from "./App";
import { useNavigate } from "react-router";

const Cart = () => {
  const itemsCount = useContext(CartContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <div
      data-testid="items-count-on-cart"
      onClick={handleClick}
      style={{ position: "absolute", right: "0px", top: "0px" }}
    >
      <img src="/cart.jpeg" height={50} width={50} data-value={0} />
      <span
        style={{
          paddingLeft: "9px",
          paddingRight: "9px",
          borderRadius: "9px",
          backgroundColor: "#c67605",
          verticalAlign: "top",
          padding: "0 5px",
          marginLeft: "-5px",
        }}
      >
        {itemsCount?.quantity}
      </span>
    </div>
  );
};

export default Cart;
