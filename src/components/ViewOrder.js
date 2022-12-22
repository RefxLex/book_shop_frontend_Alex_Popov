import React from "react";
import axios  from "axios";
import { useEffect, useState } from 'react';
import {Container, Paper, Button} from '@material-ui/core'
import Header from "../Header";
import getAuthUser from "../getAuthUser";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";


function ViewOrder(){

    const paperStyle = {padding:'50px 20px', with:600, margin:"20px auto"};
    const navigate = useNavigate();

    const [orders, setOrders]= useState([]);
    const { auth, data } = getAuthUser();

    if(data!=null){
        const userId = data.id;

        // get customer orders
        useEffect(() => {


            axios
                .get("http://localhost:8081/customer/orders/" + userId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                })
                .then((response) => {

                    setOrders(response.data);

                });
        },[]);

    }

    // view order details
    const handleInspect = (event) => {
        event.preventDefault();
        localStorage.setItem("order", event.currentTarget.id);
        navigate('/orderDetails');
    }

    return(
        <>
        <Header/>
        <Paper elevation={3} style={paperStyle}>
            {orders.map(order=>(
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={order.id}>
                    Order ID: {order.id}<br/>
                    Country: {order.country}<br/>
                    City: {order.city}<br/>
                    Street: {order.street}<br/>
                    Apartment number: {order.apartmentNumber}<br/>
                    Total price: {order.totalPrice}<br/>
                    Time submitted: {order.timeSubmitted}<br/>
                    <button id={order.id} type="submit" onClick={handleInspect}>
                        <SearchIcon/>
                        View order details
                    </button>
                </Paper>
                ))
            }
        </Paper>
    </>
    )
}

export default ViewOrder;