import React from "react";
import { useEffect, useState } from 'react';
import {Container, Paper, Button} from '@material-ui/core';
import axios from "axios";
import Header from "../Header";



function Info(){

    const paperStyle = {padding:'50px 20px', with:600, margin:"20px auto"};
    const [Book, setBook]=useState([]);
    const bookId = localStorage.getItem("info")
    useEffect(() => {

        // get book
        axios
            .get("http://localhost:8081/book/info/" + bookId)
            .then((response) => {

                setBook(response.data);

            });

    },[]);

    return(
        <>
            <Header/>
            <Paper elevation={3} style={paperStyle}>
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={Book.id}>
                    Title:{Book.title}<br/>
                    Year:{Book.year}<br/>
                    Category:{Book.bookCategory}<br/>
                    Author:{Book.author}<br/>
                    Price:{Book.price}<br/>
                    Discount:{Book.discount}<br/>
                    Unit_in_stock:{Book.unitInStock}<br/>
                    Info:{Book.bookInfo}<br/>
                </Paper>

            </Paper>
        </>
    )
}

export default Info;