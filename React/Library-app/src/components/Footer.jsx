import React from 'react'
import {Link} from 'react-router-dom'
import libraryIcon from "../assets/Library.svg";

export default function Footer() {
  return (
    <footer>
        <div className="container">
            <div className="row">
                <figure className="footer__img--wrapper">
                    <Link to="/">
                        <img src={libraryIcon} alt="" className="footer__img"/>
                    </Link>
                </figure>
                <div className="footer__links">
                    <Link to="/" className="footer_link">Home</Link>
                    <Link to="#landing" className="footer_link">About</Link>
                    <Link to="#features" className="footer_link">Books</Link>
                    <Link to="/" className="footer_link no_allow">Contact</Link>
                </div>
                <div className="foot__copyright">Copyright &copy 2025 Library</div>
            </div>
        </div>
    </footer>
  )
}
