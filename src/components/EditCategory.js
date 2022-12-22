import React from "react";
import getAuthUser from "../getAuthUser";
import axios from "axios";
import { useEffect, useState } from 'react';
import Header from "../Header";
import { Form, Button } from "react-bootstrap";


function EditCategory(){

    const { auth, data } = getAuthUser();
    const [category, setCategory]=useState([]);
    const categoryId = localStorage.getItem("category");

        useEffect(() => {
            axios
                .get("http://localhost:8081/admin/category/" + categoryId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                })
                .then((response) => {

                    setCategory(response.data);

                });

        },[]);

        const handleSubmit = (event) =>{
            // TODO no empty fields check
            event.preventDefault();
            axios
            .put(
              "http://localhost:8081/admin/updateCategory/" + categoryId,
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

                        <Form.Group className="mb-3" controlId="formBasicCategoryName">
                            <Form.Label>Category name</Form.Label>
                            <Form.Control type="text" defaultValue={category.categoryName} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </Form>
                </div>
        </>
    )
}

export default EditCategory;