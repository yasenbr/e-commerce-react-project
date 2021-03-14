import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Button, Nav, Navbar, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Context from "./Context";

import Cart from "./components/Cart";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <Navbar
              bg="dark"
              variant="dark"
              className={`Navbar.menu ${
                this.state.showMenu ? "is-active" : ""
              }`}
            >
              <Navbar.Brand href="#home">Ecommerce</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/products">Products</Nav.Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Nav.Link href="/add-product">Add Product</Nav.Link>
                )}
                <Nav.Link href="/cart">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Nav.Link>
                {!this.state.user ? (
                  <Nav.Link href="/login">Login</Nav.Link>
                ) : (
                  <Nav.Link href="/logout">Logout</Nav.Link>
                )}
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}

export default App;
