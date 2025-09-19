import React from 'react'
import undrawBooks from "../assets/Undraw_Books.svg"

export default function Landing() {
  return (
    <section id="landing">
        <header>
            <div className="header__wrapper">
                <div className="hearder__description">
                    <h1>America's most awarded online library platform</h1>
                    <h2>Find your dream book with <span className="purple">Library</span></h2>
                    <a href="#features">
                        <button className="btn">Browse books</button>
                    </a>
                </div>
                <figure className="header__img--wrapper">
                    <img src={undrawBooks} alt=""/>
                </figure>
            </div>
        </header>
    </section>
  )
}
