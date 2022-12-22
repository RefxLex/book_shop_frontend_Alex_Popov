import React from "react";
import SearchIcon from '@material-ui/icons/Search'
import './Header.css'
import { Link } from 'react-router-dom'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import getAuthUser from "./getAuthUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";


function Header(){

    // search redirect
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    // login & logout switch
    const { auth, data } = getAuthUser();

    // basket number icon
    var basketNumber = localStorage.getItem("basket");
    
    const handleInput = (e) => {
        const text = e.target.value;
        setSearchText(text);
    }

    const handleEnterKeyPressed = (e) =>{
        if(e.key === "Enter"){
            localStorage.setItem("search", searchText);
            navigate('/search');
            location.reload();
        }
    }

    // login & logout switch
    var loginPath="/";
    var checkoutPath="/"
    var name=" ";
    if(data!=null){
        loginPath="/logout";
        checkoutPath="/checkout";
        name=data.userName;
    }
    else{
        loginPath="/login";
        checkoutPath="/login";
        name="User";
    }

    return(
        <nav className="header">
            <Link to="/">
            <img className="header__logo" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/%D0%A7%D0%B8%D1%82%D0%B0%D0%B9-%D0%B3%D0%BE%D1%80%D0%BE%D0%B4.jpg" alt="logo" />
            </Link>
            {/*<div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon"/>
            </div>*/}
            <div className="header__search">
                <input
                className="header__searchInput"
                onChange={handleInput}
                onKeyPress = {handleEnterKeyPressed}
                type="text"
                value={searchText}
                placeholder="Search book title or category"
                />
                <SearchIcon className="header__searchIcon"/>
            </div>
            {/*<button type="submit" onClick={handleSearch}>Search</button>*/}

            <div className="header__nav">
                {/* 1st link */}
                <Link to={loginPath} className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineOne">Hello, {name}</span>
                        <span className="header__optionLineTwo">Sign in or Sign out</span>
                    </div>
                </Link>
                {/* 2nd link */}
                <Link to="/viewOrder" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>
                {/* 3rd link */}
                <Link to="/register" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLine11">You</span>
                        <span className="header__optionLineTwo">Register</span>
                    </div>
                </Link>
            </div>
            {/* basket icon with number of items */}
            <Link to={checkoutPath} className="header__link">
                <div className="header__optionBasket">
                    <ShoppingBasketIcon/>
                    {/* number of items in the basket */}
                    <span className="header_optionLineTwo header__basketCount"> {basketNumber} </span>
                </div>
            </Link>
        </nav>
    )
}

export default Header