import React from "react";
import { Card, Button, Col } from "react-bootstrap";

import { Alert } from "react-bootstrap";
import "./ProductItem.css";

const ProductItem = (props) => {
  const { product } = props;
  return (
    <Col>
      <Card style={{ width: "18rem" }} className="z-depth-1-half mt-5">
        <Card.Img
          variant="top"
          src={product.imageUrl}
          alt={product.shortDesc}
        />
        <Card.Body>
          <Card.Title>{product.name} </Card.Title>
          <Card.Title className="price-position">${product.price}</Card.Title>
          <Card.Text>{product.shortDesc}</Card.Text>

          <Button
            className="btn-color-custom z-depth-1-half"
            variant="primary"
            onClick={() =>
              props.addToCart({
                id: product.name,
                product,
                amount: 1,
              })
            }
          >
            Add to Cart
          </Button>
          {product.stock > 0 ? (
            <Alert variant="success">
              <small>{product.stock + " Available"}</small>
            </Alert>
          ) : (
            <Alert variant="danger">
              <small className="danger">Out Of Stock</small>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
