import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';


const Player = (props) => {
    const [tracks, setTracks] = useState([])
    const {id} = useParams();
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/track')
        .then(res => {
            // console.log('Got the tracks', res)
            setTracks(res.data);
        })
        .catch(err => {
            console.log('Error Grabbing Tracks', err)
        })
    }, [])
    //Player

    const audioElement = useRef(new Audio()); //empty 
    useEffect(() => {
        if(audioElement.current) { //Pull the audio info as current 
            if (isPlaying && currentTrackIndex !== null && tracks.length > currentTrackIndex && currentTrackIndex >= 0) {
                const trackId = tracks[currentTrackIndex]?._id; // Access id property of the track
                if (trackId) {
                    audioElement.current.src = `http://127.0.0.1:8000/api/track/${trackId}/stream`;
                    audioElement.current.play().catch((err) => {
                        console.log('Error playing audio', err);
                    });
                }
            } else {
                audioElement.current.pause();
            }
        } else {  //- true
            console.log('after useeffect:', audioElement)
            audioElement.current.pause()
        }
    }, [isPlaying, currentTrackIndex, tracks]);
    const PlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const selectTrack = (index) => {
        setCurrentTrackIndex(index)
        const selectedTrack = tracks[index]
        setCurrentSong(selectedTrack)
        setIsPlaying(true);
    }

    const handlePreviousTrack = () => {
        if (currentTrackIndex !== null) {
            let prevIndex = currentTrackIndex - 1;
                if (prevIndex < 0) {
                prevIndex = tracks.length - 1; // Go to the last track if at the beginning
                }
            setCurrentTrackIndex(prevIndex);
            const prevTrack = tracks[prevIndex];
            setCurrentSong(prevTrack);
            setIsPlaying(true);
        }
    };

    const handleNextTrack = () => {
        if (currentTrackIndex !== null) {
            let nextIndex = currentTrackIndex + 1;
                if (nextIndex >= tracks.length) {
                    nextIndex = 0; // Go to the first track if at the end
                }
            setCurrentTrackIndex(nextIndex);
            const nextTrack = tracks[nextIndex];
            setCurrentSong(nextTrack);
            setIsPlaying(true);
        }
    };

    const handleTimeUpdate = (event) => {
        const time = event.target.value;
        if(audioElement.current){
            audioElement.current.currentTime = time;
        }
    }

    const handleEnd = () => {
        if(currentTrackIndex !== null){
            let nextIndex = currentTrackIndex + 1;
            if(nextIndex >= tracks.length){
                nextIndex = 0;
            }
            setCurrentTrackIndex(nextIndex);
            const nextTrack = tracks[nextIndex];
            setCurrentSong(nextTrack);
            setIsPlaying(true)
        }
    }
    return (
        <div>
            <h1>Music Player! </h1>
            <div>
                <ul>
                    {tracks.map((track, index) => (
                        <li key={track.id}>
                            <button onClick={() => selectTrack(index)}>
                                {track.title} - {track.artist}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {currentSong && (
                <div>
                    <h2>Now Playing: {currentSong.title} - {currentSong.artist}</h2>
                    <audio 
                    controls 
                        ref={audioElement}
                        onEnded={handleEnd}
                        onTimeUpdate={handleTimeUpdate}
                    >
                        <source src={`http://127.0.0.1:8000/api/track/${currentSong.id}/stream`} type='audio/mp3'/>
                    </audio>
                    {/* <input 
                        type='range'
                        min='0'
                        max={audioElement ? audioElement.current.duration : 0}
                        value={audioElement ? audioElement.current.currentTime : 0} //sets current time to max value
                        onChange={handleTimeUpdate}
                    /> */}
                    <div className="playerButtons">
                        <button onClick={PlayPause}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button onClick={handleNextTrack}>Next</button>
                        <button onClick={handlePreviousTrack}>Previous</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Player;