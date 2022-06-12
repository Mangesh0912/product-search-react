export interface IRatingInformation {
  rate: number;
  count: number;
}

export interface IProductInformation {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRatingInformation;
}

export enum ProductActionTypes {
  FETCH_REQUEST = "@@product/FETCH_REQUEST",
  FETCH_SUCCESS = "@@product/FETCH_SUCCESS",
  FETCH_ERROR = "@@product/FETCH_ERROR",
  FETCH_SUCCESS_FILTER = "@@product/FETCH_SUCCESS_FILTER"
}

export interface IProductsInformationState {
  loading: boolean;
  data: IProductInformation[];
  errors?: string;
}

export interface IAction {
  type: string;
  payload: IProductInformation[];
}
