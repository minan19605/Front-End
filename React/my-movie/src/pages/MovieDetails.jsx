import React, { useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCirclePlay, faBookmark} from '@fortawesome/free-regular-svg-icons'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import placeholderImage from '../assets/place_holder_202_300.png';

export const apiKey = '47a33bd7';

import { useCart } from './playListContext.jsx';
import Modal from './Modal.jsx';

import { useAuth } from './AuthContext.jsx';

export default function MovieDetails() {
    const {omdbId} = useParams()
    console.log("MovieDetails omdbID is: ", omdbId)
    const [movie, setMovie] = useState()
    const [loading, setLoading] = useState(true)

    const {listItems, addToList} = useCart()
    // console.log(listItems)

    const {currentUser} = useAuth()
    const isLogIn = !!currentUser

    function SaveToPlayList(movie)  {
        if (isLogIn){
        addToList(movie)
    }
    else {
        alert('Please Login firstly!')
    }
    }
    

    const isMovieInList = listItems.find(item => item.imdbID === omdbId);
    // console.log('isMovieInList', isMovieInList? 'True':'False')

    async function getMovieById(omdbId) {
        const url = `https://www.omdbapi.com/?i=${omdbId}&plot=full&apikey=${apiKey}`;
        console.log(url)
        const {data} = await axios.get(url)
        console.log("MovieDetails data is: ", data)
        setMovie(data)
        setLoading(false)
    }
    
    useEffect(() => {
        setLoading(true)
        if (omdbId) {
            getMovieById(omdbId)
        }
    }, [omdbId, listItems])

    if(loading) {
        console.log('Loading details...........')
        return(
            <>
            <div className="detail__skeleton--wrapper">
                <div className="detail__img--skeleton"></div>
                <div className="detail__info--wrapper">
                    <div className="skeleton detail__title--skeleton"></div>
                    <div className="skeleton detail__year--skeleton"></div>
                    <div className="skeleton detail__rating--skeleton"></div>
                </div>
            </div>
            <div className="skeleton detail__plot--skeleton"></div>
            </>
        )
    }

  return (
    <>
    {movie && 
    (<div className="modal">
        <div className="modal-combo">
            <img src={movie.Poster} 
            onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loops if the fallback image also fails
                    e.target.src = placeholderImage;
                }}
            alt="" className="modal-img"/>
            <div className="modal-info">
                <p className="modal__title">{movie.Title}</p>
                <div className="modal_type_rating">
                    <p className="movie__PG">{movie.Rated}</p>
                    <p className="movie__type">{movie.Genre}</p>
                    <p className="movie__type movie__rating--modal">{movie.imdbRating}</p>
                </div>
                <p className="modal-info__para">Released: {movie.Released}</p>
                <p className="modal-info__para">Runtime: {movie.Runtime}</p>
                <p className="modal-info__para">Director: {movie.Director}</p>
                <p className="modal-info__para">Actors: {movie.Actors}</p>
                <div className="modal_btns">
                    <button className="modal_btn modal-play"><FontAwesomeIcon icon={faCirclePlay} /><span className="modal-btn-name"> Play</span></button>
                    { isMovieInList?
                        (<button className="modal_btn modal-save btn-disable"><FontAwesomeIcon icon={faBookmark } />
                            <span className="modal-btn-name"> Saved</span>
                            </button>)
                        :
                    (<button className="modal_btn modal-save" onClick={() => SaveToPlayList(movie)}><FontAwesomeIcon icon={faBookmark } />
                        <span className="modal-btn-name"> Save</span>
                        </button>)
                    }
                </div>
            </div>
        </div>
        <p className="modal__plot">{movie.Plot}</p>
    </div>)}
    </>
  )
}
