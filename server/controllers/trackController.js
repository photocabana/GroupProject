const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectId;
const multer = require('multer')
const { Readable} = require('stream')
const fs = require('fs')
const Track = require('../models/trackModel')


module.exports = {
    uploadTrack: (req, res) => {
        if(!req.file){
            return res.status(400).json({msg: 'No track uploaded'})
        }
        Track.create({
            title: req.body.title,
            track: req.file.path,
            artist: req.body.artist
        })
            .then(newTrack => {
                console.log("Track was sucessfully uploaded")
                res.json(newTrack)
            })
            .catch(err =>{
                res.status(400).json(err)
            })
    },
    findAllTracks: (req, res) => {
        Track.find()
        .then(allTracks => {
            // console.log("all tracks grabbed")
            res.json(allTracks)
        })
        .catch(err => res.status(400).json(err))
    },
    findOneTrack: (req, res) => {
        Track.findById(req.params.id)
        .then(oneTrack => {
            // console.log("Track grabbed")
            res.json(oneTrack)
        })
        .catch(err => res.status(400).json(err))
    },
    updateTrack: (req, res) => {
        const newTrack = req.file;
        Track.findById(req.params.id)
            .then(track => {
                if(!track){
                    return res.status(404).json({error: 'Track not found!'})
                }
                if(newTrack){
                    //check if an old track exists and delete it
                    if(track.track){
                        fs.unlinkSync(track.track)
                    }
                    track.track = newTrack.path;
                }

                track.title = req.body.title;
                track.artist = req.body.artist

                track.save()
                    .then(updatedTrack => {
                        console.log('Track was updated!')
                        res.json(updatedTrack)
                    })
                    .catch(err => res.status(400).json(err));
            })
        .catch(err => res.status(400).json(err));

    },
    deleteTrack: (req, res) => {
        Track.findById(req.params.id)
            .then(track => {
                if(!track){
                    return res.status(404).json({error: 'Track not found!'})
                }
                if(track.track){
                    fs.unlinkSync(track.track);
                }
            Track.findByIdAndDelete(req.params.id)
                .then(() => {
                    res.json({deleted: true})
                })
                .catch(err => res.status(400).json(err))
            })
        .catch(err => res.status(400).json(err));
    }
}