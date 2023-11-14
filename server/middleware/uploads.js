//Ran  into an listeners warning? This is my current temp fix: 
require('events').EventEmitter.defaultMaxListeners = 15;

const multer = require('multer');
const path = require('path')
const mongodb = require('mongodb')
const mongoose = require('mongoose');
const { Readable } = require('stream');
const db = mongoose.connection
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './music');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['audio/mpeg'];
  if(allowedFileTypes.includes(file.mimetype)){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({storage, fileFilter})

module.exports = upload;
// const uploadMiddleware = multer({ storage, fileFilter }).single('track');

// const bucket = new mongodb.GridFSBucket(db, {
//   bucketName: 'tracks'
// });

// module.exports = {
//   uploadMiddleware,
//   bucket
// };