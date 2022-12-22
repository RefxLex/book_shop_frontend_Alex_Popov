import React from "react"
import axios  from "axios";
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Container, Paper, Button, List} from '@material-ui/core'
import Product from "./Product"
import './Home.css'
import Header from "./Header"
import getAuthUser from "./getAuthUser";


function Home (){
    const { auth, data } = getAuthUser();

    //Pagination
    //const [currentPage, setCurrentPage] = useState(1);
    //const [postsPerPage, setPostsPerPage] = useState(3);
    //const lastPostIndex = currentPage * postsPerPage;
    //const firstPostIndex = lastPostIndex - postsPerPage;


    const[books, setBooks]=useState([])
    // react hook fetch
        /*useEffect(()=>{
            fetch("http://localhost:8081/getAll", {
                method: 'GET',  
                withCredentials: true,  
                crossorigin: true, 
                mode:'cors'
            })
            .then(res=>res.json())
            .then((result)=>{
                setBooks(result);
            }
        )
        },[]) */
    // axios
    const[loading, setLoading] = useState(false);
    useEffect(() => {
        // create function
        const fetchBooks = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:8081/book/getAll');
            setBooks(res.data);
            setLoading(false)
        }
        // call function
        fetchBooks();

    },[])

    //Pagination
    //const currentPosts = books.slice(firstPostIndex, lastPostIndex)

    return(
    <>
        <Header/>
        <div className="home">

            {/*<div className="home__row">
                <List>
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
                </List>
            </div>*/}

            {/*<div className="home__row">
                <ProductList books={books}/>
            </div> */}

            
            <div className="home__row">
                {books.map(book=>(
                        <Product
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        image={book.hyperlink}
                        price={book.price}
                        discount={book.discount}
                        unitInStock={book.unitInStock}
                        />
                    ))
                }
            </div>

        </div>
    </>
    )
}

export default Home