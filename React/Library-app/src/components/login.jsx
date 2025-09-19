import React, {useState, useEffect} from 'react'
import {auth, db} from '../firebase/init.jsx'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import './login.css'

export default function Login() {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            setUser(user)
            if(user){
                // console.log(user)
                setLoading(false)
            }
        })

    }, [])

    function register() {
        const email = 'minan@gmail.com'
        const pwd = 'test_minan_13579'
        createUserWithEmailAndPassword(auth, email, pwd)
        .then( (userCredential) => {
            console.log(userCredential.user.email)
           
        })
        .catch((error) => {
            console.log(error.code)
        })
    }

    function userLogin() {
        const email = 'minan@gmail.com'
        const pwd = 'test_minan_13579'

        signInWithEmailAndPassword(auth, email, pwd)
        .then( (userCredential) => {
            console.log(userCredential.user.email)
            setUser(userCredential.user)
        })
        .catch( (error) => {
            console.log(error)
        })
    }

    function logout() {
        signOut(auth)
        setUser({})
    }

  return (
    <>
    {loading? (<div className="login_skeleton">
            <div className="btn_skeleton"></div>
            <div className="btn_skeleton"></div>
            <div className="btn_skeleton"></div>
        </div>) : 
        (<div>
            <button onClick = {register}>Register</button>
            <button onClick = {userLogin}>Login</button>
            <button onClick = {logout}>Logout</button>
            {user?.email && (<button onClick = {logout}>{user.email.charAt(0).toUpperCase()}</button>)}
            <p>{user?.email}</p>
            <p>{user && user.email}</p>
        </div>)}
    </>
  )
}
