import React, {useState} from 'react';
import Nav from './Nav';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManipulatePlaylist = () => {
    const [ songName, setSongName ] = useState("")
    const [ artistName, setArtistName ] = useState("")
    const [ albumName, setAlbumName ] = useState("")
    const [ songFile, setSongFile ] = useState()

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        console.log(`heres your file: ${file}`)
        setSongFile(file)
        console.log(`heres your songFile: ${songFile}`)
    }

    const createTrack = (e) => {
        e.preventDefault()

        if (!songFile) {
            alert("Please upload a song file")
            return;
        }

        const formData = new FormData();
        formData.append("songName", songName);
        formData.append("artistName", artistName);
        formData.append("albumName", albumName);

        axios.post("http://localhost:8000/api/createTrack", formData)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

  return (
    <div>
        <div className="container-1" id="manipulate-playlist-page">
            <div className="card containter-2" id='manipulate-playlist-container'>
                <div id="manipulate-playlist-heading">
                    <h2>Add a Song</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => createTrack(e)}>
                        <div className="form-group">
                            <label htmlFor="song-upload">Song Upload</label>
                            <input type="file" onChange={handleFileUpload} ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="song-name">Song Name</label>
                            <input type="text" className="form-control" onChange={(e) => setSongName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="artist-name">Artist Name</label>
                            <input type="text" className="form-control" onChange={(e) => setArtistName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="album-name">Album Name</label>
                            <textarea className='form-control' rows="5" onChange={(e) => setAlbumName(e.target.value)} />
                        </div>
                        <div className="buttons-holder">
                            <button type="submit">Create</button>
                            <Link to="/music-player"><button>Cancel</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManipulatePlaylist