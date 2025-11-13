'use client';

import { createContext, useContext, useState } from 'react'

interface libraryContextType {
    bookList: string[];
    setBookList: React.Dispatch<React.SetStateAction<string[]>>;
}

const libraryContext = createContext<libraryContextType | undefined>(undefined);


export function libraryProvider({children}: {children: React.ReactNode}) {
    const [bookList, setBookList] = useState<string[]>([])
    
    return(
        <libraryContext.Provider value={{bookList, setBookList}}>
            {children}
        </libraryContext.Provider>
    )
}

export const useLibrary = () => useContext(libraryContext)