const jwt = require('jsonwebtoken')
const User = require("../models/user.model")
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, SECRET, (err,payload) => {
        console.log("HEEYYYY, YOUU GUYYYYSSS")
        if(err){
            res.status(401).json({verified: false})
            console.log("Goonies NEVER say Die!!!!")
        }
        else{
            next()
        }
    })
}

module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.userToken, {complete: true})
    console.log("As you Wish")
    console.log(req.cookies.userToken, "Disappointed")
    console.log(decodedJWT, "Hello. My name is Inigo Montoya. You killed my father. Prepare to die.")
    if (decodedJWT === null) {
        return res.json({
            user:null
        })
    }
    User.findById(decodedJWT.payload._id)
    .then(user => res.json({user:user}))
    .catch(err => res.status(400).json(err))
}
