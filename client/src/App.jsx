import axios from "axios";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './views/Landing';
import MusicPlayer from './views/MusicPlayer';
import Register from './components/Register';
import Login from './components/Login';
import Homepage from './components/Homepage'
import Chat from './components/Chat'
import Nav from "./components/Nav";
import CreatePlaylist from "./components/ManipulatePlaylist";
import ManipulatePlaylist from "./components/ManipulatePlaylist";
import UsersPlaylists from "./views/UsersPlaylists";
import CreateSong from "./components/CreateSong";

function App() {
  const [loggedUser, setLoggedUser] = useState({})

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getLoggedUser", { withCredentials: true })
      .then((res) => {
        setLoggedUser(res.data.user), console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    // getAllJewelry()
  }, [])

  return (
    <>
      <div className="App">
        <BrowserRouter>
        <Nav />
          <Routes>
            // This will be music related once created & then the 404 on 18 will go away. 
            {/* <Route
                path="/shopInventory"
                element={
                  <ShopInventory
                    allJewelry={allJewelry}
                    setAllJewelry={setAllJewelry}
                    loggedUser={loggedUser}
                    setLoggedUser={setLoggedUser}
                  />
                }
              /> */}
            <Route path='/' element={<Landing />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/homepage' element={<Homepage />}/>
            <Route path='/chat' element={<Chat />}/>
            <Route path='/music-player' element={<MusicPlayer />}/>
            <Route path='/create-playlist' element={<ManipulatePlaylist/>} />
            <Route path='/users-playlists' element={<UsersPlaylists />}/>
            <Route path='/create-song' element={<CreateSong />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
