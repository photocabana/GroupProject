const trackController = require('../controllers/trackController')
const upload = require('../middleware/uploads');

module.exports = (app) => {
    app.get('/api/track', trackController.findAllTracks);
    app.get('/api/track/:id', trackController.findOneTrack)
    app.post('/api/track/upload', upload.single('track'), trackController.uploadTrack);
    app.patch('/api/track/:id', upload.single('track'), trackController.updateTrack);
    app.delete('/api/track/:id', trackController.deleteTrack);
    app.get('/api/track/:id/stream', trackController.streamAudio)
}