import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Home from "../components/Home";
import { CartContext, CartContextType } from "../components/App";
import { configureStore } from "../redux/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { Routes, Route, Link, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {screen} from '@testing-library/react'

let container: any = null;
const contextValue: CartContextType = {
  quantity: 0,
  productQuantityMap: new Map(),
  updateProductQuantityMap: () => {},
  updateQuantity: () => {},
};
const initialState: any = {};
const store = configureStore(initialState);

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  //clean on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders Home Component as expected", () => {
  const history = createMemoryHistory();
  const route = "/";
  history.push(route);

  act(() => {
    render(
      <CartContext.Provider value={contextValue}>
        <Provider store={store}>
          <Router location={history.location} navigator={history}>
            <Home />
          </Router>
        </Provider>
      </CartContext.Provider>,
      container
    );
  });

  expect(screen.getByTestId("homepage-display")).toHaveTextContent("Search Products")
});


