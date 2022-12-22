import React from "react";
import Header from "../Header";
import './Search.css';
import {useState, useEffect} from 'react'
import axios from "axios";
import Product from "../Product";

function Search(){

    const searchText = localStorage.getItem("search");
 
    const[loading, setLoading] = useState(false);
    const[books, setBooks]=useState([]);
    useEffect(() => {
        // create function
        const fetchBooks = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:8081/book/search', {params:{svalue: searchText}});
            setBooks(res.data);
            setLoading(false)
        }
        // call function
        fetchBooks();

    },[])

    return(
    <>
        <Header/>
        <div className="search">
          <div className="search__row">
                {books.map(book=>(
                        <Product
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        image={book.hyperlink}
                        />
                    ))
                }
            </div>

        </div>
    </>
    );
}

export default Search;