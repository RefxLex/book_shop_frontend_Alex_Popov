import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import getAuthUser from "./getAuthUser";
import { useNavigate } from "react-router-dom";

function AdminPanel(){

    const { auth, data } = getAuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(data.role != "superuser"){
            navigate('/');
        }
    })

    return(
        <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        style={{ marginBottom: "10px" }}
        >
        <Navbar.Toggle aria-controls="resposive-navbar-nav" />
        <Navbar.Collapse id="resposive-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/author"
              className={(isActive) =>
                "nav-link" + (!isActive ? " unselected" : "")
              }
            >
              Авторы
            </NavLink>
            <NavLink
              to="/category"
              className={(isActive) =>
                "nav-link" + (!isActive ? " unselected" : "")
              }
            >
              Категории
            </NavLink>
            <NavLink
              to="/book"
              className={(isActive) =>
                "nav-link" + (!isActive ? " unselected" : "")
              }
            >
              Книги
            </NavLink>
            <NavLink
              to="/adminOrder"
              className={(isActive) =>
                "nav-link" + (!isActive ? " unselected" : "")
              }
            >
              Заказы
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default AdminPanel;