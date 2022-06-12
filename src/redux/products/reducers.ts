import { Reducer } from "redux";
import {
  IProductsInformationState,
  ProductActionTypes,
  IProductInformation,
} from "./types";

const initialState: IProductsInformationState = {
  loading: false,
  data: [],
};

const reducer: Reducer<IProductsInformationState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case ProductActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case ProductActionTypes.FETCH_SUCCESS_FILTER: {
      const productIds = action.payload.ids;
      return {
        ...state,
        loading: false,
        data: action.payload.data.filter(
          (value: IProductInformation) => productIds.indexOf(value.id) !== -1
        ),
      };
    }
    case ProductActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as ProductsReducer };
