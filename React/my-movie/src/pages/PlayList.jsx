import React from 'react'
import {useCart} from './share.jsx'
import {Movie} from './Recommended.jsx'
import emptyImg from '../assets/undraw_to-the-moon_w1wa.svg'
import { useAuth } from './share.jsx'
import { useNavigate } from 'react-router-dom'

export default function PlayList() {
    const {listItems, listCount, removeFromList} = useCart()
    const {currentUser} = useAuth()
    const navigate = useNavigate()


  return (
    <div className="main">
        <div className="container">
            <div className="row">
            {
                listCount === 0 ? (
                    currentUser ? (
                        <div className="empty_list">
                            <h1 className="empty_title">Playlist is empty...</h1>
                            <img src={emptyImg} alt="" className="empty_list-img" />
                        </div>
                    ) : ( navigate('/'))) :
                    (<div className="movie-list">
                    {
                        listItems.map((movie) => {
                            return (<Movie movie={movie} key={movie.imdbID}>
                                <button id="remove_movie" className="movie__remove" onClick={()=>removeFromList(movie)}>Remove</button>
                                </Movie>)
                        })
                    }
                    </div>)
            }
            </div>
        </div>
    </div>
  )
}
