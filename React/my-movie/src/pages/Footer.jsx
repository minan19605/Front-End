import React from 'react'
import myLogo from '../assets/my-logo.png'

export default function Footer() {
  return (
    <>
      <footer>
        <figure className="footer__img">
            <img src={myLogo} alt="" />
        </figure>
        <div className="footer__social--list">
            <a href="" className="footer__social--link linke__hover--effect linke__hover--effect--white">Github</a>
            <a href="" className="footer__social--link linke__hover--effect linke__hover--effect--white">LinkedIn</a>
            <a href="" className="footer__social--link linke__hover--effect linke__hover--effect--white">EMail</a>
            <a href="" className="footer__social--link linke__hover--effect linke__hover--effect--white">Resume</a>
        </div>
        <div><p className="footer__copyright">Copyright &copy 2025 Andrew Min</p></div>
    </footer>
    </>
  )
}
