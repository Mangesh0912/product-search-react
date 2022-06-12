import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "..";
import { IProductInformation } from "../products/types";
import { PRODUCT_URL } from "../../shared/constants";
import { ProductActionTypes } from "./types";

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const fetchSelectedProduct: AppThunk = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${PRODUCT_URL}${id}`);
      const product: IProductInformation = await response.json();
      return dispatch({
        type: ProductActionTypes.FETCH_PRODUCT_SUCCESS,
        payload: product,
      });
    } catch (err) {
      return dispatch({
        type: ProductActionTypes.FETCH_PRODUCT_ERROR,
        payload: err,
      });
    }
  };
};
