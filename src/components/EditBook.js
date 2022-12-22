import React from "react";
import getAuthUser from "../getAuthUser";
import axios from "axios";
import { useEffect, useState } from 'react';
import Header from "../Header";
import { Form, Button } from "react-bootstrap";


function EditBook(){

    const { auth, data } = getAuthUser();
    const [book, setBooks]=useState([]);
    const bookId = localStorage.getItem("book");

        useEffect(() => {
            axios
                .get("http://localhost:8081/book/info/" + bookId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                })
                .then((response) => {

                    setBooks(response.data);

                });

        },[]);

        const handleSubmit = (event) =>{
            // TODO no empty fields check
            event.preventDefault();
            axios
            .put(
              "http://localhost:8081/admin/updateBook/" + bookId,
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
    
                if(response.status === 200){
                    location.reload();
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
                        <Form.Control type="text" defaultValue={book.title} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" defaultValue={book.bookCategory}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" defaultValue={book.year} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" defaultValue={book.author} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" defaultValue={book.price} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDiscount">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control type="text" defaultValue={book.discount} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUnitInStock">
                        <Form.Label>Unit_in_stock</Form.Label>
                        <Form.Control type="text" defaultValue={book.unitInStock} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicInfo">
                        <Form.Label>Info</Form.Label>
                        <Form.Control type="text" defaultValue={book.bookInfo} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicHyperlnk">
                        <Form.Label>Hyperlink</Form.Label>
                        <Form.Control type="text" defaultValue={book.hyperlink} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
            </div>
        </>
    )
}

export default EditBook;