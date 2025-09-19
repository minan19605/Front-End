import React, { createContext, useState, useContext, useEffect} from 'react'
import { db } from '../firebase/init'
import { doc,getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useAuth } from './AuthContext.jsx'

const playListContext = createContext()

export const PlayListProvider = ( {children}) => {
    const [listItems, setListItems] = useState([])
    const {currentUser} = useAuth()

    useEffect(()=>{
        const fetchMovieList = async () => {
            if(currentUser) {
                const userDocRef = doc(db, 'users', currentUser.uid)
                try {
                    const movieList = await getDoc(userDocRef)
                    if (movieList.exists() && movieList.data().playList) {
                        setListItems(movieList.data().playList)
                    }
                }catch(e) {
                    setListItems([])
                    console.log("Fetch movie list error is: ", e)
                }
            }
            else {
                setListItems([])
            }
        }

        fetchMovieList()
    },[currentUser])

    const addToList = async (item) => {

        if(!currentUser) {
            console.error ("No user is logged in.")
            return 
        }

        const userDocRef = doc(db, 'users', currentUser.uid)

        try {
            const existDoc = await getDoc(userDocRef)
            console.log("existDoc exists : ", existDoc.exists())
            if(existDoc.exists()) {
                const userData = existDoc.data()
                console.log('userData is: ', userData)

                const ifExistInDB = userData.playList.find(movie => movie.imdbID === item.imdbID)
                if (ifExistInDB) {
                    console.log("Movie already be added")
                    return
                }

                try {
                    await updateDoc(userDocRef, {
                        playList: arrayUnion(item)
                    })
                    console.log("Added to db updateDoc for user:", currentUser.uid)
                }catch(e) {
                    if (e.code === 'not-found') {
                        try {
                            await setDoc(userDocRef, {
                                playList: [item]
                            })
                            console.log("Create playList and add first movie in DB")
                        } catch(e) {
                            console.error( 'Add first record setDoc error: ', e)
                        }
                    }
                    else {
                        console.error("Add document updateDoc error: ", e)
                    }
                }
            } else {
            try {
                    await setDoc(userDocRef, {
                        playList: [item]
                    })
                    console.log("Create playList and add first movie in DB")
                } catch(e) {
                    console.error( 'Add first record setDoc error: ', e)
                }
            }

        } catch(e) {
            console.error("Add document getDoc error: ", e)
        }
        
        setListItems( (currentItems) => {
            const ifExist = currentItems.find(movie => movie.imdbID === item.imdbID) //check if already exist in the playlist
            if (ifExist) {
                return currentItems
            }
            else {
                return [...currentItems, item]
            }
        })
    }

    const removeFromList = async (item) => {

        if (!currentUser){
            console.error("No user is logged in.")
            return
        }

        const userDocRef = doc(db, 'users', currentUser.uid)
        try {
            await updateDoc(userDocRef, {
                playList: arrayRemove(item)
            })
            console.log("Remove by updateDoc success")
        }catch(e) {
            console.error("Remove movie from DB faliure: ", e)
        }
        
        setListItems( (currentItems) => {
            return currentItems.filter( movie => movie.imdbID !== item.imdbID)
        })
    }

    const listCount = listItems.length

    return(
        <playListContext.Provider value={{listItems, listCount, addToList, removeFromList}}>
            {children}
        </playListContext.Provider>
    )
}

export const useCart = () => {
    return useContext(playListContext)
}