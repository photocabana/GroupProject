import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ username, setUsername, socket }) => {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email:'',
        password:''
    })

    const [errors, setErrors] = useState("")

    const onChangeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        socket.emit('joined-server', username);
        navigate('/chat');
        axios.post('http://localhost:8000/api/loginUser', userLogin, {withCredentials:true})
            .then((res) => {
                console.log(res.data._id)
                navigate('/homepage')
            })
            .catch((err) => {
                // console.log(err)
                console.log(err.response.data.message)
                setErrors(err.response.data.message)
            })
    }

    return (
        <div>
            <form onSubmit={submitHandler} className='col-4 mx-auto user-form mt-5'>
                <label>Username</label>
                    <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    />
                    <button>Join</button>
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
                {/* {errors.email ? <p>{errors.email.message}</p> : null} */}
                {errors ? <p>{errors}</p> : null}

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

                <button className='btn btn-dark border mt-3'>Login</button>
                <br />
                <Link className='text-white' to={'/'}>Dont have an account? Sign up here</Link>
            </form>
        </div>
    )
}

export default Login