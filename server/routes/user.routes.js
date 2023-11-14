const UserController = require('../controllers/user.controller')
const { authenticate, getLoggedInUser } = require('../config/jwt.config')

module.exports = (app) => {
    app.post('/api/registerUser', UserController.registerUser)
    app.post('/api/loginUser', UserController.loginUser)
    app.post('/api/logoutUser', UserController.logoutUser)
    app.get("/api/getLoggedUser", getLoggedInUser)
}
