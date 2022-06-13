import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "..";
import { ProductActionTypes, IProductInformation } from "./types";
import { PRODUCT_LIST_URL } from "../../shared/constants";

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const fetchSearchedProducts: AppThunk = (searchString: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(PRODUCT_LIST_URL);
      let productList: IProductInformation[] = await response.json();
      productList = productList.filter((product) =>
        product.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
          ? true
          : false
      );
      return dispatch({
        type: ProductActionTypes.FETCH_SUCCESS,
        payload: productList,
      });
    } catch (err) {
      return dispatch({
        type: ProductActionTypes.FETCH_ERROR,
        payload: err,
      });
    }
  };
};

export const fetchProducts: AppThunk = (productIds?: number[]) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(PRODUCT_LIST_URL);
      const productList: IProductInformation[] = await response.json();
      if (productIds) {
        return dispatch({
          type: ProductActionTypes.FETCH_SUCCESS_FILTER,
          payload: { ids: productIds, data: productList },
        });
      } else {
        return dispatch({
          type: ProductActionTypes.FETCH_SUCCESS,
          payload: productList,
        });
      }
    } catch (err) {
      return dispatch({
        type: ProductActionTypes.FETCH_ERROR,
        payload: err,
      });
    }
  };
};
