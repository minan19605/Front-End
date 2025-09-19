import React, {useEffect} from 'react'
import './cart.css'
import { Link } from "react-router-dom";
import EmptyCart from "../assets/empty_cart.svg";
// import { useEffect } from 'react'

export default function Cart({cartBookList, changeUnit, RemoveBook}) {

  function calcSubTotalPrice(cartBookList) {
    return cartBookList.reduce((sum, {salePrice, originalPrice, unit}) => {
      return sum + ((salePrice || originalPrice)*unit)
    }, 0)
  }

  useEffect(() => {}, [cartBookList])

  const subTotalPrice = calcSubTotalPrice(cartBookList)
  const tax = subTotalPrice * 0.1
  const TotalPrice = subTotalPrice + tax

  return (
    <div className="container">
        <div className="cart__row">
            <h2 className="cart__title">Cart</h2>
            <div className="cart__column--row">
                <p className="cart__column--name">Book</p>
                <p className="cart__column--name">Quantity</p>
                <p className="cart__column--name">Price</p>
            </div>
            {
              cartBookList.map((oneBook) => {
                return(
                  <div className="cart__item--row" key={oneBook.id}>
                      <div className="cart__item--book">
                          <figure className="cart__book-img--wrapper">
                              <img src={oneBook.url} alt=""/>
                          </figure>
                          <div className="cart__book--info">
                              <h4 className="cart__book--name">{oneBook.title}</h4>
                              <div className="cart__book--price">${(oneBook.salePrice || oneBook.originalPrice.toFixed(2))}</div>
                              <button className="cart__remove--item" onClick={() => RemoveBook(oneBook.id)}>Remove</button>
                          </div>
                      </div>
                      <div className="cart__item--number">
                          <input type="number" id="quantity" name="quantity" className="item__number" value={oneBook.unit} min= {1}
                          onChange = {(event) => {
                            // console.log(event.target.valueAsNumber, oneBook.id)
                            changeUnit(oneBook.id, event.target.valueAsNumber)
                          }} />
                      </div>
                      <div className="cart__item--price">
                          <p className="item--price">${(oneBook.unit * (oneBook.salePrice || oneBook.originalPrice)).toFixed(2)}</p>
                      </div>
                  </div>
              )})
            }
            {!(cartBookList.length>0) && (
                  <div className="cart__empty">
                    <img className="cart__empty--img" src={EmptyCart} alt="" />
                    <h2>You don't have any books in your cart!</h2>
                    <Link to="/books">
                      <button className="btn">Browse books</button>
                    </Link>
                  </div>
              )}
            {(cartBookList.length>0) && (<div className="cart__item--total">
                <div className="cart__item--sub-wrapper">
                    <p className="cart__item--sub-name">Subtotal</p>
                    <p className="cart__item--sub-price">${subTotalPrice.toFixed(2)}</p>
                </div>
                <div className="cart__item--sub-wrapper">
                    <p className="cart__item--sub-name">Tax</p>
                    <p className="cart__item--sub-price">${tax.toFixed(2)}</p>
                </div>
                <div className="cart__item--sub-wrapper total">
                    <p className="cart__item--sub-name">Total</p>
                    <p className="cart__item--sub-price">${TotalPrice.toFixed(2)}</p>
                </div>
                <button className="cart__checkout">Proceed to Checkout</button>
            </div>)}
        </div>
    </div>
  )
}
