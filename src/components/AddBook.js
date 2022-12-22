import React from "react";
import Header from "../Header";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import getAuthUser from "../getAuthUser"

function AddBook() {

    const { auth, data } = getAuthUser();
    const handleSubmit = (event) =>{
        // TODO no empty fields check
        event.preventDefault();
        axios
        .post(
          "http://localhost:8081/admin/addBook",
          {
            year: event.target.formBasicYear.value,
            bookCategory: event.target.formBasicCategory.value,
            title:event.target.formBasicTitle.value,
            author: event.target.formBasicAuthor.value,
            price: event.target.formBasicPrice.value,
            discount: event.target.formBasicDiscount.value,
            unitInStock: event.target.formBasicUnitInStock.value,
            bookInfo: event.target.formBasicInfo.value,
            hyperlink: event.target.formBasicHyperlnk.value
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

              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter book title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Enter book category" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicYear">
                <Form.Label>Year</Form.Label>
                <Form.Control type="text" placeholder="Enter book year" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter book author" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="Enter book price" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control type="text" placeholder="Enter book discount" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUnitInStock">
                <Form.Label>Unit_in_stock</Form.Label>
                <Form.Control type="text" placeholder="Enter book unit_in_stock" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicInfo">
                <Form.Label>Info</Form.Label>
                <Form.Control type="text" placeholder="Enter book info" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicHyperlnk">
                <Form.Label>Hyperlink</Form.Label>
                <Form.Control type="text" placeholder="Enter book hyperlink" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add book
              </Button>
            </Form>
          </div>
        </>
    )
}

export default AddBook;