import React, { Component } from "react";
import withContext from "../withContext";
import axios from "axios";

import { Form, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import "./Login.css";

const initState = {
  imageUrl: "",
  name: "",
  price: "",
  stock: "",
  shortDesc: "",
  description: "",
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    console.log(props);
  }

  save = async (e) => {
    e.preventDefault();
    const { imageUrl, name, price, stock, shortDesc, description } = this.state;

    if (name && price) {
      const id =
        Math.random().toString(36).substring(2) + Date.now().toString(36);

      await axios.post("http://localhost:3001/products", {
        id,
        imageUrl,
        name,
        price,
        stock,
        shortDesc,
        description,
      });

      this.props.context.addProduct(
        {
          imageUrl,
          name,
          price,
          shortDesc,
          description,
          stock: stock || 0,
        },
        () => this.setState(initState)
      );
      this.setState({
        flash: { status: "is-success", msg: "Product created successfully" },
      });
    } else {
      this.setState({
        flash: { status: "is-danger", msg: "Please enter name and price" },
      });
    }
  };

  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { imageUrl, name, price, stock, shortDesc, description } = this.state;

    return (
      <>
        <div className="">
          <div className="container">
            <h4 className="title pt-5">Add product</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="container">
          <Form className="z-depth-1-half login" onSubmit={this.save}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                placeholder="Image Url"
                type="text"
                name="Url"
                value={imageUrl}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                placeholder="Enter name product"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control
                placeholder="Enter price"
                type="number"
                name="price"
                value={price}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                placeholder="Stock"
                type="number"
                name="stock"
                value={stock}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                placeholder="Enter short Description"
                type="text"
                name="shortDesc"
                value={shortDesc}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Description"
                type="text"
                style={{ resize: "none" }}
                name="description"
                value={description}
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.state.error && (
              <Alert variant="danger" className="error">
                {this.state.error}
              </Alert>
            )}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default withContext(AddProduct);
