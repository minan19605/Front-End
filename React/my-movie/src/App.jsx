import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import './index.css'

import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails.jsx'

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from './pages/Nav.jsx'
import Footer from './pages/Footer.jsx'
import SearchedMovies from './pages/SearchedMovies.jsx'
import PlayList from './pages/PlayList.jsx'
import {PlayListProvider} from './pages/playListContext.jsx'
import { AuthProvider } from './pages/AuthContext.jsx'
import SignupForm from './pages/SignupForm.jsx'
import LoginForm from './pages/LoginForm.jsx'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}


function App() {

  return (
    <BrowserRouter>
    <>
    <AuthProvider>
      <PlayListProvider>
        <Nav />
        <ScrollToTop />
        <Routes>
          <Route path='/' element= {<Home />}></Route>
          <Route path='/moviedetails/:omdbId' element= {<MovieDetails />}></Route>
          <Route path='/movielist/:title/:year' element={ <SearchedMovies />}></Route>
          <Route path='/playlist' element = {<PlayList/>}></Route>
          <Route path='/signup' element = {<SignupForm />}></Route>
          <Route path='/login' element = {<LoginForm/>}></Route>
        </Routes>
      </PlayListProvider>
    </AuthProvider>
    <Footer />
    </>
    </BrowserRouter>
  )
}

export default App
