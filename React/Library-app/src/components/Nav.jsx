import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Also can put assets into the public/
// Then can set the img src="/assets/library.svg"
import libraryIcon from "../assets/Library.svg";
import {Link} from 'react-router-dom'

import { useState } from 'react';

function Nav({getItemNumber, cart}) {
    const [isOpen, setIsOpen] = useState(false);
    function openMenu() {
        setIsOpen(true)
    }

    function closeMenu() {
        setIsOpen(false)
    }

    const itemNum = getItemNumber(cart)

    return (
        <nav>
            <div className="nav__wrapper">
                <Link to="/">
                    <img src={libraryIcon} alt="" className="logo"/>
                </Link>
                <ul className="nav__links">
                    <li className="nav__list">
                        <Link to="/" className="nav__link">Home</Link>
                    </li>
                    <li className="nav__list">
                        <Link to="/books" className="nav__link">Books</Link>
                    </li>
                    <li className="nav__list">
                        <Link to="/login" className="nav__link">Login</Link>
                    </li>
                    <button className="btn__menu" onClick={openMenu}>
                        <FontAwesomeIcon icon="bars" />
                    </button>
                    <li className="nav__icon">
                        <Link to="/cart" className="nav__link nav__cart">
                            <FontAwesomeIcon icon="shopping-cart" />
                            {
                                (itemNum > 0) && <span className="cart__length">{getItemNumber(cart)}</span>
                            }
                        </Link>
                    </li>
                </ul>
                {isOpen && 
                    (<div className="menu__backdrop">
                        <button className="btn__menu btn__menu--close" onClick={closeMenu}>
                            <FontAwesomeIcon icon='times' />
                        </button>
                        <ul className="menu__links" onClick={closeMenu}>
                            <li className="menu__list">
                                <Link to="/" className="menu__link" >Home</Link>
                            </li>
                            <li className="menu__list">
                                <Link to="/books" className="menu__link" >Books</Link>
                            </li>
                            <li className="menu__list">
                                <Link to="/cart" className="menu__link" >Cart</Link>
                            </li>
                        </ul>
                    </div>)
                }
            </div>
        </nav>
    )
}

export default Nav;