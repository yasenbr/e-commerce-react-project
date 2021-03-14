import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

import { Form, Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert'
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
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.login(username, password).then((loggedIn) => {
      if (!loggedIn) {
        this.setState({ error: "Invalid Credentails" });
      }
    });
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title pt-5">Login</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="container">
        <Form className="z-depth-1-half login">
        {this.state.error && (
          <Alert variant="danger">{this.state.error}
        </Alert>
              )}
          <Form.Group controlId="formBasicEmail" onSubmit={this.login}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
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
