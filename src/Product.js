import React from "react";
import './Product.css';
import { useNavigate } from "react-router-dom";
import getAuthUser from "./getAuthUser";
import axios from "axios";
import { Link } from 'react-router-dom'


export default Product

function Product ({id, title, author, image, price, discount, unitInStock }){

    const { auth, data } = getAuthUser();
    const navigate = useNavigate();
    const sum = price - (price * discount);
    
    const handleClick = (event) => {
        event.preventDefault();
        if(data!=null){

            // unitInStock check!
            if (data.unitInStock != 0) {
                const userId = data.id;
                axios
                .post(
                "http://localhost:8081/customer/addBook/" + userId,
                {
                    cartId: -1,
                    bookId: id,
                    amount: 1,
                    sum: sum
                },
                {
                    headers: {
                    Authorization: auth,
                    },
                }
                ).then((response) => {
                    if(response.status === 201){

                        // increase item number
                        var basket = localStorage.getItem("basket");
                        basket = String((parseInt(basket)+1));
                        localStorage.setItem("basket", basket);
                        location.reload();
                    }
                })
            }
            else{
                alert("Товара нет в наличии");
            }
        }
        else{
            alert("You need to be logged in");
            navigate('/login');
        }

    }

    const handleInfo = (event) => {
        event.preventDefault;
        localStorage.setItem("info", id);
        //alert("my info")
    }

    return(
        <div className="product">
            <div className="product__info">
                {/*<p>{title}</p>*/}
                <Link to="/info" onClick={handleInfo} className="header__link">
                    <div className="header__option">
                        <p className="header__optionLine11">{title}</p>
                    </div>
                </Link>
                <p className="product__price">
                    <strong>{author}</strong>
                </p>
            </div>
            <img src={image} alt="" />
            <button type="submit" onClick={handleClick}>
                Add to Basket
            </button>
        </div>
    )
}