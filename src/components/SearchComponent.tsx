import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchedProducts, fetchProducts } from "../redux/products/action";
import { Dispatch } from "redux";

const SearchComponent = () => {
  const searchedProduct = useRef<HTMLInputElement | null>(null);
  const dispatch: Dispatch<any> = useDispatch();

  const handleSearch = () => {
    const searchString: string | undefined = searchedProduct?.current?.value;
    dispatch(fetchSearchedProducts(searchString));
  };

  const clearSearch = () => {
    dispatch(fetchProducts());
    if (searchedProduct && searchedProduct.current) {
      searchedProduct.current.value = "";
    }
  };

  return (
    <>
      <input type="text" ref={searchedProduct}></input>
      <button onClick={handleSearch}>Search Products</button>
      <button onClick={clearSearch}>Clear Search</button>
    </>
  );
};

export default SearchComponent;
