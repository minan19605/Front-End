import Todo from '../components/Todo'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {

    const [users, setUser] = useState()

    async function getData() {
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/users")
        setUser(data)
        // console.log(data)
    }

    useEffect(() => {
        // setTimeout(() => { getData()}, 500);
        getData();
        // console.log(data)
    },[]);


    return (
        <div>
            <h1>This my Home page</h1>
            <p>Welcome to my home page!</p>
            <h2> Below are my customers </h2>
            {users ? (users.map((user) => {
                return (
                    <Link key={user.id} to={`/User/${user.id}`} >
                    <div >
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>EMail: {user.email}</p>
                <p>Phone: {user.phone}</p>
                </div>
                </Link>)}
                )): (<h2>Loading...</h2>)}
        </div>
    )
}

