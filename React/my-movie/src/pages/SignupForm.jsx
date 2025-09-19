
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './signup.css'; 

import {auth} from '../firebase/init.jsx'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Modal from './Modal.jsx';

import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [user, setUser] = useState({})

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [ifSamePwd, setSamePwd] = useState(true)

  const [logErr, setLogErr] = useState('')

  const navigate = useNavigate()

  function checkPassword(pwd) {
    setSamePwd(false)
    // console.log(pwd, password1)
     if(pwd === password1) {
        setSamePwd(true)
        return true
    }
    return false
  }

  const handleSubmit = () => {
    // e.preventDefault();
    setLogErr('')
    setSamePwd(false)

    if(! checkPassword(password2))
    {
        return
    }

    createUserWithEmailAndPassword(auth, email, password1)
    .then( (userCredential) => {
        console.log(userCredential.user.email)
        setUser(userCredential.user)
        // setLogErr('SignUp successful!')
        navigate('/')
    })
    .catch( (error) => {
        console.log(error.code)
        setLogErr(error.code)
    })

    console.log('email:', email, 'password:', password1);
  };

  return (
    <>
    <Modal isOpen={!!user}>
    <div className="signup-form-container">
      <h2>SignUp</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">EMail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Re-entry Password</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => { setPassword2(e.target.value)}}
            required
          />
          {!ifSamePwd && <p className="signup_err">The passwords you entered do not match.</p>}
          {!!logErr && <p className="signup_err">{logErr}</p>}
        </div>
      </form>
      <button type="submit" className="signup-btn" onClick = {() =>handleSubmit()}>SignUp</button>
      <div className="form-footer">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
    </Modal>
    </>
  );
};

export default SignupForm;