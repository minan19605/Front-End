// import './App.css';
import Nav from './components/Nav'
import Home from './pages/Home';
import Books from './pages/Books';
import Footer from './components/Footer';
import Login from './components/login'


import {BrowserRouter, Routes, Route, } from "react-router-dom";
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}


function App() {

  const [cart, setCart] = useState([])
  function addToCart(book) {
    // const itemExists = cart.find(item => item.id === book.id)
    // if (itemExists){
    //   setCart(cart.map(item => item.id === book.id ? {...item, unit: item.unit +1}: item))
    // }
    // else{
    //   const bookInCart = {...book, unit:1};
    //   setCart([...cart, bookInCart])
    // }

    setCart([...cart, {...book, unit:1}])
  }

  useEffect(() => {
    // console.log(cart)

  }, [cart])

  function getItemNumber(cart) {
    return cart.reduce((sum, book) => {return sum + book.unit},0)
  }

  function changeUnit(id, value) {
    // console.log(id, value)
    setCart(
      preCart => preCart.map(book => book.id === id ? {...book, unit:value} : book)
    );
  }

  function RemoveBook(id) {
    setCart(
      preCart => preCart.filter(book => book.id !== id)
    )
  }

  return (
    <BrowserRouter>
      <div>
        <Nav getItemNumber= {getItemNumber} cart={cart}/>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/books/:bookId" element={<BookDetail addToCart={addToCart} />}></Route>
          <Route path="/Cart" element={<Cart cartBookList={cart} RemoveBook={RemoveBook} changeUnit={changeUnit}/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
