import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import navImg from '../assets/reshot-icon-professional-movie-camera.svg'

import { useNavigate, Link, useLocation  } from 'react-router-dom';

import { useCart } from './share.jsx'

import { useAuth } from './share.jsx'

export function SearchBar( {movieTitle, year, inputMovieTitle, inputYear,searchMovie}) {
    return (
        <div className="Search-year__container">
            <div className="search-bar-container">
                <input type="text" id="search-input" name="searchQuery" placeholder="Search by Movie Title" className="search-bar-input" 
                    value={movieTitle} 
                    onChange={(event) => inputMovieTitle(event.target.value)}/>
                <div className="search-icon" onClick={() => searchMovie()}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </div>
            </div>
            <div className="slider-container">
                <input type="range" min="1930" max="2025" value={year} className="slider" id="myRange" 
                onChange={(event) => inputYear(event.target.value) }/>
                <span id="sliderValue">{year}</span>
            </div>
        </div> 
    )
}

function HeaderContent({isLogIn, logout, listCount}) {
    return (
    <div className="header-row row">
        <div className="nav__leftpart">
            <figure className="header-icon">
                <img src={navImg} alt="" />
            </figure>
            <div className="header-home">
                <Link to="/" className="home-nav">Home</Link>
            </div>
        </div>
        <div className="nav__rightpart">
            {isLogIn? 
            (<>
            <button className="logout" onClick={logout}>Logout</button>
            <Link to='/playlist' className="playlist">
                My Playlist
                {(listCount>0) && (<span className="list__num">{listCount}</span>)}
            </Link>
            </>):
            (<>
            <Link to='/signup' className='sign-log'>Signup</Link>
            <Link to='/login' className='sign-log'>Login</Link>
            </>)}
        </div>
    </div>
    )
}


export default function Nav() {
    const [movieTitle, setMovieTitle] = useState('')
    const [year, setYear] = useState(1980)

    const {listCount} = useCart()

    const {currentUser, logout} = useAuth()
    const isLogIn = !!currentUser

    const location = useLocation()
    const hideSearch = location.pathname === '/'

    function inputMovieTitle(value) {
        console.log(value)
        setMovieTitle(value)
    }

    function inputYear(value) {
        console.log(value)
        setYear(value)
    }

    const nav = useNavigate()

    function searchMovie() {
        const searchContent = movieTitle.split(" ").join('+');
        // fetchMoviebyTitle(searchContent, 1)
        
        nav(`/movielist/${searchContent}/${year}`)
        setMovieTitle('')
    }

    useEffect(() => {}, [movieTitle])

  return (
    <>
    <header className="header">
        <HeaderContent isLogIn={isLogIn} logout={logout} listCount={listCount} />        
        {!hideSearch && 
        (<SearchBar
            movieTitle={movieTitle}
            year={year}
            inputMovieTitle={inputMovieTitle}
            inputYear={inputYear}
            searchMovie={searchMovie}
        />)}
    </header>
    </>
  )
}
