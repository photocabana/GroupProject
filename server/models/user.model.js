const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: [true, "First name is required"]
    },
    lastName: {
    type: String,
    required: [true, "Last name is required"]
    },
    username: {
    type: String,
    unique: [true, "That user name is already in use"],
    required: [true, "User Name is required"]
    },
    email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "Invalid Email"]
    },
    password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
    },
    // don't need a role - song => comment needs an attribute to link to the user id.
    // role: {
    // type: String,
    // default: "Basic",
    // required: true
    // },
}, {timestamps: true})


// Middleware

// virtual temporary area that doesn’t get stored in our database (confirmed password) 
UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value)

// a pre function that validates our confirmed password with our password before it is entered into the database
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password')
    }
    next()
})

// bcrypt – hashes our password 10x (logs the password hashed) 
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

module.exports = mongoose.model("User", UserSchema)
