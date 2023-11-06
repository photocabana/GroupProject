const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/swiftieBracelets", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => console.log('Your database is running'))
    .catch(err => console.log('The database is not running, better go catch it!', err));

//!Models here!
