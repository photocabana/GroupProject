import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './views/Landing';
import MusicPlayer from './views/MusicPlayer';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/music-player' element={<MusicPlayer />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
