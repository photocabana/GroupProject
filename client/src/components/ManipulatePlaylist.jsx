import axios from 'axios'
import React, { useState, useEffect } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'

const ManipulatePlaylist = (props) => {
    const { loggedUser, setLoggedUser, allPlaylists,setAllPlaylists, isEditMode,  } = props
    const [activePlaylist, setActivePlaylist] = useState({
        name: "",
        description: ""
    }) 

    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!loggedUser) {
            navigate("/login")
            return
        }
        axios.post(`http://localhost:8000/api/createPlaylist`, playlist)
        .then(response => {
            // allDesigns is the better getter - after the arrow is implied
            // setAllJewelry(allDesigns => [...allDesigns, response.data.newlyCreatedJewelry])
            console.log(response.data)
            navigate("/homepage")
        })
        .catch(err => {
            console.log(err.response.data.error.errors)
            setErrors(err.response.data.error.errors)
        })
    }

    // Playlists Pull
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/playlist/')
        .then((res) => {
            setAllPlaylists(res.data)
            console.log(res, "Playlists Pull App - then")
        })
        .catch((err) => {
            console.log(err, "Playlists Pull App")
        })
    setAllPlaylists()
    }, [])

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



// import axios from 'axios'
// import React, { useState, useEffect } from 'react'
// import '../App.css'
// import { Link, useNavigate } from 'react-router-dom'

// const ManipulatePlaylist = (props) => {
//     const { loggedUser, setLoggedUser, allPlaylists,setAllPlaylists, isEditMode,  } = props
//     const [activePlaylist, setActivePlaylist] = useState({
//         name: "",
//         description: ""
//     }) 

//     const [errors, setErrors] = useState({})
//     const navigate = useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if (!loggedUser) {
//             navigate("/login")
//             return
//         }
//         axios.post(`http://localhost:8000/api/createPlaylist`, playlist)
//         .then(response => {
//             // allDesigns is the better getter - after the arrow is implied
//             // setAllJewelry(allDesigns => [...allDesigns, response.data.newlyCreatedJewelry])
//             console.log(response.data)
//             navigate("/homepage")
//         })
//         .catch(err => {
//             console.log(err.response.data.error.errors)
//             setErrors(err.response.data.error.errors)
//         })
//     }


//     // Playlists Pull
//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/playlist/')
//         .then((res) => {
//             setAllPlaylists(res.data)
//             console.log(res, "Playlists Pull App - then")
//         })
//         .catch((err) => {
//             console.log(err, "Playlists Pull App")
//         })
//     setAllPlaylists()
//     }, [])


// return (
//     <div>
//         <div className="container-1" id="manipulate-playlist-page">
//             <div className="card containter-2" id='manipulate-playlist-container'>
//                 <div id="manipulate-playlist-heading">
//                     {isEditMode ? <h2>Edit Playlist</h2> : <h2>Create Playlist</h2>}
//                 </div>
//                 <div className="card-body">
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="playlist-name">Playlist Name</label>
//                             <input type="text" className="form-control" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="playlist-description">Playlist Description</label>
//                             <textarea className='form-control' rows="10" />
//                         </div>
//                         <div className="buttons-holder">
//                             {isEditMode ? 
//                             <button type="submit">Update</button> 
//                             : 
//                             <button type="submit">Create</button>
//                             }
//                             <Link to="/music-player"><button>Cancel</button></Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>
//     )
// }

// export default ManipulatePlaylist