const playlistController = require('../controllers/playlistController');

module.exports = (app) => {
    app.post('/api/playlist', playlistController.createPlaylist);
    app.get('/api/playlist', playlistController.allPlaylists);
    app.get('/api/playlist/:id', playlistController.findOnePlaylist);
    app.patch('/api/playlist/:id', playlistController.updatePlaylist);
    app.delete('/api/playlist/:id',playlistController.deletePlaylist);
};