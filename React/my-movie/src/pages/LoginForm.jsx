import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './loginForm.css'
import {auth} from '../firebase/init.jsx'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Modal from './Modal.jsx'

import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
    const [userEMail, setEMail] = useState('')
    const [password, setPwd] = useState('')
    const [logErr, setLogErr] = useState('')

    const [user, setUser] = useState({})

    const navigate = useNavigate()

    function userLogin() {
        // e.preventDefault()
        console.log(userEMail, password)
        
        signInWithEmailAndPassword(auth, userEMail, password)
        .then( (userCredential) => {
            console.log(userCredential.user.email)
            setUser(userCredential.user)
            setLogErr('')
            navigate('/')
        })
        .catch( (error) => {
            console.log(error.code)
            setLogErr(error.code)
        })

    }

  return (
    <>
    <Modal isOpen={!!user} >
    <div className="login-form-container">
      <h2>Login</h2>
      <form >
        <div className="form-group">
          <label htmlFor="username">EMail</label>
          <input
            type="email"
            id="username"
            value={userEMail}
            onChange={(e) => setEMail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
          {logErr && <p className="login_err">{logErr}</p>}
        </div>
        
      </form>
      <button type="submit" className="login-btn" onClick={()=> userLogin()}>Login</button>
      <div className="form-footer">
        <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
      </div>
    </div>
    </Modal>
    </>
  );
}
