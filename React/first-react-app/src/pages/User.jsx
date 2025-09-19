import {Link, useParams} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function User() {
    const {userId} = useParams();
    const [user, setUser] = useState()

    async function fetchUserData(userId) {
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        // console.log(data)
        setUser(data)
    }

    useEffect(() => {
        fetchUserData(userId)
    }, [userId])
    

    return (
        <div>
        <Link to='/'>Go back</Link>
        <p>ID: {user?.id}</p>
        <p>Name: {user?.name}</p>
        <p>EMail: {user?.email}</p>
        <p>Phone: {user?.phone}</p>
        </div>
        
    )
}