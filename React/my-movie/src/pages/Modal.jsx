import React from 'react'
import {Link} from 'react-router-dom'
import './modal.css'

export default function Modal({isOpen, children}) {
    if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <Link to='/'>
        <button className="modal-close-btn">
          &times; {/* 简单的 X 关闭按钮 */}
        </button>
        </Link>
      </div>
    </div>
  )
}
