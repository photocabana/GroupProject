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
    },
    allPlaylists: (req, res) => {
        Playlist.find()
            .then(allPlaylists => {
                console.log("All playlists grabbed");
                res.json(allPlaylists);
            })
            .catch(err => res.status(400).json(err));
    },
    findOnePlaylist: (req, res) => {
        Playlist.findById(req.params.id)
            .then(onePlaylist => {
                res.json(onePlaylist);
            })
            .catch(err => res.status(400).json(err));
    },
    updatePlaylist: (req, res) => {
        const { name, tracks } = req.body;

        // Find the playlist by ID
        Playlist.findById(req.params.id)
            .then(existingPlaylist => {
                if (!existingPlaylist) {
                    return res.status(404).json({ message: 'Playlist not found' });
                }

                // Find selected tracks
                Track.find({ _id: { $in: tracks } })
                    .then(selectedTracks => {
                        // Update the playlist properties
                        existingPlaylist.name = name;
                        existingPlaylist.tracks = selectedTracks.map(track => track._id);

                        // Save the updated playlist
                        existingPlaylist.save()
                            .then(updatedPlaylist => {
                                res.json(updatedPlaylist);
                            })
                            .catch(err => res.status(500).json(err));
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    },
    deletePlaylist: (req, res) => {
        // Find and delete the playlist by ID
        Playlist.findByIdAndDelete(req.params.id)
            .then(deletedPlaylist => {
                if (!deletedPlaylist) {
                    return res.status(404).json({ message: 'Playlist not found' });
                }
                res.json({ message: 'Playlist deleted successfully' });
            })
            .catch(err => res.status(500).json(err));
    }
}