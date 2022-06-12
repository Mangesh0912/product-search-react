export interface IProductDetails {
  productId: number;
  quantity: number;
}

export interface ICartDetails {
  id: number;
  userId: number;
  data: string;
  productdetails: IProductDetails[];
}

export enum AddCartActionTypes {
  ADD_CART_REQUEST = "@@cart/ADD_CART_REQUEST",
  ADD_CART_SUCCESS = "@@cart/ADD_CART_SUCCESS",
  ADD_CART_ERROR = "@@cart/ADD_CART_ERROR",
}

export interface ICartInformationState {
  loading: boolean;
  data: ICartDetails | null | undefined;
  errors?: string;
}

export interface ICartRequest {
  userId: number;
  date: string;
  productdetails: IProductDetails[];
}
