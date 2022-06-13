import React from "react";
import { IProductInformation } from "../redux/products/types";
import { Card } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export interface IProductCardProps {
  product: IProductInformation;
}

const ProductCard = (props: IProductCardProps) => {
  const { product } = props;
  const price = '$' + product.price;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <>
      <Card
        image={product.image}
        header={product.title}
        meta={price}
        onClick={handleCardClick}
      />
    </>
  );
};

export default ProductCard;
