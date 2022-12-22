import React from "react";
import { useEffect, useState } from 'react';
import {Container, Paper, Button} from '@material-ui/core';
import axios from "axios";
import getAuthUser from "../getAuthUser";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import Header from "../Header";

function Author(){

    const navigate = useNavigate();
    const paperStyle = {padding:'50px 20px', with:600, margin:"20px auto"};
    const { auth, data } = getAuthUser();
    const [Authors, setAuthors]=useState([]);
    useEffect(() => {

        // get cart
        axios
            .get("http://localhost:8081/admin/authors", {
            headers: {
                "Content-Type": "application/json",
                Authorization: auth,
            },
            })
            .then((response) => {

                setAuthors(response.data);

            });

    },[]);

    // edit author
    const handleEdit = (event) =>{
        event.preventDefault();
        localStorage.setItem("author", event.currentTarget.id);
        navigate('/EditAuthor');
    }

    // delete author
    const handleDelete = (event) =>{
        event.preventDefault();
        alert("cascade remove all related books and cart items");
        const authorId = event.currentTarget.id;
        axios(
            { method: 'put',
              url: "http://localhost:8081/admin/deleteAuthor/"+ authorId,
              headers: { 
                'Authorization': auth,
                'Content-Type': 'application/json' 
                } 
            })
        .then((response) => {
            location.reload();
        });
    }

    // add author
    const handleAdd = (event) =>{
        //event.preventDefault();
        navigate('/AddAuthor');
    }


    return(
        <>
            <Header/>
            <Paper elevation={3} style={paperStyle}>
                <Button variant="contained" color="secondary" onClick={handleAdd}>Add new author</Button>
                {Authors.map(author=>(
                    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={author.id}>
                        First_name:{author.firstName}<br/>
                        Last_name:{author.lastName}<br/>

                        <button id={author.id} type="submit" onClick={handleEdit}>
                            <EditIcon/>
                            Edit
                        </button>
                        <button id={author.id} type="submit" onClick={handleDelete}>
                            <DeleteIcon/>
                            Delete
                        </button>
                    </Paper>
                    ))
                }
            </Paper>
        </>
    )
}

export default Author