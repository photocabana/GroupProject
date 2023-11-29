import React from 'react';
import Nav from './Nav';
import '../App.css';
import { Link } from 'react-router-dom'

const ManipulatePlaylist = () => {
  return (
    <div>
        <div className="container-1" id="manipulate-playlist-page">
            <div className="card containter-2" id='manipulate-playlist-container'>
                <div id="manipulate-playlist-heading">
                    <h2>Add a Song</h2>
                </div>
                <div className="card-body">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="playlist-description">Song Upload</label>
                            <button>Upload Your Song File</button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="playlist-name">Song Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="playlist-name">Artist Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="playlist-description">Album Name</label>
                            <textarea className='form-control' rows="5" />
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