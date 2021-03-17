import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Button, Nav, Navbar, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Cart from "./components/Cart";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import RegisterUser from "./components/RegisterUser";

import Context from "./Context";

//back-end server and authentication

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();
  }
  async componentDidMount() {
    let user = localStorage.getItem("user");
    const products = await axios.get("http://localhost:3001/products");
    user = user ? JSON.parse(user) : null;
    this.setState({ user, products: products.data });
  }

  login = async (email, password) => {
    const res = await axios
      .post("http://localhost:3001/login", { email, password })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });

    if (res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken);
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === "admin@example.com" ? 0 : 1,
      };

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  logout = (e) => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

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
                <Nav>
                  {
                    !this.state.user(
                      <Nav.Link href="/registerUser">Register</Nav.Link>
                    )
                  }
                </Nav>
              </Nav>
              <Form inline>
                <Nav>
                  {!this.state.user ? (
                    <Nav.Link href="/login">Login</Nav.Link>
                  ) : (
                    <Nav.Link href="/logout" onClick={this.logout}>
                      Logout
                    </Nav.Link>
                  )}
                </Nav>
              </Form>
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
              <Route exact path="/registerUser" component={RegisterUser} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
