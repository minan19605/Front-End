import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {books} from "../data.js"
import {Book} from "../components/FeaturedBooks.jsx"
import {BookStars} from "../components/FeaturedBooks.jsx"
import './singleBook.css'

// import {addBookToCart} from './Cart.jsx'

export default function BookDetail({addToCart}) {
    const {bookId} = useParams();
    const int_id = parseInt(bookId)
    const book = books[int_id-1]

    const [ifBookExist, setBookExist] = useState(false);

    function addBookToCart(book) {
        addToCart(book)
        setBookExist(true)
    }

    useEffect(() => {setBookExist(false)}, [int_id])

    return (
        <div className="container">
            <div className="row book__row">
                <Link to="/books" className="nav__link back__link">
                    <FontAwesomeIcon icon='arrow-left' /> <span className="back__title">Books</span>
                </Link>
                <div className="book__wrapper">
                    <figure className="img__wrapper">
                        <img src={book.url} alt="" className="book__img"/>
                    </figure>
                    <div className="book__description">
                        <div className="book__description--title">
                            {book.title}</div>
                        <BookStars rating={book.rating}/>
                        <div className="book__price">
                            {book.salePrice ?
                                <><span className="book__price--normal">${book.originalPrice.toFixed(2)}</span>${book.salePrice.toFixed(2)}</>
                                : <span>${book.originalPrice.toFixed(2)}</span> 
                            }
                        </div>
                        <h4 className="book__summary">Summary</h4>
                        <p className="book__para">"Atomic Habits" by James Clear is an activity book aimed at adults that focuses on the power of small changes in creating lasting habits. With 320 pages, the book provides practical strategies and insights on how to transform your habits and improve your life.</p>
                        <p className="book__para">Written in English and manufactured in China, this book is designed to help readers make incremental changes that lead to remarkable results. Clear's expertise in the subject matter makes this book a valuable resource for those looking to create positive changes in their daily routines.</p>
                        {
                            ifBookExist? (
                            <Link to='/cart'>
                                <button className="book__add-cart" >Checkout</button>
                            </Link>) 
                            :(<button className="book__add-cart" onClick={() => addBookToCart(book)}>Add to Cart</button>)
                        }
                        
                    </div>
                </div>
                <h3 className="book__recommend">Recommended Books</h3>
                <div className="books">
                {
                    books.filter(book => (book.rating === 5 && book.id !== int_id)).slice(0,4).map(((book) => {
                        return <Book book={book} key={book.id} />
                    }))
                }
                </div>
            </div>
        </div>
    )
}
