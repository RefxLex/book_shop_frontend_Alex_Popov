import React from "react";
import axios  from "axios";
import { useEffect, useState } from 'react';
import {Container, Paper, Button} from '@material-ui/core'
import Header from "../Header";
import getAuthUser from "../getAuthUser";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';


function SearchOrder(){

    const paperStyle = {padding:'50px 20px', with:600, margin:"20px auto"};
    const searchText = localStorage.getItem("search");

    const [order, setOrder]= useState([]);
    const [orderItems, setOrderItems]= useState([]);
    const { auth, data } = getAuthUser();


        useEffect(() => {

            axios
                .get("http://localhost:8081/customer/orderItems/" + searchText, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                })
                .then((response) => {

                    setOrderItems(response.data);

                });

            axios
                .get("http://localhost:8081/admin/order/" + searchText, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                })
                .then((response) => {
    
                    setOrder(response.data);
    
                });

        },[]);

        // cancel order
        const handleDelete = (event) =>{
            event.preventDefault();
            axios(
                { method: 'delete',
                  url: "http://localhost:8081/admin/deleteOrder/"+ searchText,
                  headers: { 
                    'Authorization': auth,
                    'Content-Type': 'application/json' 
                    } 
                })
            .then((response) => {
                location.reload();
            });
        }


    return (
        <>
            <Paper elevation={3} style={paperStyle}>
                <Header/>
                <span>ID: {order.id} </span><br/>
                <span>Country: {order.country} </span><br/>
                <span>City: {order.city} </span><br/>
                <span>Street: {order.street} </span><br/>
                <span>Apartment number: {order.apartmentNumber} </span><br/>
                <span>Total price: {order.totalPrice} </span><br/>
                <span>Time submitted: {order.timeSubmitted} </span><br/>
                <Paper elevation={3} style={paperStyle}>
                Order items: <br/>
                    {orderItems.map(orderItem=>(
                        <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={orderItem.id}>
                            Title: {orderItem.title}<br/>
                            Amount: {orderItem.amount}<br/>
                            Sum: {orderItem.sum}<br/>
                        </Paper>
                        ))
                    }
                </Paper>
                <button id={order.id} type="submit" onClick={handleDelete}>
                    <ClearIcon/>
                    Cancel order
                </button>
            </Paper>
        </>

    )
}

export default SearchOrder;