import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ username, setUsername, socket }) => {
    // const [usernameError, setUsernameError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('joined-server', username);
        navigate('/chat');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button>Join</button>
            </form>
        </div>
    )
}

export default Login;