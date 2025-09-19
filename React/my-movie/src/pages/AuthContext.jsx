import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/init.jsx'
import { signOut, onAuthStateChanged } from 'firebase/auth'

const authCtx = createContext()

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSubcriber = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unSubcriber
    }, [])

    const logout = () => {
        return signOut(auth)
    }

  
  return (
    <authCtx.Provider value={{currentUser, logout}}>
        { !loading && children }
    </authCtx.Provider>
  )
}

export const useAuth = () => {
    return useContext(authCtx)
}
