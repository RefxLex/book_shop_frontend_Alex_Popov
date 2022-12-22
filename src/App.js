import './App.css';

import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, Navigate } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import Auth from "./Auth";
import getAuthUser from "./getAuthUser";
import Logout from "./Logout";

import Register from './Register';
import Home from './Home';
import Checkout from './Checkout';
import Search from "./components/Search";
import Order from './components/Order';
import AdminPanel from './AdminPanel';
import Author from './components/Author';
import AddAuthor from './components/AddAuthor';
import Info from './components/Info';
import EditAuthor from './components/EditAuthor';
import Category from './components/Category';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';
import Book from './components/Book';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ViewOrder from './components/ViewOrder';
import SearchOrder from './components/SearchOrder';
import OrderDetails from './components/OrderDetails';
import OrderAdmin from './components/OrderAdmin';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          <Route path="/book" element={<Book/>} >
          </Route>

          <Route path="/AddBook" element={<AddBook/>} >
          </Route>

          <Route path="/checkout" element={<Checkout/>} >
          </Route>

          <Route path="/search" element={<Search/>} >
          </Route>

          <Route path="/info" element={<Info/>} >
          </Route>

          <Route path="/order" element={<Order/>} >
          </Route>

          <Route path="/viewOrder" element={<ViewOrder/>} >
          </Route>

          <Route path="/searchOrder" element={<SearchOrder/>} >
          </Route>

          <Route path="/adminOrder" element={<OrderAdmin/>} >
          </Route>

          <Route path="/orderDetails" element={<OrderDetails/>} >
          </Route>

          <Route path="/admin" element={<AdminPanel/>} >
          </Route>

          <Route path="/author" element={<Author/>} >
          </Route>

          <Route path="/category" element={<Category/>} >
          </Route>

          <Route path="/AddAuthor" element={<AddAuthor/>} >
          </Route>

          <Route path="/AddCategory" element={<AddCategory/>} >
          </Route>

          <Route path="/EditAuthor" element={<EditAuthor/>} >
          </Route>

          <Route path="/EditCategory" element={<EditCategory/>} >
          </Route>

          <Route path="/EditBook" element={<EditBook/>} >
          </Route>

          <Route path="/register" element={<Register/>} >
          </Route>

          <Route path="/login" element={<Auth/>}>
          </Route>

          <Route path="/logout" element={<Logout/>}>
          </Route>

          <Route path="/" element={<Home/>}>
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;