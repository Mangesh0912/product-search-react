import React, { useState } from "react";
import ProductContainer from "./ProductContainer";
import SearchComponent from "./SearchComponent";
import Cart from "./Cart";

const Home = () => {
  return (
    <div data-testid="homepage-display">
      <SearchComponent />
      <Cart />
      <ProductContainer />
    </div>
  );
};

export default Home;
