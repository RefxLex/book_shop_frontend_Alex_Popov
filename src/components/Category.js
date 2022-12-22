import React from "react";
import { useEffect, useState } from 'react';
import {Container, Paper, Button} from '@material-ui/core';
import axios from "axios";
import getAuthUser from "../getAuthUser";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import Header from "../Header";


function Category(){

    const navigate = useNavigate();
    const paperStyle = {padding:'50px 20px', with:600, margin:"20px auto"};
    const { auth, data } = getAuthUser();
    const [Categories, setCategories]=useState([]);
    useEffect(() => {

        // get cart
        axios
            .get("http://localhost:8081/book/categories")
            .then((response) => {

                setCategories(response.data);

            });

    },[]);

    // edit category
    const handleEdit = (event) =>{
        event.preventDefault();
        localStorage.setItem("category", event.currentTarget.id);
        navigate('/EditCategory');
    }

    // delete category
    const handleDelete = (event) =>{
        event.preventDefault();
        alert("cascade remove all related books and cart items");
        const categoryId = event.currentTarget.id;
        axios(
            { method: 'put',
              url: "http://localhost:8081/admin/deleteCategory/"+ categoryId ,
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
        navigate('/AddCategory');
    }


    return(
        <>
            <Header/>
            <Paper elevation={3} style={paperStyle}>
                <Button variant="contained" color="secondary" onClick={handleAdd}>Add new category</Button>
                {Categories.map(category=>(
                    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={category.id}>
                        Category_name: {category.categoryName}<br/>
                        <button id={category.id} type="submit" onClick={handleEdit}>
                            <EditIcon/>
                            Edit
                        </button>
                        <button id={category.id} type="submit" onClick={handleDelete}>
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

export default Category;