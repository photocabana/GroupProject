import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ManipulateSong = (props) => {
    const [ songName, setSongName ] = useState("");
    const [ artistName, setArtistName ] = useState("");
    const [ albumName, setAlbumName ] = useState("");
    const [ songFile, setSongFile ] = useState(null);
    const [ songFileName, setSongFileName ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const navigate = useNavigate();
    const { isEditMode } = props;
    const { songId } = useParams();

    { isEditMode && 
        useEffect(() => {
            axios.get("http://localhost:8000/api/track/" + songId)
                .then((res) => {
                    setSongName(res.data.title);
                    setArtistName(res.data.artist);
                    setAlbumName(res.data.album);
                    setSongFile(res.data.track);
                    setSongFileName(res.data.track);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, [])
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        setSongFile(file)
        setSongFileName(e.target.files[0].name)
    }

    const createTrack = (e) => {
        e.preventDefault();

        if (!songFile) {
            alert("Please upload a song file");
            return;
        }

        const formData = new FormData();
        formData.append("title", songName);
        formData.append("artist", artistName);
        formData.append("album", albumName);
        formData.append("track", songFile);

        axios.post("http://localhost:8000/api/track/upload", formData)
            .then((res) => {
                navigate("/music-player");
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    };

    const updateTrack = (e) => {
        e.preventDefault();

        if (!songFile) {
            alert("Please upload a song file");
            return;
        }
        
        const formData = new FormData();
        formData.append("title", songName);
        formData.append("artist", artistName);
        formData.append("album", albumName);
        formData.append("track", songFile);

        axios.patch("http://localhost:8000/api/track/" + songId, formData) 
            .then((res) => {
                navigate("/music-player");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    }

  return (
    <div>
        <div className="container-1" id="manipulate-playlist-page">
            <div className="card containter-2" id='manipulate-playlist-container'>
                <div id="manipulate-playlist-heading">
                    {isEditMode ? <h2>Edit Song</h2> : <h2>Add a Song</h2>}
                </div>
                <div className="errors">
                    {errors ? Object.values(errors).map((error, index) => {
                        return (
                                <p key={index}>Error: {error.message}</p>
                                )}) : null}
                </div>
                <div className="card-body">
                    <form onSubmit={isEditMode ? (e) => updateTrack(e) : (e) => createTrack(e)}>
                        <div className="form-group">
                            <label htmlFor="song-upload">Song Upload</label>
                            <div className="file-input-container">
                                {isEditMode && songFile && <p>Current File: {songFileName}</p>}
                                <input type="file" id="song-upload" onChange={handleFileUpload} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="song-name">Song Name</label>
                            <input type="text" className="form-control" value={songName} onChange={(e) => setSongName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="artist-name">Artist Name</label>
                            <input type="text" className="form-control" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="album-name">Album Name</label>
                            <textarea className='form-control' rows="5" value={albumName} onChange={(e) => setAlbumName(e.target.value)} />
                        </div>
                        <div className="buttons-holder">
                            { isEditMode ? 
                            <button type="submit">Update</button> 
                            : 
                            <button type="submit">Create</button>
                            }
                            <Link to="/music-player"><button>Cancel</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManipulateSong