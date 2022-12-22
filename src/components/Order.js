import React from "react";
import Header from "../Header";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import getAuthUser from "../getAuthUser"



function Order(){

    const { auth, data } = getAuthUser();

    const handleSubmit = (event) =>{
        // TODO no empty fields check
        event.preventDefault();
        axios
        .post(
          "http://localhost:8081/customer/createOrder",
          {
            customerId: data.id,
            country: event.target.formBasicCountry.value,
            city: event.target.formBasicCity.value,
            street: event.target.formBasicStreet.value,
            apartmentNumber: event.target.formBasicApNumber.value,
            totalPrice: 0,
            timeSubmitted: 0
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
                alert("Order created, click to proceed to payment");
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

              <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter your country" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter your city" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" placeholder="Enter your street" />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicApNumber">
                <Form.Label>Apartment number</Form.Label>
                <Form.Control type="text" placeholder="Enter your apartment number" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Place order
              </Button>
            </Form>
          </div>
        </>
    )
}

export default Order;