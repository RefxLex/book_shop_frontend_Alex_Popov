import React from "react";
import getAuthUser from "../getAuthUser";
import axios from "axios";
import { useEffect, useState } from 'react';
import Header from "../Header";
import { Form, Button } from "react-bootstrap";


function EditAuthor() {

    const { auth, data } = getAuthUser();
    const [author, setAuthors]=useState([]);
    const authorId = localStorage.getItem("author");

        useEffect(() => {
            axios
                .get("http://localhost:8081/admin/author/" + authorId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                })
                .then((response) => {

                    setAuthors(response.data);

                });

        },[]);

        const handleSubmit = (event) =>{
            // TODO no empty fields check
            event.preventDefault();
            axios
            .put(
              "http://localhost:8081/admin/updateAuthor/" + authorId,
              {
                firstName: event.target.formBasicFirstName.value,
                lastName: event.target.formBasicLastName.value,
                deleted: author.deleted
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

                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" defaultValue={author.firstName} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" defaultValue={author.lastName} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </Form>
                </div>
        </>
    )
}

export default EditAuthor;