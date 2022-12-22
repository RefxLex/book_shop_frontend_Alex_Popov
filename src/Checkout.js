import React from "react"
import './Checkout.css'
import Header from "./Header"
import getAuthUser from "./getAuthUser"
import axios  from "axios";
import { useEffect, useState } from 'react';
import {Container, Paper, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CancelIcon from '@mui/icons-material/Cancel';

function Checkout(){

    //alert(localStorage.getItem("basket"));

    const paperStyle = {padding:'50px 20px', with:600, margin:"20px auto"};
    const navigate = useNavigate();

    // get customer cart id
    const [cartItems, setCartItems]=useState([]);
    const [cart, setCart]= useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth, data } = getAuthUser();
    const [totalPrice, setTotalPrice]=useState();

    if(data!=null){
        const userId = data.id;

        // axios 1
        useEffect(() => {

            // get cart
            axios
                .get("http://localhost:8081/customer/cart/" + userId, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                },
                })
                .then((response) => {

                    setCart(response.data);
                    localStorage.setItem("cartId", String(response.data.id))


                    // get cart items
                    axios
                        .get("http://localhost:8081/customer/cartItems/" + response.data.id, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: auth,
                        },
                        })
                        .then((response) => {
                            setCartItems(response.data);
                            //alert(String(response.data.length));
                            localStorage.setItem("basket", String(response.data.length));
                            var buff = 0;
                            for (let index = 0; index < response.data.length; index++) {
                                //alert(JSON.stringify(response.data.at(index).sum));
                                buff = buff + response.data.at(index).sum;
                            }
                            setTotalPrice(buff)
                        });
                });

        },[]);


        //axios 2
        /*useEffect(() => {
            // create function
            const fetchCartItems = async () => {
                setLoading(true);
                const res = await axios.get('http://localhost:8081/customer/cart/' + userId, 
                {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: auth,
                    },
                })

                setCartItems(res.data);
                setLoading(false)
            }
            // call function
            fetchCartItems();
        },[]) */

        //axios3
        /*useEffect(() => {
            // create function
            const fetchCartItems = async () => {
                setLoading(true);
                const res = await axios.get('http://localhost:8081/customer/cart', 
                {
                    params:{id: userId},
                },
                {
                    headers: {
                      Authorization: auth,
                      "Content-Type": "application/json",
                    },
                }
                )

                setCartItems(res.data);
                setLoading(false)
            }
            // call function
            fetchCartItems();
    
        },[]) */

        // axios 4
        /*useEffect(() => {
            axios({ method: 'get', url: 'http://localhost:8081/customer/cart/'+ userId, headers: { 'Authorization': auth, 'Content-Type': 'application/json' } })
                .then((response) => {
                setCartItems(response.data);
                });
            }, []);*/

        //fetch
        //const encodedValue = encodeURIComponent(userId);
        /*useEffect(() => {
            fetch("https://localhost:8081/customer/cart/" + userId, 
                {
                    method: "GET",
                    "Content-Type": "application/json",
                    Authorization: auth,  
                    withCredentials: true,  
                    crossorigin: true,  
                    mode: 'no-cors',  
                })
              .then(res => res.json())
              .then(
                (result) => {
                  setLoading(true);
                  setCartItems(result);
                },
                (error) => {
                  setLoading(true);
                  setError(error);
                }
              )
          }, [])*/

    }

    // add cart item
    const handleAdd = (event) =>{
        event.preventDefault();
        const cartItemId = event.currentTarget.id;
        var cartItemPos = 0;
        // find array pos by cartItemId
        for (let index = 0; index < cartItems.length; index++) {

            const element = JSON.stringify(cartItems[index]);
            if(element.includes(cartItemId)===true){
                cartItemPos = index;
            }
            
        }
        //alert(JSON.stringify(cartItems.at(cartItemPos)));
        axios(
            { method: 'put',
              url: 'http://localhost:8081/customer/cartItem/update/'+ cartItemId,
              data:{
                cartId: cartItems.at(cartItemPos).cartId,
                bookId: cartItems.at(cartItemPos).bookId,
                amount: cartItems.at(cartItemPos).amount + 1,
                sum: cartItems.at(cartItemPos).sum + (cartItems.at(cartItemPos).price - cartItems.at(cartItemPos).price * cartItems.at(cartItemPos).discount)
              },
              headers: { 
                'Authorization': auth,
                'Content-Type': 'application/json' 
                } 
            })
        .then((response) => {
        
            location.reload();
        });
    }

    // remove cart item
    const handleRemove = (event) =>{
        event.preventDefault();
        const cartItemId = event.currentTarget.id;
        var cartItemPos = 0;
        // find array pos by cartItemId
        for (let index = 0; index < cartItems.length; index++) {

            const element = JSON.stringify(cartItems[index]);
            if(element.includes(cartItemId)===true){
                cartItemPos = index;
            }
            
        }
        // decrease amount or remove completely
        if (cartItems.at(cartItemPos).amount>1){
            axios(
                { method: 'put',
                  url: 'http://localhost:8081/customer/cartItem/update/'+ cartItemId,
                  data:{
                    cartId: cartItems.at(cartItemPos).cartId,
                    bookId: cartItems.at(cartItemPos).bookId,
                    amount: cartItems.at(cartItemPos).amount - 1,
                    sum: cartItems.at(cartItemPos).sum - (cartItems.at(cartItemPos).price - cartItems.at(cartItemPos).price * cartItems.at(cartItemPos).discount)
                  },
                  headers: { 
                    'Authorization': auth,
                    'Content-Type': 'application/json' 
                    } 
                })
            .then((response) => {
            location.reload();
            });
        }
        else{
            axios(
                { method: 'delete',
                  url: 'http://localhost:8081/customer/cart/'+ cartItemId,
                  headers: { 
                    'Authorization': auth,
                    'Content-Type': 'application/json' 
                    } 
                })
            .then((response) => {

                if(response.status === 204){

                    // decrease item number
                    var basket = localStorage.getItem("basket");
                    basket = String((parseInt(basket)-1));
                    localStorage.setItem("basket", basket);
                    location.reload();
                }
            });
        }
    }

    // clear cart
    const handleClear = (event) =>{
        event.preventDefault();
        const cartId = cartItems.pop().cartId;
        //alert(JSON.stringify(cartItems.pop()));
        axios(
            { method: 'delete',
              url: 'http://localhost:8081/customer/clearCart/'+ cartId,
              headers: { 
                'Authorization': auth,
                'Content-Type': 'application/json' 
                } 
            })
        .then((response) => {

            if(response.status === 204){

                // zero item number
                var basket = String(0);
                localStorage.setItem("basket", basket);
                location.reload();
            }

        });
    }

    // update cart and navigate to order
    const handleOrder = (event) => {
        event.preventDefault();

        axios(
            { method: 'put',
              url: 'http://localhost:8081/customer/cart/update/'+ cart.id,
              data:{
                customerId: data.id,
                totalPrice: totalPrice
              },
              headers: { 
                'Authorization': auth,
                'Content-Type': 'application/json' 
                } 
            })
        .then((response) => {
                if(response.status === 200){
                    navigate('/order');
                }
        });

    }

    return (
    <>
        <Header/>
        <Paper elevation={3} style={paperStyle}>

            {cartItems.map(cartItem=>(
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={cartItem.id}>
                    {/*ID:{cartItem.id}<br/>*/}
                    Title:{cartItem.title}<br/>
                    Amount:{cartItem.amount}<br/>
                    Sum:{Math.round(cartItem.sum)}

                    <button id={cartItem.id} type="submit" onClick={handleAdd}>
                        <AddBoxIcon/>
                    </button>
                    <button id={cartItem.id} type="submit" onClick={handleRemove}>
                        <IndeterminateCheckBoxIcon/>
                    </button>
                </Paper>
                ))
            }
            <button type="submit" onClick={handleClear}>
                <CancelIcon/>
            </button>
            <span>Total price: {totalPrice} </span>
        </Paper>
        <Button variant="contained" color="secondary" onClick={handleOrder}>Proceed to order form</Button>
    </>
    )
}

export default Checkout