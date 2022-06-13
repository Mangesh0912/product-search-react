import { Reducer } from "redux";
import { IProductInformationState, ProductActionTypes } from "./types";

const initialState: IProductInformationState = {
  loading: false,
  data: null,
};

const reducer: Reducer<IProductInformationState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCT_REQUEST: {
      return { ...state, loading: true };
    }
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case ProductActionTypes.FETCH_PRODUCT_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as ProductReducer };
