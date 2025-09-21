import React, {useState, useEffect} from 'react'
import {SearchBar} from './Nav.jsx'
import {Link, useNavigate} from 'react-router-dom'
import CurtainIntro from './CurtainIntro.jsx';

export function HomeBody({movieTitle, year, inputMovieTitle, inputYear,searchMovie}) {
  const initiallyRevealed = !!sessionStorage.getItem("curtain_shown");
  const [ready, setReady] = React.useState(initiallyRevealed);

  return (
    <>
    {!ready && (
        <CurtainIntro duration={1800} oncePerSession onDone={() =>setReady(true)} />
    )}
    {ready && 
      <div className="homeBody">
        <h3 className="home__title">Input Movie's title</h3>
        <SearchBar
            movieTitle={movieTitle}
            year={year}
            inputMovieTitle={inputMovieTitle}
            inputYear={inputYear}
            searchMovie={searchMovie}
        />
        <div className="recommend__wrapper">
          <span className="recommend">No idea? Check recommend movies</span>
          <Link to='/recommend'>
            <button className="btn_recommend">Recommend</button>
          </Link>
        </div>
    </div>}
  </>
  )
}

export default function Home() {
  const [movieTitle, setMovieTitle] = useState('')
  const [year, setYear] = useState(1980)
  
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
    <div>
       <HomeBody movieTitle={movieTitle}
            year={year}
            inputMovieTitle={inputMovieTitle}
            inputYear={inputYear}
            searchMovie={searchMovie}
            />
    </div>
  )
}
