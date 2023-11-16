import React from 'react';
import Nav from './Nav';
import '../App.css';
import { Link } from 'react-router-dom'

const ManipulatePlaylist = (props) => {
    const { isEditMode } = props;
  return (
    <div>
        <div className="container-1" id="manipulate-playlist-page">
            <div className="card containter-2" id='manipulate-playlist-container'>
                <div id="manipulate-playlist-heading">
                    {isEditMode ? <h2>Edit Playlist</h2> : <h2>Create Playlist</h2>}
                </div>
                <div className="card-body">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="playlist-name">Playlist Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="playlist-description">Playlist Description</label>
                            <textarea className='form-control' rows="10" />
                        </div>
                        <div className="buttons-holder">
                            {isEditMode ? 
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

export default ManipulatePlaylist