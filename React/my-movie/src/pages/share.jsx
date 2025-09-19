import React, {createContext,  useContext} from 'react'

export const apiKey = import.meta.env.VITE_OMDB_API_KEY;

export const authCtx = createContext()
export const useAuth = () => {
    return useContext(authCtx)
}

export const playListContext = createContext()
export const useCart = () => {
    return useContext(playListContext)
}