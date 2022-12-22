import React from "react";
import Header from "../Header";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import getAuthUser from "../getAuthUser"


function AddAuthor(){

    const { auth, data } = getAuthUser();
    const handleSubmit = (event) =>{
        // TODO no empty fields check
        event.preventDefault();
        axios
        .post(
          "http://localhost:8081/admin/addAuthor",
          {
            firstName: event.target.formBasicFirstName.value,
            lastName: event.target.formBasicLastName.value
          },
          {
            headers: {
              Authorization: auth,
              "Content-Type": "application/json"
            },
          }
        )
        .then((response) => {

            if(response.status === 201){
                location.reload();
            }
            else{
                alert("Please try again");
            }

        });

    }

    return(
        <>
            <Header/>
            <div className="color-overlay d-flex justify-content-center align-items-center">
            <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>

              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="Enter author first name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="Enter author last name" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add author
              </Button>
            </Form>
          </div>
        </>
    )
}

export default AddAuthor;