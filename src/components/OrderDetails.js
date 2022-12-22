import React from "react";
import axios  from "axios";
import { useEffect, useState } from 'react';
import {Container, Paper, Button} from '@material-ui/core'
import Header from "../Header";
import getAuthUser from "../getAuthUser";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

function OrderDetails(){

    const paperStyle = {padding:'50px 20px', with:600, margin:"20px auto"};

    const [orderItems, setOrderItems]= useState([]);
    const { auth, data } = getAuthUser();
    const orderId = localStorage.getItem("order");

    if(data!=null){

        // get order items
        useEffect(() => {

            axios
                .get("http://localhost:8081/customer/orderItems/" + orderId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                })
                .then((response) => {

                    setOrderItems(response.data);

                });
        },[]);  
        
    }

    return(
    <>
        <Header/>
        <Paper elevation={3} style={paperStyle}>
            {orderItems.map(orderItem=>(
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={orderItem.id}>
                    Title: {orderItem.title}<br/>
                    Amount: {orderItem.amount}<br/>
                    Sum: {orderItem.sum}<br/>
                </Paper>
                ))
            }
        </Paper>
    </>
    )
}

export default OrderDetails;