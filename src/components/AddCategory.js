import React from "react";
import Header from "../Header";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import getAuthUser from "../getAuthUser"

function AddCategory(){

    const { auth, data } = getAuthUser();
    const handleSubmit = (event) =>{
        // TODO no empty fields check
        event.preventDefault();
        axios
        .post(
          "http://localhost:8081/admin/addCategory",
          {
            categoryName: event.target.formBasicCategoryName.value,
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

        }).catch((error) => {
            if(error.response.status===400){
                alert("duplicate category");
            }
            alert("Please try again");
        })

    }

    return(
        <>
            <Header/>
            <div className="color-overlay d-flex justify-content-center align-items-center">
            <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>

              <Form.Group className="mb-3" controlId="formBasicCategoryName">
                <Form.Label>Category name</Form.Label>
                <Form.Control type="text" placeholder="Enter category name" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add category
              </Button>
            </Form>
          </div>
        </>
    )
}

export default AddCategory;