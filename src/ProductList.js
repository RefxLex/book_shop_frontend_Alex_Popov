import React from "react";
import Product from "./Product";
import './ProductList.css'

const ProductList = ({books}) => {
    return(
        <div className="product__list">
            {books.map(book => {
                return (
                    <Product
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        image={book.image}
                    />
                );
            })}

        </div>
    )
}

export default ProductList;