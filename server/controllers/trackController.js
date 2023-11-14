const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectId;

module.exports = {
    downloadTrack: (req, res) => {
        try {
            var trackID = new ObjectID(req.params.trackID);
        } catch (err){
            return res.status(400).json({
                message: "Invalid trackID "
            });
        }
        res.set('content-type', 'audio/mp3');
        res.set('accept-ranges', 'bytes');

        let bucket = new mongodb.GridFSBucket(req.db, {
            bucketName: 'tracks'
        });

        let downloadStream = bucket.openDownloadStream(trackID);

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('error', () => {
            res.sendStatus(404);
        })

        downloadStream.on('end', () => {
            res.end();
        })
    }
}