const multer = require('multer');
const path = require('path')
const mongodb = require('mongodb')


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/music');
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

// Create the multer instance
const upload = multer({ storage, fileFilter});

const bucket = new mongodb.GridFSBucket(db, {
    bucketName: 'tracks'
});

upload.single('track')(req, res, (err => {
    if(err){
        return res.status(400).json({message: "Upload request validation wrong"})
    } else if(!req.body.name){
        return res.status(400).json({message: "No track name!"})
    }
    let trackName = req.body.name;

    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null)

    let uploadstream = bucket.openUploadStream(trackName);
    let id = uploadStream.id;

    uploadStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
    });
    
    uploadStream.on('finish', () => {
        return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
    });
}))

module.exports = upload;