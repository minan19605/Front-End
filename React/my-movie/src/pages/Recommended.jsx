import React from 'react'
import {initMovies} from '../movies.js'
import {Link} from 'react-router-dom'
// import MovieDetails from './MovieDetails.jsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCirclePlay} from '@fortawesome/free-regular-svg-icons'
import placeholderImage from '../assets/place_holder_202_300.png';


export function MovieSkeleton () {
    return (
    <div className="movie__skeleton--wrapper">
        <div className="movie__img--skeleton"></div>
        <div className="skeleton movie__title--skeleton"></div>
        <div className="skeleton movie__year--skeleton"></div>
        <div className="skeleton movie__rating--skeleton"></div>
    </div>
    )
}

export function Movie({movie, children }) {
    return (
        <div className="movie" data-user-id="{movie.imdbID}">
            <figure className="img__wrapper">
                <img src={movie.Poster} alt="" 
                onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loops if the fallback image also fails
                    e.target.src = placeholderImage;
                }} className="movie__img"/>
                <p className="movie__rating">{movie.imdbRating}</p>
                <div className="overlay">
                    <button className="play-btn"><FontAwesomeIcon icon={faCirclePlay} /></button>
                    <div className="overlay__row">
                        <div className="overlay__content">
                            <p className="movie__rating--overlay">{movie.imdbRating}</p>
                            <p className="movie__name--overlay">{movie.Title}</p>
                            <div className="movie__type--wrapper">
                                <p className="movie__PG">{movie.Rated}</p>
                                <p className="movie__type">{movie.Genre}</p>
                            </div>
                            <p className="movie__year"><span className="white__light">Year:</span> {movie.Year}</p>
                            <p className="movie__actors"><span className="white__light">Actors:</span> {movie.Actors}</p>
                            <p className="movie__plot">{movie.Plot}</p>
                        </div>
                    </div>
                    {children }
                    <Link to={`/moviedetails/${movie.imdbID}`}>
                    <button id="open_modal" className="movie__details">Details</button>
                    </Link>
                </div>
            </figure>
            <div className="movie__info">
                <p className="movie__name">{movie.Title}</p>
                <p className="movie__year">Year: {movie.Year}</p>
                <p className="movie__type">{movie.Rated}</p>
            </div>
        </div>
    )
}

export default function Recommended() {

  return (
    <div>
        <div className="main">
        <div className="container">
            <div className="row">
                <main>
                    <h1 className="title">Recommended Movies</h1>
                    <div id="error-message-container" style={{color: 'red'}}>
                    </div>
                    <div className="movie-list">
                    {
                        initMovies.map((movie) => {
                            return <Movie movie={movie} key={movie.imdbID} />
                    })}
                    </div>
                </main>
            </div>
        </div>
    </div>
    </div>
  )
}
