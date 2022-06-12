import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IProductInformation } from "../redux/products/types";
import { PRODUCT_LIST_URL } from "../shared/constants";
import { Image, Grid, Divider } from "semantic-ui-react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { IProductsInformationState } from "../redux/products/types";
import { Dispatch } from "redux";
import { fetchProducts } from "../redux/products/action";
import { ApplicationState } from "../redux";

const ProductContainer = () => {
  const products: IProductInformation[] = useSelector(
    (state: ApplicationState) => {
      return state?.products?.data;
    }
  );
  const dispatch: Dispatch<any> = useDispatch();

  //fetch records
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Divider horizontal>Shop Products</Divider>
      {/*products && products.length > 0 && <ProductCard products={products} />*/}
      <Grid stackable columns="equal" centered>
        {products &&
          products.map((product: IProductInformation) => {
            return (
              <Grid.Column width={5} height={20} key={product.id}>
                <ProductCard product={product} />
              </Grid.Column>
            );
          })}
      </Grid>
    </>
  );
};

export default ProductContainer;
