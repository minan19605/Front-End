import React, { useState, useEffect } from 'react'
import './books.css'
import {books} from "../data.js"
import {Book} from "../components/FeaturedBooks.jsx"

export default function Books() {
    const [filterValue, setFilterVAlue] = useState('');
    const [bookList, setBookList] = useState(books);

    function comparePrice(a,b) {
        const a_price = a.salePrice || a.originalPrice ;
        const b_price = b.salePrice || b.originalPrice ;
        return a_price - b_price ;
    }

    useEffect(() => {
        let sortedBookList = [...books]
        if (filterValue === "Price high to low") {
            sortedBookList.sort((a,b) => comparePrice(b, a) )
        } else if (filterValue === "Price low to High") {
            sortedBookList.sort((a,b) => comparePrice(a, b))
        } else if (filterValue === 'Rating') {
            sortedBookList.sort((a, b) => b.rating - a.rating)
        }

        setBookList(sortedBookList)
    },[filterValue]);

  return (
    <div>
        <div className="container">
            <div className="books__row">
                <div className="title__wrapper">
                    <h3 className="title">All Books</h3>
                    <select name="filter" id="filter__books" value={filterValue}
                     onChange={(event) => setFilterVAlue(event.target.value)}>
                        <option value="" disabled >Sort</option>
                        <option value="Price high to low">Price high to low</option>
                        <option value="Price low to High">Price low to High</option>
                        <option value="Rating">Rating</option>
                    </select>
                </div>
                <div className="books">
                    {
                        bookList.map(((book) => {
                            return <Book book={book} key={book.id}/>
                        }))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
