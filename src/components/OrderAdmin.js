import React from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function OrderAdmin(){

    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const handleInput = (e) => {
        const text = e.target.value;
        setSearchText(text);
    }

    const handleEnterKeyPressed = (e) =>{
        if(e.key === "Enter"){
            localStorage.setItem("search", searchText);
            navigate('/searchOrder');
            location.reload();
        }
    }

    return(
        <TextField id="outlined-search" label="Search order with order id" type="search" onKeyPress={handleEnterKeyPressed} onChange={handleInput}/>
    )
}

export default OrderAdmin;

