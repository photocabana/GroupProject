const mongoose = require('mongoose')

const TrackSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [1, "Title must be at least 1 character long!"]
    },
    track: {
        type: String
    },
    album: {
        type: String,
        minlength: [1, "Album must be at least 1 character long!"]
    },
    artist: {
        type: String,
        minlength: [1, "Artist must be at least 1 character long!"]
    },
    image: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Track', TrackSchema);