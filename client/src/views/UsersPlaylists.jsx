import React from 'react';
import Nav from '../components/Nav';
import '../App.css';

const UsersPlaylists = () => {
  return (
    <div>
        <Nav />
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
                                    <td className="users-playlists-buttons-holder">
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