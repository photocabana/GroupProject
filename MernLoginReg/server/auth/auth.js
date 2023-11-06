// const User = require('../models/user.model')

// exports.update = async (req, res, next) => {
//     const { role, id } = req.body

//     if (role && id) {
//         try {
//             const user = await User.findById(id)

//             if (!user) {
//                 return res.status(400).json({ message: "User not found" })
//             }

//             if (role === "admin") {
//                 if (user.role !== "admin") {
//                     user.role = role
//                     await user.save()
//                     res.status(201).json({ message: "Update successful", user })
//                 } else {
//                     res.status(400).json({ message: "User is already an Admin" })
//                 }
//             } else {
//                 res.status(400).json({ message: "Role is not admin" })
//             }
//         } catch (error) {
//             res.status(400).json({ message: "An error occurred", error: error.message })
//         }
//     } else {
//         res.status(400).json({ message: "Role or Id not present" })
//     }

//     exports.deleteUser = async (req, res, next) => {
//         const { id } = req.body
//             await User.findById(id)
//             .then(user => user.remove())
//             .then(user =>
//             res.status(201).json({ message: "User successfully deleted", user })
//             )
//             .catch(error =>
//                 res
//                 .status(400)
//                 .json({ message: "An error occurred", error: error.message })
//         )
//     }

//     const jwt = require("jsonwebtoken")
//         const jwtSecret = "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd"
//         exports.adminAuth = (req, res, next) => {
//             const token = req.cookies.jwt
//             if (token) {
//                 jwt.verify(token, jwtSecret, (err, decodedToken) => {
//             if (err) {
//                 return res.status(401).json({ message: "Not authorized" })
//             } 
//             else {
//                 if (decodedToken.role !== "admin") {
//                 return res.status(401).json({ message: "Not authorized" })
//                 } 
//                 else {
//                 next()
//                 }
//             }
//             })
//             } else {
//                 return res
//                 .status(401)
//                 .json({ message: "Not authorized, token not available" })
//             }
//     }

//     exports.userAuth = (req, res, next) => {
//         const token = req.cookies.jwt
//         if (token) {
//             jwt.verify(token, jwtSecret, (err, decodedToken) => {
//             if (err) {
//                 return res.status(401).json({ message: "Not authorized" })
//             } else {
//                 if (decodedToken.role !== "Basic") {
//                 return res.status(401).json({ message: "Not authorized" })
//                 } else {
//                 next()
//                 }
//             }
//             })
//         } else {
//             return res
//             .status(401)
//             .json({ message: "Not authorized, token not available" })
//         }
//     }
// }