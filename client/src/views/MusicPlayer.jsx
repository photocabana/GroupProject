import React, { useState } from 'react'
import Nav from '../components/Nav'
import musicPlayerGraphicNoChat from '../assets/undraw_music_player_graphic_no_chat.svg'
import '../index.css';
import { Link } from 'react-router-dom'

const MusicPlayer = () => {
  const [activePlaylist, setActivePlaylist] = useState(0) // This will be/set the id of the playlist that is currently being displayed.

  const displayPlaylistSongs = (playlistId) => {
    // This function will display the playlist-table of the playlist with the id of the playlist that was clicked on.
    setActivePlaylist(playlistId);
  }

  const testPlaylists = [
    {
      id: 1,
      playlistName: "My First Playlist",
      songs: [
        {
          id: 1,
          songName: "Say So",
          artistName: "Doja Cat",
          albumName: "Hot Pink"
        }
      ]
    },
    {
      id: 2,
      playlistName: "My Second Playlist",
      songs: [
        {
          id: 1,
          songName: "Rush",
          artistName: "Troye Sivan",
          albumName: "Something To Give Each Other"
        },
        {
          id: 2,
          songName: "Tala",
          artistName: "Sarah Geronimo",
          albumName: "Tala"
        }
      ]
    }
  ]

  return (
    <div>
        <Nav />
        <div className="container-1" id="music-player-container">
          <div className="container-2" id="playlists-container">
            <div className="playlists-operations">
              <div className="card" id="playlists-heading">
                <div className="card-body" id="playlists-create">
                  <h2 className="card-title">Create a Playlist</h2>
                  <Link to="/create-playlist"><button type="button" className="btn btn-primary">Create</button></Link>
                </div>
              </div>
            </div>
            <div className="playlists-all">
              {testPlaylists.map((playlist) => {
                const isActivePlaylist = playlist.id === activePlaylist;
                return (
                  <div key={playlist.id}>
                    <div className="playlist-card">
                      <h5 className="playlist-title">{playlist.playlistName}</h5>
                      <button onClick={() => displayPlaylistSongs(playlist.id)} type="button">∇</button>
                    </div>
                    { isActivePlaylist &&
                      <table className="playlist-table">
                        <tr className='playlist-song-header'>
                          <td>Song Title</td>
                          <td>Artist Name</td>
                          <td>Album Name</td>
                          <td></td>
                        </tr>
                      {playlist.songs.map((song) => {
                        return (
                            <tr className="playlist-song" key={song.id}>
                              <td>{song.songName}</td>
                              <td>{song.artistName}</td>
                              <td>{song.albumName}</td>
                              <td><button>Play</button></td>
                            </tr>
                        )
                      })}
                      </table>
                      
                    }
                  </div>
                )
              })}
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