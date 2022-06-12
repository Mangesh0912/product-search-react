import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import { Store } from "redux";
import { Provider } from "react-redux";
import ProductDetailsComponent from "./ProductDetailsComponent";
import CartComponent from "./CartComponent";

export interface IApp {
  store: Store;
}
export type CartContextType = {
  quantity: number;
  productQuantityMap: Map<number, number>;
  updateQuantity: (quantity: number) => void;
  updateProductQuantityMap: (productQuantityMap: Map<number, number>) => void;
};
export const CartContext = React.createContext<CartContextType>({
  quantity: 0,
  productQuantityMap: new Map(),
  updateQuantity: (quantity: number) => {},
  updateProductQuantityMap: (productQuantityMap: Map<number, number>) => {},
});

const App = (props: IApp) => {
  const { store } = props;
  const [quantity, setQuantity] = useState(0);
  const [productQuantityMap, setProductQuantityMap] = useState(new Map());
  const updateQuantity = (quantity: number) => {
    setQuantity((prev) => prev + quantity);
  };
  const updateProductQuantityMap = (
    productQuantityMap: Map<number, number>
  ) => {
    setProductQuantityMap(productQuantityMap);
  };

  return (
    <>
      <CartContext.Provider
        value={{
          quantity,
          productQuantityMap,
          updateQuantity,
          updateProductQuantityMap,
        }}
      >
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetailsComponent />} />
            <Route path="/cart" element={<CartComponent />} />
          </Routes>
        </Provider>
      </CartContext.Provider>
    </>
  );
};

export default App;
