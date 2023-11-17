//Ran  into an listeners warning? This is my current temp fix: 
require('events').EventEmitter.defaultMaxListeners = 15;

const multer = require('multer');
const path = require('path')
const mongodb = require('mongodb')
const mongoose = require('mongoose');
const { Readable } = require('stream');
const db = mongoose.connection

//A go at handling multiple file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === 'track'){
      cb(null, './music');
    } else if (file.fieldname === 'image'){
      cb(null, './images')
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
  }
})

const fileFilter2 = (req, file, cb) => {
  if(file.fieldname === 'track'){
      const allowedFileTypes = ['audio/mpeg'];
        if(allowedFileTypes.includes(file.mimetype)){
          cb(null, true);
        } else {
          cb(null, false);
        }
  } else if (file.fieldname === 'image'){
      const allowedFileTypes = ['image/jpeg', 'image/png'];
        if(allowedFileTypes.includes(file.mimetype)){
          cb(null, true);
        } else {
          cb(null, false);
        }
    }
}

// Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './music');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
//   }
// });

// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
//   }
// })


// //File Filters
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['audio/mpeg'];
//   if(allowedFileTypes.includes(file.mimetype)){
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }

// const imageFilter = (req, file, cb) => {
//   const allowedImageTypes = ['image/jpeg', 'image/png']
//   if(allowedImageTypes.includes(file.mimetype)){
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }
const upload = multer({storage, fileFilter2})
// const imageUpload = multer({imageStorage, imageFilter});
module.exports = upload;