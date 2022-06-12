import { combineReducers } from "redux";
import { ProductsReducer } from "./products/reducers";
import { ProductReducer } from "./product/reducer";
import { IProductsInformationState } from "./products/types";
import { IProductInformationState } from "./product/types";
import { ICartInformationState } from "./cart/types";
import { CartReducer } from "./cart/reducer";

export interface ApplicationState {
  products: IProductsInformationState;
  product: IProductInformationState;
  addCartDetails: ICartInformationState;
}

export const rootReducer = combineReducers({
  products: ProductsReducer,
  product: ProductReducer,
  addCartDetails: CartReducer
});
