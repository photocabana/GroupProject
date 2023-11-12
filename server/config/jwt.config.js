const jwt = require('jsonwebtoken')
const User = require("../models/user.model")
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, SECRET, (err,payload) => {
        if(err){
            res.status(401).json({verified: false})
        }
        else{
            next()
        }
    })
}

module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.userToken, {complete: true})
    User.findById(decodedJWT.payload._id)
    .then(user => res.json({user:user}))
    .catch(err => res.status(400).json(err))
}