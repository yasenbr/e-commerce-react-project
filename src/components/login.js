import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

import { Form, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();
    
    const { username, password } = this.state;
    if (!username || !password) {
      console.log("Fill all fields!");
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.login(username, password)
    .then((loggedIn) => {
      if (!loggedIn) {
        this.setState({ error: "Invalid Credentials" });
      }
    });
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="">
          <div className="container">
            <h4 className="title pt-5">Login</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="container">
          <Form className="z-depth-1-half login" onSubmit={this.login}>
            <Form.Group controlId="formBasicEmail" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder="Enter email"
                type="email"
                name="username"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.state.error && (
                <Alert variant="danger" className="error">{this.state.error}</Alert>
            )}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </>
    ) : (
      <Redirect to="/products" />
    );
  }
}

export default withContext(Login);
