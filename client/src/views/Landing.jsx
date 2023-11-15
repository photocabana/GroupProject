import React, { useState } from 'react'
import axios from 'axios'
import logoTwo from '../assets/cantaloupe_music_logo_black_cropped.png';
import { Link, useNavigate } from 'react-router-dom'

const Landing = (props) => {
    const {setLoggedUser} = props
    const [userLogin, setUserLogin] = useState({
        username:'',
        password:''
    })

    const [errors, setErrors] = useState()
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/loginUser', userLogin, {withCredentials:true})
            .then((res) => {
                setLoggedUser (res.data.user)
                console.log(res, "Inconceivable")
                navigate('/music-player')
            })
            .catch((err) => {
                console.log(err.response.data.message, "BOOOOOOOOOOOOOOOOOOOOO")
                setErrors(err.response.data.message, "BOOOOOOOOOOOOOOOOOOOOO")
            })
    }

return (
    <div className="container-1" id="--landing-container">
        <img src={logoTwo} alt="Cantaloupe Music Logo" id="--landing-logo" />
        <div className="card" id="--landing-form">
            <div className="card-body" id="--landing-form-body">
                <form onSubmit={submitHandler} action="">
                    <div className="form-group">
                        <label className='form-label'>
                        Username
                        </label>
                        <input 
                        type="text" 
                        name="username"
                        className='form-control' 
                        onChange={onChangeHandler} 
                        value={userLogin.username} 
                        />
                        {errors ? <p>{errors}</p> : null}
                    </div>
                    <div className="form-group">
                        <label className='form-label'>
                        Email:
                        </label>
                        <input 
                        type="email" 
                        name="email" 
                        className='form-control' 
                        onChange={onChangeHandler} 
                        value={userLogin.email} 
                        />   
                        {errors ? <p>{errors}</p> : null} 
                    </div>
                    <div className="form-group">
                        <label className='form-label'>
                        Password:
                        </label>
                        <input 
                        type="password" 
                        name="password" 
                        className='form-control' 
                        onChange={onChangeHandler} 
                        value={userLogin.password} 
                        />
                        {errors ? <p>{errors}</p> : null}
                    </div>
                    <button type="submit">Login</button>
                </form>



                    {/* <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control"/>
                    </div>
                    <button type="submit">Login</button>
                </form> */}
            </div>
        </div>
    </div>
)
}

export default Landing