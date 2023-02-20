const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.log.bind(console,"Error connecting to MongoBD"));

db.once('open', function(){
    console.log("Connected to MongoDB");
});

module.exports=db;