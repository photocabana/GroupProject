import React, {useState, useEffect, useRef} from 'react';
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
    const [ albumFile, setAlbumFile ] = useState(null);
    const [ albumFileName, setAlbumFileName ] = useState("");
    const [ songFileName, setSongFileName ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const songFileInputRef = useRef();
    const albumFileInputRef = useRef();
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
                    setAlbumFileName(res.data.image);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, [])
    }

    const handleSongFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "audio/mpeg") {
            setSongFile(file);
            console.log(songFile)
            setSongFileName(file.name);
        } else {
            alert("Please upload an MP3 file");
            songFileInputRef.current.value = "";
        }
    }

    const handleAlbumFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.includes("image/")) {
            setAlbumFile(file);
            console.log(albumFile)
            setAlbumFileName(file.name);
        } else {
            alert("Please upload an image file");
            albumFileInputRef.current.value = "";
        }
    }

    const createTrack = (e) => {
        e.preventDefault();

        if (!songFile) {
            alert("Please upload a song file");
            return;
        }

        if (!albumFile) {
            alert("Please upload an album file");
            return;
        }

        const formData = new FormData();
        formData.append("title", songName);
        formData.append("artist", artistName);
        formData.append("album", albumName);
        formData.append("track", songFile);
        formData.append("image", albumFile);
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
        }
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
        formData.append("image", albumFile);

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
                                <input type="file" id="song-upload" ref={songFileInputRef} onChange={handleSongFileUpload} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="song-upload">Album Artwork</label>
                            <div className="file-input-container">
                                {isEditMode && albumFile && <p>Current File: {albumFileName}</p>}
                                <input type="file" id="song-upload" ref={albumFileInputRef} onChange={handleAlbumFileUpload} />
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