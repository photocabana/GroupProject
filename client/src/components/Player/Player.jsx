import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';


const Player = (props) => {
    const {id} = useParams();
    const [track, setTrack] = useState({})

    //Player
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/track/' + id)
        .then(res => {
            setTrack(res.data)
            console.log(res.data)
            console.log(id)
        })
    }, [id]);
    return (
        <div>
            <h1>Artist: {track.artist} </h1>
            <h1>Title: {track.title}</h1>
            <audio controls>
                <source src={`http://127.0.0.1:8000/api/track/${id}/stream`} type='audio/mp3'/>
            </audio>
            <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    )
}

export default Player;