import React from 'react'
import './errorpopup.css'

export default function ErrorPopup({ message}) {
  return (
    <div className="main">
        <div className="container">
            <div className="row">
                <div className="popup-wrapper">
                    <div className='popup-window'>
                        <h2 className="popup-title">Error!</h2>
                        <p className="popup-msg">{message}</p>
                        {/* <button onClick={onClose}>Close</button> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
