import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "..";
import { ICartRequest, ICartDetails, AddCartActionTypes } from "./types";
import { ADD_NEW_CART_URL } from "../../shared/constants";

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const addSelectedProducts = (request: ICartRequest) => {
  return (dispatch: Dispatch) => {
    (async () => {
      try {
        const response = await fetch(ADD_NEW_CART_URL, {
          method: "POST",
          body: JSON.stringify(request),
        });
        const cartDetails: ICartDetails = await response.json();
        return dispatch({
          type: AddCartActionTypes.ADD_CART_SUCCESS,
          payload: cartDetails,
        });
      } catch (err) {
        return dispatch({
          type: AddCartActionTypes.ADD_CART_ERROR,
          payload: err,
        });
      }
    })();
  };
};
