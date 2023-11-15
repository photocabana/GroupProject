const Playlist = require('../models/playlistModel')
const Track = require('../models/trackModel')

module.exports = {
    createPlaylist: async (req, res) => {
        try {
            const {name, tracks} = req.body;

            //create new playlist
            const newPlaylist = await Playlist.create({
                name, 
                tracks: [] //empty array to hold tracks
            });
            //Needs front end to push a collection of tracks: 
            const selectedTracks = await Track.find({ _id: {$in: tracks}}) //mongodb query _id is the matching field and $in is the operator that documents _id

            newPlaylist.tracks = selectedTracks.map(track => track._id);

            const updatedPlaylist= await newPlaylist.save();

            res.status(201).json(updatedPlaylist)
        } catch (error){
            console.error('Error creating playlist:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}