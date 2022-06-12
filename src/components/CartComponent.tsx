import React, { useContext, useState } from "react";
import Cart from "./Cart";
import { CartContext } from "./App";
import { Grid, Image, Card } from "semantic-ui-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IProductInformation } from "../redux/products/types";
import { ApplicationState } from "../redux";
import { Dispatch } from "redux";
import { fetchProducts } from "../redux/products/action";

export interface IProducts {
  productId: number;
  quantity: number;
}

const CartComponent = () => {
  const itemsCountContext = useContext(CartContext);
  const [products, setProducts] = useState<IProducts[]>([]);
  const map = itemsCountContext.productQuantityMap;

  const productList: IProductInformation[] = useSelector(
    (state: ApplicationState) => {
      return state?.products?.data;
    }
  );
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    const map = itemsCountContext.productQuantityMap;
    const productIds: number[] = [];
    map.forEach((value, key, map) => {
      productIds.push(key);
    });
    if (productIds.length > 0) {
      dispatch(fetchProducts(productIds));
    }
  }, []);

  return (
    <>
      <Cart />
      <Grid columns={1} divided>
        <Grid.Row>
          {productList &&
            productList.map((product: IProductInformation) => {
              const quantity = map.get(product.id) || 0;
              if (quantity > 0) {
                return (
                  <Grid.Column key={product.id}>
                    <Card>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="mini"
                          src={product.image}
                        />
                        <Card.Header>{product.title}</Card.Header>
                        <Card.Meta>
                          <div>
                            <p>Quantity: {quantity}</p>
                            <p>Price: {"$" + product.price * quantity}</p>
                          </div>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              }
              return;
            })}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default CartComponent;
