import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import getAuthUser from "./getAuthUser";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Logout from './Logout'

export default function Auth() {
  const [password, setPassword] = useState("");
  const [login, setlogin] = useState("");
  const {auth} = getAuthUser();
  const navigate = useNavigate();

  const authorize = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8081/auth/login",
        {
          login: event.target.formBasicEmail.value,
          password: event.target.formBasicPassword.value,
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .then((response) => {
        const tail = btoa(
          event.target.formBasicEmail.value +
            ":" +
            event.target.formBasicPassword.value
        );
        localStorage.setItem("auth", "Basic " + tail);
        localStorage.setItem("data", JSON.stringify(response.data));
        localStorage.setItem("basket", "0");
        //location.reload();
        navigate('/checkout');
      })
      .catch((err) => {
        console.error(err);
        location.reload();
        alert("Please try again");
      });
  };
    return (
      <>
        <Header/>
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <Form className="rounded p-4 p-sm-3" onSubmit={authorize}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              {/* <Form.Control type="email" placeholder="Enter email" /> */}
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </>
    );
}
