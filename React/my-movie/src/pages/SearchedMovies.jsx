import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { apiKey } from './share.jsx';

import { useParams } from 'react-router-dom';
import { Movie, MovieSkeleton} from './Recommended.jsx'
import ErrorPopup from './ErrorPopup.jsx';

async function fetchMoviebyTitle(text, page) {
    const url = `https://www.omdbapi.com/?s=${text}&page=${page}&apikey=${apiKey}`
    try {
        const {data} = await axios.get(url)
        // console.log("Search result is: ", data)

        if (data.Response === 'False') {
            throw new Error(data.Error)
        }

        return {item: data.Search, total: Number(data.totalResults), error: ''}

    } catch (error) {
        return {item: [], total:0, error: error.message}
    }
}

async function fetchMoviesDetails(idList) {

    const promises = idList.map( id => axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`) )
    const responses = await Promise.all(promises)

    const moviesDetails = responses.map(response => response.data)

    return moviesDetails
}


export default function SearchedMovies() {

    const { title, year } = useParams()

    const [isLoading, setLoading] = useState(false)
    const [errMsg, setErrorMsg] = useState('')
    const [moviesDetails, setDetails] = useState([])

    const [filterValue, setFilterValue] = useState('')
    
    useEffect(() => {
        let sortedMovieList = [...moviesDetails]
        if (filterValue === "Year old to new") {
            sortedMovieList.sort((a,b) => Number(a.Year) - Number(b.Year))
        }else if (filterValue === "Year new to old") {
            sortedMovieList.sort((a,b) => Number(b.Year) - Number(a.Year) )
        }else if (filterValue === "Rating high to low") {
            sortedMovieList.sort((a,b) => Number(b.imdbRating) - Number(a.imdbRating))
        }else if (filterValue === "Rating low to high") {
            sortedMovieList.sort((a,b) => Number(a.imdbRating) - Number(b.imdbRating))
        }
        setDetails(sortedMovieList)
        console.log(sortedMovieList)
    }, [filterValue])

    useEffect( () => {
        const getMoviesDetails = async () => {
                try {
                    // 1. get first page data
                    const page1Data = await fetchMoviebyTitle(title, 1)
                    if (page1Data.error) {
                        throw new Error(page1Data.error)
                    }

                    const totalResult = page1Data.total
                    const totalPage = Math.ceil(totalResult / 10);
                    const testPages = totalPage>2 ? 2: 0; // for saving messages to OMDB
                    let fullList = []
                    if(testPages){
                        const page2Data =  await fetchMoviebyTitle(title, 2)
                        if (page2Data.error) {
                            throw new Error(page2Data.error)
                        }
                        fullList = [...page1Data.item, ...page2Data.item]
                    }
                    else {
                        fullList = [...page1Data.item]
                    }

                    const ids = fullList.filter(movie => Number(movie.Year) >= Number(year)).map(movie => movie.imdbID)
                    const movieList = await fetchMoviesDetails(ids)
                    setDetails(movieList)
                    setErrorMsg('')
                }catch (error) {
                    setErrorMsg(error.message)
                } finally {
                    setLoading(false)
                }
            }

        if (title) {
            setLoading(true)
            setErrorMsg('')
            getMoviesDetails()
            a('')
        }
    }, [title, year])

    if (isLoading) {
        const loadingStatus = [1,2,3,4,5]
        return (
            <div className="main">
                <div className="container">
                    <div className="row">
                        <h1 className="title">Searching...</h1>
                        <div className="movie-list">
                            {
                                loadingStatus.map((item) => {
                                    return <MovieSkeleton key={item} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (errMsg) {
        console.log("Get error", errMsg)
        return (
            <ErrorPopup message={errMsg} />
        )
    }

    if (moviesDetails)
    {
        return (
            <div>
                <div className="main">
                <div className="container">
                    <div className="row">
                        <div className="title__wrapper">
                            <h1 className="title">Searched Movies</h1>
                            <select name="filter" id="filter__movies" value={filterValue}
                            onChange={(event) => a(event.target.value)}>
                                <option value="" disabled >Sort</option>
                                <option value="Year old to new">Year old to new</option>
                                <option value="Year new to old">Year new to old</option>
                                <option value="Rating high to low">Rating high to low</option>
                                <option value="Rating low to high">Rating low to high</option>
                            </select>
                        </div>
                        <div className="movie-list">
                            {
                            moviesDetails.map((movie) => {
                                return <Movie movie={movie} key={movie.imdbID} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
            </div>
          )
    }
}
