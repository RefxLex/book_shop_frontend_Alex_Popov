import React  from "react";
import { Form, Button } from "react-bootstrap";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post(
            "http://localhost:8081/auth/register",
            {
              userName: event.target.formBasicUserName.value,
              password: event.target.formBasicPassword.value,
              email: event.target.formBasicEmail.value,
              phone: event.target.formBasicPhone.value
            }
          )
        navigate('/login');
    };

    return (
        <>
          <Header/>
          <div className="color-overlay d-flex justify-content-center align-items-center">
            <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>

              <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>User name</Form.Label>
                <Form.Control type="text" placeholder="Enter user name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone" />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Sign up
              </Button>
            </Form>
          </div>
        </>
      );
}

export default Register