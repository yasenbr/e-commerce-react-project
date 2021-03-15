import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import { Container, Row } from "react-bootstrap";

const ProductList = (props) => {
  const { products } = props.context;

  return (
    <>
      <Container>
        <Row>
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default withContext(ProductList);
