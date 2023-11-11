const express = require('express');
const app = express();
// const multer = require('multer')
const port = 8000;
const cors = require('cors');
const path = require('path')
app.use();
app.use("/uploads", express.static('uploads'))

//!config connection
require('./config/mongoose.config');
app.use(express.json(), express.urlencoded({extended:true}));
//!routes connection

app.listen(port, ()=> console.log("The Server is listening on port " + port));
