import React from 'react'
import logoOne from '../assets/cantaloupe_music_logo_black.png';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Nav = ({ setLoggedUser }) => {
  const navigate = useNavigate()
  const logoutUser = () => {
      axios.post('http://localhost:8000/api/logoutUser', {}, {withCredentials:true})
          .then((res) => {
              setLoggedUser(null)
              console.log(res)
              navigate("/")
          })
          .catch((err) => {
              console.log(err)
          })

  }
  return (
    <div className='--nav-bar'>
        <img src={logoOne} alt="Cantaloupe Music Logo" id="--nav-bar-logo"/>
        <div className='--nav-bar-links'>
            <a href='/'>Home</a>
            <a href='/music-player'>Music Player</a>
            <Link to={'/register'}><button className="btn btn-secondary btn-sm">Register</button></Link>
            <Link to={'/login'}><button className="btn btn-secondary btn-sm">Sign In</button></Link>
            <button onClick={logoutUser} className="btn btn-secondary btn-sm">Logout</button>
        </div>
    </div>
  )
}

export default Nav