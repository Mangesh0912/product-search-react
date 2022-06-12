import { Reducer } from "redux";
import { ICartInformationState, AddCartActionTypes } from "./types";

const initialState: ICartInformationState = {
  loading: false,
  data: null,
};

const reducer: Reducer<ICartInformationState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AddCartActionTypes.ADD_CART_REQUEST: {
      return { ...state, loading: true };
    }
    case AddCartActionTypes.ADD_CART_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case AddCartActionTypes.ADD_CART_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as CartReducer };
