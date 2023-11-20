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
import ManipulatePlaylist from "./components/ManipulatePlaylist";
import UsersPlaylists from "./views/UsersPlaylists";
import ManipulateSong from "./components/ManipulateSong";
import Player from "./components/Player/Player";

function App() {
  const [loggedUser, setLoggedUser] = useState({})
  const [allSongs, setAllSongs] = useState([])
  const [allPlaylists, setAllPlaylists] = useState([])

    //Songs Pull
    useEffect(() => {
      axios.get('http://localhost:8000/api/track/')
      .then((res) => {
        setAllSongs(res.data.user)
        console.log(res, "Songs Pull App - then")
      })
      .catch((err) => {
        console.log(err, "Songs Pull App")
      })
  setAllSongs()
}, [])
  
    //Playlists Pull
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/playlist/')
      .then((res) => {
        setAllPlaylists(res.data)
        console.log(res, "Playlists Pull App - then")
      })
      .catch((err) => {
        console.log(err, "Playlists Pull App")
      })
  setAllPlaylists()
}, [])

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getLoggedUser", { withCredentials: true })
      .then((res) => {
        setLoggedUser(res.data.user)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    setAllSongs()
  }, [])

  return (
    <>
      <div className="App">
        <BrowserRouter>

        <Nav setLoggedUser={setLoggedUser}/>

          <Routes>
            //Test Route for Music Player
            <Route 
            path="/musicPlayerTest" 
            element={<Player />}
            tracks={allSongs}
            />

            <Route 
            index element={<Landing 
              setLoggedUser={setLoggedUser} 
            />}/>

            <Route 
              path="/register" 
              element={<Register 
            />} />

            <Route
              path="/login"
              element={<Login 
              setLoggedUser={setLoggedUser} 
            />}/>

            <Route
              path="/homepage"
              element={<Homepage
              allSongs={allSongs}
              setAllSongs={setAllSongs}
              allPlaylists={allPlaylists}
              setAllPlaylists={setAllPlaylists}
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
              />}/>

            <Route
              path="/chat"
              element={<Chat 
              loggedUser={loggedUser}
              allSongs={allSongs}
              // allMessages or chat will go here once created
              />}/>

            <Route
              path="/music-player"
              element={<MusicPlayer
              loggedUser={loggedUser}
              allSongs={allSongs}
              allPlaylists={allPlaylists}
              />}/>

            <Route
              path="/editPlaylist/:playlistId"
              element={<ManipulatePlaylist isEditMode={true}
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              allSongs={allSongs}
              allPlaylists={allPlaylists}
              setAllPlaylists={setAllPlaylists}
              />}/>

            <Route
              path="/createPlaylist"
              element={<ManipulatePlaylist isEditMode={false}
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              allSongs={allSongs}
              allPlaylists={allPlaylists}
              setAllPlaylists={setAllPlaylists}
              />}/>

            <Route
              path="/users-playlists"
              element={<UsersPlaylists
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              allPlaylists={allPlaylists}
              allSongs={allSongs}
              // allSongs={allSongs} needs to be linked to playlists
              />}/>

            <Route
              path="/createSong"
              element={<ManipulateSong isEditMode={false}
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              allSongs={allSongs}
              setAllSongs={setAllSongs}
              />}/>

            <Route
              path="/editSong/:songId"
              element={<ManipulateSong isEditMode={true}
              loggedUser={loggedUser} 
              setLoggedUser={setLoggedUser}
              allSongs={allSongs}
              setAllSongs={setAllSongs}
              />}/>

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
