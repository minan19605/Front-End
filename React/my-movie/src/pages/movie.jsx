import React from 'react'

export default function movie(movie) {
  return (
        <div className="movie" data-user-id="{movie.imdbID}">
            <figure className="img__wrapper">
                <img src="{movie.Poster}" alt="" onerror="this.onerror=null; this.src='./place_holder_202_300.png';" className="movie__img"/>
                <p className="movie__rating">{movie.imdbRating}</p>
                <div className="overlay">
                    <button className="play-btn"><i className="fa-regular fa-circle-play"></i></button>
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
                    <button id="open_modal" className="movie__details">Details</button>
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
