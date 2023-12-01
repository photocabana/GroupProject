import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import {useNavigate} from 'react-router-dom'

const Chat = ({username, socket}) => {
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    // useEffect(() => {
    //     socket.on('new-user', data => {
    //         console.log(data);
    //         setUsers(data.users)
    //         setMessages(data.messages)
    //     })
    //     socket.on('new-message', msgs => {
    //         console.log(msgs)
    //         setMessages(msgs)
    //     })
    // }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit('send-message', {username, msg: input})
        setInput('')
        navigate('/homepage')
    }
    return (
        <div>
            <h1>Chat with any of these users</h1>
            <ul>
                {users.map((user, i) => (
                    <li key={i}>{user.name}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <textarea
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                />
                <button>Send</button>
            </form>
            {
                messages.map((msg, i) => (
                    <p key={i}>{msg.username} says: {msg.msg}</p>
                ))
            }
        </div>
)}

export default Chat