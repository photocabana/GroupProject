const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
// Secret Key keeps this from being hacked


module.exports = {

// Where User Registers
    registerUser: async (req, res) => {
        try {
// ! Check if the user already exists - prevents duplicate entries 
            const potentialUser = await User.findOne({email:req.body.email})
            if (potentialUser) {
                res.status(400).json({message:'This email already exists please log in'})
            }
            else{
// create new user
                const newUser = await User.create(req.body)
// generating a usertoken and storing the id and email of the newly created user
                const userToken = jwt.sign({_id: newUser._id, email:newUser.email, username:newUser.username}, SECRET, {expiresIn: '2h'})
                console.log(userToken)
// Sending user data back to the client
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAg: 2 * 60 * 60 * 1000}).json(newUser)
            }
        }
        catch(err) {
            console.log(err)
            res.status(400).json({ error:err })
        }
    },

// Where User Logs in
    loginUser: async (req, res) => {
        try {
// search findOne email - if not they need to register | await is meant for grabbing 
            const user = await User.findOne({email:req.body.email})
            if(user) {
// bcrypt.compare makes sure passwords match
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordsMatch) {
                    const userToken = jwt.sign({_id: user._id, email:user.email, username:user.username}, SECRET, {expiresIn:'2h'})
// Safety Net – if something goes wrong with the cookie at least we have the token
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAg: 2 * 60 * 60 * 1000}).json(user)
                }
// If password or email is wrong we do not specify what was in error as a protection against hackers
                else {
                    res.status(400).json({message:'Invalid Email/Password'})
                }
            }
            else {
                res.status(400).json({message:'Invalid Email/Password'})
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },

// Logs Out User & Clears out the cookie we created - like session.clear – to protect against hackers
    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message:'Logged Out Successfully'})
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.body
            await User.findById(id)
            .then(user => user.remove())
            .then(user =>
            res.status(201).json({ message: "User successfully deleted", user })
            )
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },

    userAuth : async (req, res) => {
        try {
            const token = req.cookies.jwt
            const user = jwt.verify(req.cookies.userToken, SECRET)
            const currentUser = await User.findOne({ _id: user._id })
            res.status(201).json(currentUser)
        }
        catch(err){
            res.status(400).json({error: err})
        }
    }
}