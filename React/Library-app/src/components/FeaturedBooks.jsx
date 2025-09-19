import React, {useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link } from 'react-router-dom'
import {books} from "../data.js"

export function BookStars({rating}) {
    const fullStars = rating >= 1 ? Math.floor(rating): 0 ;
    const halfStar = rating % 1 >= 0.5 ;
    // console.log(rating, fullStars, halfStar)

    return (
        <div className="book__ratings">
            {Array.from({length: fullStars}, (_, i) =>( 
                <FontAwesomeIcon key={i} icon='star' />
            ))}
            {halfStar && <FontAwesomeIcon icon='star-half-stroke' />}
        </div>
    )
}

export function Book({book}) {
    const [img, setImg] = useState()
    const mountedRef = useRef(true)
    console.log(book.url)

    useEffect(() => {
        mountedRef.current = true;
        const image = new Image();
        image.src = book.url;
        image.onload = () => {
            setTimeout(() => {
                if(mountedRef.current) {
                    setImg(image)
                }
            }, 1300)
        };

        return (() => {
            mountedRef.current = false;
        })
    }, [book.url]);

    return (
        <div className="book">
            { console.log(!img) }
            {!img ? (
            <>
                <div className="book__img--skeleton"></div>
                <div className="skeleton book__title--skeleton"></div>
                <div className="skeleton book__rating--skeleton"></div>
                <div className="skeleton book__price--skeleton"></div>
            </>
            )
            :(<>
                <Link to={`/books/${book.id}`}>
                    <figure className="book__img--wrapper">
                        <img className="book__img" src={img.src} alt=""/>
                    </figure>
                    <div className="book__title">
                        {book.title}</div>
                </Link>
                <BookStars rating={book.rating}/>
                <div className="book__price">
                    {book.salePrice ?
                        <><span className="book__price--normal">${book.originalPrice.toFixed(2)}</span>${book.salePrice.toFixed(2)}</>
                        : <span>${book.originalPrice.toFixed(2)}</span> 
                    }
                </div>
            </>)
            }
        </div>
    )
}

const FeaturedBooks = () => {
    return (
        <section id="features">
            <div className="container">
                <div className="row">
                    <div className="section_title">
                        <h2>Featured <span className="purple">Books</span></h2>
                    </div>
                    <div className="books">
                    {
                        books.filter(book => book.rating === 5).slice(0,4).map(((book) => {
                            return <Book book={book} key={book.id} />
                        }))
                    }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedBooks