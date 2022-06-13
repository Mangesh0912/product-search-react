import {  applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { ApplicationState, rootReducer } from ".";

export function configureStore(initialState: ApplicationState) {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}
