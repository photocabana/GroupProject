const express = require('express');
const app = express();
// const multer = require('multer')
const port = 8000;
const cors = require('cors');
const path = require('path')
// app.use();
// app.use("server/music", express.static('tracks'))

//!config connection
const cookieParser = require('cookie-parser')
require('dotenv').config()

require('./config/mongoose.config');
app.use(express.json(), express.urlencoded({extended:true}));
app.use(cors({credentials:true, origin:'http://localhost:5173'}))
app.use(cookieParser())

//!routes connection
const userRoutes = require("./routes/user.routes")
userRoutes(app)

//APIRoutes Connection
const trackRoutes = require('./routes/trackRoutes')
trackRoutes(app)

const playlistRoutes = require('./routes/playlistRoutes')
playlistRoutes(app)

app.listen(port, ()=> console.log("The Server is listening on port " + port));


