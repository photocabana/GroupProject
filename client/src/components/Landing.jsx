import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    const navigate = useNavigate()

    const logoutUser = () => {
        axios.post('http://localhost:8000/api/logoutUser', {}, {withCredentials:true})
            .then((res) => {
                console.log(res.data)
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <h1 className='text-center'>You Logged In!</h1>
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}

export default Homepage