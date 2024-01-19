import React from 'react'
import logoOne from '../assets/cantaloupe_music_logo_black_cropped.png';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"


const Nav = ({ setLoggedUser }) => {
    const navigate = useNavigate()
    const logoutUser = () => {
        axios.post('http://localhost:8000/api/logoutUser', {}, {withCredentials:true})
            .then((res) => {
                setLoggedUser(null)
                console.log(res, "No one of consequence")
                navigate("/")
            })
            .catch((err) => {
                console.log(err, "Truly, you have dizzying intellect")
            })
    }

    return (
        <div className='--nav-bar bg-orangeWeb flex h-fit lg:flex-row flex-col justify-between items-center shadow-boxShadow1 p-3'>
            <img src={logoOne} alt="Cantaloupe Music Logo" id="--nav-bar-logo" className='h-32 w-auto object-cover'/>
            <div className='--nav-bar-links max-lg:border-t-4 border-t-melonGreen max-lg:p-2 space-x-5'>
                <a href='/' className='hover:italic hover:underline hover:text-melonGreen'>Home</a><span>|</span>
                <a href='/music-player' className='hover:italic hover:underline hover:text-melonGreen'>Music Player</a><span>|</span>
                <Link to={'/register'}><button className="btn-secondary">Register</button></Link>
                <Link to={'/login'}><button className="btn btn-secondary btn-sm">Sign In</button></Link>
                <button onClick={logoutUser} className="btn btn-secondary btn-sm">Logout</button>
            </div>
        </div>
    )
}

export default Nav