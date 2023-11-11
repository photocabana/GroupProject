import React from 'react'
import logoTwo from '../assets/cantaloupe_music_logo_black_cropped.png';

const Landing = () => {
  return (
    <div className="container-1" id="--landing-container">
        <img src={logoTwo} alt="Cantaloupe Music Logo" id="--landing-logo" />
        <div className="card" id="--landing-form">
            <div className="card-body" id="--landing-form-body">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Landing