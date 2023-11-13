import React from 'react'
import Nav from '../components/Nav'
import musicPlayerGraphicNoChat from '../assets/undraw_music_player_graphic_no_chat.svg'
import '../index.css';

const MusicPlayer = () => {
  return (
    <div>
        <Nav />
        <div className="container-1" id="music-player-container">
          <div className="container-2" id="playlists-container">
            <div className="playlists-operations">
              <div className="card" id="playlists-heading">
                <div className="card-body" id="playlists-create">
                  <h2 className="card-title">Create a Playlist</h2>
                  <button type="button" className="btn btn-primary">Create</button>
                </div>
              </div>
            </div>
            <div className="playlists-all">
              {/* Dynamically rendered playlists will be rendered here */}
              <div className="playlist"></div>
            </div>
        </div>
          <div className="music-player-graphic-container">
            <img src={musicPlayerGraphicNoChat} alt="A music player graphic" />
            <div className="music-player-album-container">Album Artwork will go here</div>
            <div className="music-player-web-player-container">Web player will go here</div>
          </div>
        </div>
    </div>
  )
}

export default MusicPlayer