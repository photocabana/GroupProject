const playlistController = require('../controllers/playlistController');

module.exports = (app) => {
    app.post('/api/playlist', playlistController.createPlaylist);
    app.get('/api/playlists', playlistController.allPlaylists);
    app.get('/api/playlist/:id', playlistController.findOnePlaylist);
    app.patch('/api/playlist/:id', playlistController.updatePlaylist);
    app.delte('/api/playlist/:id',playlistController.deletePlaylist);
};