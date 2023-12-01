import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../App.css'
import { Link, useParams, useNavigate } from 'react-router-dom'

const UsersPlaylists = (props) => {
// This will be/set the id of the playlist that is currently being displayed.
    const [allSongs, setAllSongs] = useState([])
    const { loggedUser, setLoggedUser, allPlaylists,setAllPlaylists, isEditMode,  } = props
    const [activePlaylist, setActivePlaylist] = useState({
        name: "",
        description: "",
        songs: ""
    }) 

    const {id} = useParams()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/track/${id}`)
        .then((res) => {
            console.log(res)
            console.log(res.data.user)
            setAllSongs(res.data.user)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const deletePlaylist = (playlistId) => {
        axios.delete(`http://localhost:8000/api/playlist/${playlistId}`)
        .then((res) => {
            setAllPlaylists(allPlaylists.filter((playlist) => playlist._id !== playlistId));
        })
        .catch((err) => {
            console.log(err);
    })}

    const deleteSong = (songId) => {
        axios.delete(`http://localhost:8000/api/track/${songId}`)
        .then((res) => {
            console.log(setAllSongs)
            setAllSongs(allSongs.filter((song) => song._id !== songId))
        })
        .catch((err) => {
            console.log(err)
    })}

    const submitHandler = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/editPlaylist/${playlistId}`, playlist)
        .then((response) => {
            console.log('Look at me response', response)
            setAllPlaylists()
            navigate("/homepage")
        })
        .catch((err) => {
            console.log('look at me', typeof(err), err)
            setErrors(err.response.data.error.errors)
        })
    }

    return (
        <div>
            <div className='container-1' id="users-playlists-page">
                <div className="container-2" id="users-playlists-container">
                    <h2 className="users-playlists-heading">User's Playlists</h2>
                    <div className="card" id="users-playlists-table-container">
                        <div className="card-body">
                            <table>
                                <thead>
                                    <tr className='users-playlists-heading'>
                                        <th>Playlist Name</th>
                                        <th>Playlist Description</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Dynamically rendered playlists will be rendered here */}
                                    <tr className='users-playlists-playlist-row'>
                                        <td>Test Name</td>
                                        <td>
                                            <div className='users-playlists-playlist-description'>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi fugiat soluta similique doloribus quaerat mollitia totam dolorum et ipsa vitae quidem autem neque quam earum eaque, distinctio fugit consequuntur suscipit ratione commodi dicta, labore hic quae. Voluptatum, asperiores quo itaque aperiam dolores molestias, voluptatem dicta quaerat, sint consectetur a dignissimos!
                                            </div>
                                        </td>
                                        <td>Created At</td>
                                        <td className="buttons-holder">
                                            <button>View</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                    <tr className='users-playlists-playlist-row'>
                                        <td>Test Name</td>
                                        <td>Test Description</td>
                                        <td>Created At</td>
                                        <td>Updated At</td>
                                    </tr>
                                    <tr className='users-playlists-playlist-row'>
                                        <td>Test Name</td>
                                        <td>Test Description</td>
                                        <td>Created At</td>
                                        <td>Updated At</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersPlaylists