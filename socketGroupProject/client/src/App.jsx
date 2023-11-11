import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Chat from './components/Chat'
import Homepage from './components/Homepage'
import Nav from './components/Nav'

function App() {
  const [socket] = useState(() => io(':8000'))
  const [username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    console.log('connected')
    socket.on('connect', () => {
      console.log(socket.id)
      setIsConnected(true)
    })

    return () => {
      socket.disconnect(true)
    }
  }, [])

  return (
    <div className='App'>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login socket={socket} username={username} setUsername={setUsername} />} />
          <Route path="/chat" element={<Chat socket={socket} username={username} setUsername={setUsername} />} />
          <Route path="/homepage" element={<Homepage socket={socket} username={username} setUsername={setUsername} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App