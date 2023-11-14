import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import "../App.css"


const Homepage = (props) => {
    const {loggedUser, socket, username, setUsername } = props
    const {setLoggedUser} = useState(loggedUser)
    const [users, setUsers] = useState([])
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [chatHistory, setChatHistory] = useState([])
    const navigate = useNavigate()

    // useEffect(() => {
    //     socket.on('new-user-joined', (data) => {
    //     console.log(data)
    //     setUsers(data)
    //     })
    //     socket.on('send-message-to-all-clients', (data) => {
    //     setMessages((prevMessages) => [...prevMessages, data])
    //     })
    //     socket.on('chat-history', (history) => {
    //     setChatHistory(history)
    //     })
    // }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('send-message', { message: input, username: username })
        setInput('')
    }

    return (
        <div>
            <h1 className='text-center'>You Logged In!</h1>
            <button onClick={logoutUser}>Logout</button>
            <div>
                <h3>Users in the chat</h3>
                {users.map((user) => (
                    <p key={user.id}>username: {user.username}</p>
                ))}
                {chatHistory.map((message) => (
                    <div key={message.id}>
                    {message.username} says: {message.message}
                    </div>
                ))}
                {messages.map((message) => (
                    <div key={message.id}>
                    {message.username} says: {message.message}
                    </div>
                ))}
                <form onSubmit={sendMessage}>
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    />
                    <button>
                    Send Message
                    </button>
                </form>
                </div>
        </div>
    )
}

export default Homepage