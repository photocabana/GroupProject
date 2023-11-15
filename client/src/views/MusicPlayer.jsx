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

  // const addSongToActivePlaylist {
    
  // }

  const testSongs = [
    {
      id: 1,
      songName: "Say So",
      artistName: "Doja Cat",
      albumName: "Hot Pink"
    },
    {
      id: 2,
      songName: "Rush",
      artistName: "Troye Sivan",
      albumName: "Something To Give Each Other"
    },
    {
      id: 2,
      songName: "Rush",
      artistName: "Troye Sivan",
      albumName: "Something To Give Each Other"
    },
    {
      id: 2,
      songName: "Rush",
      artistName: "Troye Sivan",
      albumName: "Something To Give Each Other"
    },
    {
      id: 2,
      songName: "Rush",
      artistName: "Troye Sivan",
      albumName: "Something To Give Each Other"
    },
    {
      id: 2,
      songName: "Rush",
      artistName: "Troye Sivan",
      albumName: "Something To Give Each Other"
    },
    {
      id: 2,
      songName: "Rush",
      artistName: "Troye Sivan",
      albumName: "Something To Give Each Other"
    },
    {
      id: 3,
      songName: "Tala",
      artistName: "Sarah Geronimo",
      albumName: "Tala"
    }
  ]

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
        },
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
        },
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
        },
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
        },
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
        },
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
      {/* <Nav /> */}
      <div className="container-1" id="music-player-container">
        <div className="container-2" id="playlists-container">
          <div className="playlists-operations">
            <div className="card" id="playlists-heading">
              <div className="card-body" id="playlists-create">
                <div className="card-title">Downloaded Songs</div>
                <Link to="/create-playlist">
                  <button type="button" className="btn btn-primary">
                    Add a Song
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="playlists-all">
            <table className="playlist-table" id="songs-table">
              <tr className="playlist-song-header">
                <td><i class="fa-solid fa-music"></i>  Song Title</td>
                <td><i class="fa-solid fa-microphone-lines"></i>  Artist Name</td>
                <td><i class="fa-solid fa-record-vinyl"></i>  Album Name</td>
                <td></td>
              </tr>
              {testSongs.map((song) => {
                return (
                  <div key={song.id}>
                    <tr className="playlist-song">
                      <td><i class="fa-solid fa-music"></i>  {song.songName}</td>
                      <td><i class="fa-solid fa-microphone-lines"></i>  {song.artistName}</td>
                      <td><i class="fa-solid fa-record-vinyl"></i>  {song.albumName}</td>
                      <td className="song-buttons-container">
                        <button>Add to Active</button>
                        <button>Play</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  </div>
                    )}
                )}
            </table>
          </div>
        </div>
        <div className="container-2" id="playlists-container">
          <div className="playlists-operations">
            <div className="card" id="playlists-heading">
              <div className="card-body" id="playlists-create">
                <div className="card-title">Your Playlists</div>
                <div className="playlists-heading-buttons">
                  <Link to="/create-playlist">
                    <button type="button">
                      Create A Playlist
                    </button>
                  </Link>
                  <Link to="/users-playlists">
                    <button type="button">
                      See Your Playlists
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="playlists-all">
            {testPlaylists.map((playlist) => {
              const isActivePlaylist = playlist.id === activePlaylist ? true : false;
              return (
                <div key={playlist.id}>
                  <div className="playlist-card">
                    <h5 className="playlist-title">{playlist.playlistName}</h5>
                    { isActivePlaylist ? 
                      <div className="active-playlist"><i class="fa-solid fa-bolt fa-bounce">Active</i></div>
                      : null
                    }
                    <button onClick={() => displayPlaylistSongs(playlist.id)} type="button">
                      ∇
                    </button>
                  </div>
                  {isActivePlaylist && (
                    <table className="playlist-table">
                      <tr className="playlist-song-header">
                        <td><i class="fa-solid fa-music"></i>  Song Title</td>
                        <td><i class="fa-solid fa-microphone-lines"></i>  Artist Name</td>
                        <td><i class="fa-solid fa-record-vinyl"></i>  Album Name</td>
                      </tr>
                      {playlist.songs.map((song) => {
                        return (
                          <tr className="playlist-song" key={song.id}>
                            <td><i class="fa-solid fa-music"></i>  {song.songName}</td>
                            <td><i class="fa-solid fa-microphone-lines"></i>  {song.artistName}</td>
                            <td><i class="fa-solid fa-record-vinyl"></i>  {song.albumName}</td>
                            <td>
                              <button>Play</button>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  )}
                </div>
              );
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