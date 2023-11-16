import React, { useState, useEffect } from 'react'
import musicPlayerGraphicNoChat from '../assets/undraw_music_player_graphic_no_chat.svg'
import '../index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MusicPlayer = () => {
  const [activePlaylist, setActivePlaylist] = useState(0) // This will be/set the id of the playlist that is currently being displayed.
  const [allSongs, setAllSongs] = useState([]);

  const displayPlaylistSongs = (playlistId) => {
    // This function will display the playlist-table of the playlist with the id of the playlist that was clicked on.
    setActivePlaylist(playlistId);
  }

  // const addSongToActivePlaylist {
    
  // }

  useEffect(() => {
    axios.get("http://localhost:8000/api/track")
      .then((res) => {
        setAllSongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const deleteSong = (songId) => {
    axios.delete(`http://localhost:8000/api/track/${songId}`)
      .then((res) => {
        setAllSongs(allSongs.filter((song) => song._id !== songId));
      })
      .catch((err) => {
        console.log(err);
    })}

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
      <div className="container-1" id="music-player-container">
        <div className="container-2" id="playlists-container">
          <div className="playlists-operations">
            <div className="card" id="playlists-heading">
              <div className="card-body" id="playlists-create">
                <div className="card-title">Downloaded Songs</div>
                <Link to="/createSong">
                  <button type="button" className="btn btn-primary">
                    Add a Song
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="playlists-all">
            <table className="playlist-table" id="songs-table">
              <tbody>
              <tr className="playlist-song-header">
                <td><i className="fa-solid fa-music"></i>  Song Title</td>
                <td><i className="fa-solid fa-microphone-lines"></i>  Artist Name</td>
                <td><i className="fa-solid fa-record-vinyl"></i>  Album Name</td>
                <td></td>
              </tr>
              {allSongs.map((song) => {
                return (
                  <div key={song._id}>
                    <tr className="playlist-song">
                      <td><i className="fa-solid fa-music"></i>  {song.title}</td>
                      <td><i className="fa-solid fa-microphone-lines"></i>  {song.artist}</td>
                      <td><i className="fa-solid fa-record-vinyl"></i>  {song.album}</td>
                      <td className="song-buttons-container">
                        <div>
                          <button>Add to Active</button>
                          <button>Play</button>
                        </div>
                        <div>
                          <Link to={`/editSong/${song._id}`}><button>Edit Song</button></Link>
                          <button onClick={() => deleteSong(song._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  </div>
                    )}
                )}
                </tbody>
            </table>
          </div>
        </div>
        <div className="container-2" id="playlists-container">
          <div className="playlists-operations">
            <div className="card" id="playlists-heading">
              <div className="card-body" id="playlists-create">
                <div className="card-title">Your Playlists</div>
                <div className="playlists-heading-buttons">
                  <Link to="/createPlaylist">
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
                      <div className="active-playlist"><i className="fa-solid fa-bolt fa-bounce">Active</i></div>
                      : null
                    }
                    <button onClick={() => displayPlaylistSongs(playlist.id)} type="button">
                      ∇
                    </button>
                  </div>
                  {isActivePlaylist && (
                    <table className="playlist-table">
                      <tbody>
                      <tr className="playlist-song-header">
                        <td><i className="fa-solid fa-music"></i>  Song Title</td>
                        <td><i className="fa-solid fa-microphone-lines"></i>  Artist Name</td>
                        <td><i className="fa-solid fa-record-vinyl"></i>  Album Name</td>
                      </tr>
                      {playlist.songs.map((song) => {
                        return (
                          <tr className="playlist-song" key={song.id}>
                            <td><i className="fa-solid fa-music"></i>  {song.songName}</td>
                            <td><i className="fa-solid fa-microphone-lines"></i>  {song.artistName}</td>
                            <td><i className="fa-solid fa-record-vinyl"></i>  {song.albumName}</td>
                            <td>
                              <button>Play</button>
                            </td>
                          </tr>
                        );
                      })}
                      </tbody>
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