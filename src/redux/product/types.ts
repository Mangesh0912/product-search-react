import { IProductInformation } from "../products/types";

export interface IProductInformationState {
  loading: boolean;
  data: IProductInformation | null | undefined;
  errors?: string;
}


export enum ProductActionTypes {
  FETCH_PRODUCT_REQUEST = "@@product/FETCH_PRODUCT_REQUEST",
  FETCH_PRODUCT_SUCCESS = "@@product/FETCH_PRODUCT_SUCCESS",
  FETCH_PRODUCT_ERROR = "@@product/FETCH_PRODUCT_ERROR",
}
