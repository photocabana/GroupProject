import React from 'react'
import logoOne from '../assets/cantaloupe_music_logo_black.png';


const Nav = () => {
  return (
    <div className='--nav-bar'>
        <img src={logoOne} alt="Cantaloupe Music Logo" id="--nav-bar-logo"/>
        <div className='--nav-bar-links'>
            <a href='/'>Home</a>
            <a href='/music-player'>Music Player</a>
        </div>
    </div>
  )
}

export default Nav