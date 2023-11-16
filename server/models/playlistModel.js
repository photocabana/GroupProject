const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// blahhjlkfk
const PlaylistSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    tracks: [{
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }]
}, {timestamps: true})

module.exports = mongoose.model('Playlist', PlaylistSchema);