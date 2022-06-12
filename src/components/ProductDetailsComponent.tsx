import React from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { IProductInformation } from "../redux/products/types";
import { ApplicationState } from "../redux";
import { useEffect } from "react";
import { fetchSelectedProduct } from "../redux/product/action";
import { Dispatch } from "redux";
import { Card, Icon } from "semantic-ui-react";
import Cart from "./Cart";
import { quantity } from "../shared/constants";
import { useState, useContext } from "react";
import { CartContext } from "./App";
import { ICartDetails } from "../redux/cart/types";
import { addSelectedProducts } from "../redux/cart/actions";
import { useRef } from "react";
import { generateArrayFromInputNumber } from "../shared/util";

const ProductDetailsComponent = (props: any) => {
  const { id } = useParams();
  let itemsCount = useContext(CartContext);
  const currentSelectedValue = useRef<HTMLSelectElement>(null);
  const renderCount = useRef(0);

  const previousQuantitySelected: number | undefined =
    id && itemsCount.productQuantityMap.has(parseInt(id))
      ? itemsCount.productQuantityMap.get(parseInt(id))
      : 0;

  const [quantitySelected, setQuantitySelected] = useState<number>(
    previousQuantitySelected ? previousQuantitySelected : 0
  );

  const product: IProductInformation | null | undefined = useSelector(
    (state: ApplicationState) => {
      return state.product.data;
    }
  );
  const addCartDetails: ICartDetails | null | undefined = useSelector(
    (state: ApplicationState) => {
      return state.addCartDetails.data;
    }
  );
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(fetchSelectedProduct(id));
  }, []);

  useEffect(() => {
    if (renderCount.current === 0) {
      renderCount.current = 1;
      return;
    }

    const map = itemsCount.productQuantityMap;
    const numberOfQuantitiesSelected = currentSelectedValue.current
      ? parseInt(currentSelectedValue.current.value)
      : 0;
    if (id) {
      const productId = parseInt(id);
      if (map.has(productId)) {
        const newCount = map.get(productId) || 0;
        map.set(productId, newCount + numberOfQuantitiesSelected);
      } else {
        map.set(productId, numberOfQuantitiesSelected);
      }
      itemsCount.updateProductQuantityMap(map);
    }
  }, [itemsCount.quantity]);

  const handleAddingItemToCart = () => {
    let quantityOfItemsSelected = 0;

    if (currentSelectedValue.current) {
      quantityOfItemsSelected = parseInt(currentSelectedValue.current.value);
    }

    if (itemsCount.updateQuantity) {
      itemsCount.updateQuantity(quantityOfItemsSelected);
    }
    if (product) {
      dispatch(
        addSelectedProducts({
          userId: 3,
          date: Date.now().toString(),
          productdetails: [
            {
              productId: product?.id,
              quantity: itemsCount.quantity + quantityOfItemsSelected,
            },
          ],
        })
      );
    }
  };

  const handleChange = (evt: any) => {
    setQuantitySelected(parseInt(evt.target.value));
  };


  return (
    <div data-testid="product-details-display">
      <Cart />
      {product && (
        <>
          <Card
            image={product.image}
            header={product.title}
            meta={"$" + product.price}
            description={product.description}
            extra={
              <a>
                {product.rating.rate <= 1.4 && <Icon name="star" />}
                {product.rating.rate >=1.5 && product.rating.rate <2.5 && (
                  <>
                    <Icon name="star" />
                    <Icon name="star" />
                  </>
                )}
                {product.rating.rate >=2.5 && product.rating.rate <3.5 && (
                  <>
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                  </>
                )}
                {product.rating.rate >= 3.5 && product.rating.rate <4.5 && (
                  <>
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                  </>
                )}
                {product.rating.rate >= 4.5 && (
                  <>
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                    <Icon name="star" />
                  </>
                )}
              </a>
            }
          ></Card>
          <div>
            <label>Quantity:</label>
            <select data-testid="quantity-selected"
              value={quantitySelected}
              onChange={handleChange}
              ref={currentSelectedValue}
            >
              {product.rating &&
                (generateArrayFromInputNumber(product.rating.count)).map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
            </select>
          </div>
          <br />
          <button data-testid= "add-item-to-cart" onClick={handleAddingItemToCart}>Add to Cart</button>
        </>
      )}
    </div>
  );
};

export default ProductDetailsComponent;
