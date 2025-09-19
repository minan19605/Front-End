import React from 'react'
import {books} from "../data.js"
import {Book} from "./FeaturedBooks.jsx"

export default function DiscountBooks() {
  return (
        <section id="discount">
            <div className="container">
                <div className="row">
                    <div className="section_title">
                        <h2>Discount <span className="purple">Books</span></h2>
                    </div>
                    <div className="books">
                    {
                        books.filter(book => book.salePrice > 0).slice(0,8).map(((book) => {
                            return <Book book={book} key={book.id}/>
                        }))
                    }
                    </div>
                </div>
            </div>
        </section>
    )
}
