import React from "react";
import { useEffect, useState } from 'react';
import {Container, Paper, Button} from '@material-ui/core';
import axios from "axios";
import getAuthUser from "../getAuthUser";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import Header from "../Header";


function Book(){

    const navigate = useNavigate();
    const paperStyle = {padding:'50px 20px', with:600, margin:"20px auto"};
    const { auth, data } = getAuthUser();
    const [Books, setBooks]=useState([]);
    useEffect(() => {

        axios
            .get("http://localhost:8081/book/getAll")
            .then((response) => {

                setBooks(response.data);

            });

    },[]);

    // edit book
    const handleEdit = (event) =>{
        event.preventDefault();
        localStorage.setItem("book", event.currentTarget.id);
        navigate('/EditBook');
    }

    // delete book
    const handleDelete = (event) =>{
        event.preventDefault();
        const bookId = event.currentTarget.id;
        axios(
            { method: 'put',
              url: "http://localhost:8081/admin/deleteBook/"+ bookId,
              headers: { 
                'Authorization': auth,
                'Content-Type': 'application/json' 
                } 
            })
        .then((response) => {
            location.reload();
        });
    }

    // add book
    const handleAdd = (event) =>{
        //event.preventDefault();
        navigate('/AddBook');
    }


    return(
        <>
            <Header/>
            <Paper elevation={3} style={paperStyle}>
                <Button variant="contained" color="secondary" onClick={handleAdd}>Add new book</Button>
                {Books.map(book=>(
                    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={book.id}>
                        Title:{book.title}<br/>
                        Category:{book.bookCategory}<br/>
                        Year:{book.year}<br/>
                        Author:{book.author}<br/>
                        Price:{book.price}<br/>
                        Discount:{book.discount}<br/>
                        Unit_in_stock:{book.unitInStock}<br/>
                        Hyperlink:{book.hyperlink}<br/>
                        Info:{book.bookInfo}<br/>
                        <button id={book.id} type="submit" onClick={handleEdit}>
                            <EditIcon/>
                            Edit
                        </button>
                        <button id={book.id} type="submit" onClick={handleDelete}>
                            <ClearIcon/>
                            Remove from sale
                        </button>
                    </Paper>
                    ))
                }
            </Paper>
        </>
    )
}

export default Book;