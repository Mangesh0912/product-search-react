import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ProductDetailsComponent from "../components/ProductDetailsComponent";
import { CartContext, CartContextType } from "../components/App";
import { configureStore } from "../redux/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { Routes, Route, Link, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { screen, fireEvent } from "@testing-library/react";

let container: any = null;
const contextValue: CartContextType = {
  quantity: 0,
  productQuantityMap: new Map(),
  updateProductQuantityMap: () => {},
  updateQuantity: () => {},
};
const initialState: any = {};
const store = configureStore(initialState);

const product = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "Nice backpack to fit laptops",
  category: "Mens Clothing",
  image: "",
  rating: {
    rate: 3.5,
    count: 120,
  },
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  const mockedResponse = {
    json: jest.fn().mockResolvedValueOnce(product),
  };
  global.fetch = jest.fn().mockResolvedValueOnce(mockedResponse);
});

afterEach(() => {
  //clean on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.restoreAllMocks();
});

it("renders Product Details Component as expected", async () => {
  const history = createMemoryHistory();
  const route = "/";
  history.push(route);

  await act(() => {
    render(
      <CartContext.Provider value={contextValue}>
        <Provider store={store}>
          <Router location={history.location} navigator={history}>
            <ProductDetailsComponent />
          </Router>
        </Provider>
      </CartContext.Provider>,
      container
    );
  });

  expect(screen.getByTestId("add-item-to-cart")).toHaveTextContent("Add to Cart");
  await fireEvent.click(screen.getByText("Add to Cart"));
  await fireEvent.click(screen.getByText("Add to Cart"));
  expect(screen.getByTestId("quantity-selected")).toHaveTextContent("50")
});
