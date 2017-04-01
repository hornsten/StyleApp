// Include the Mongoose Dependencies

var mongoose = require("mongoose");

var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;

var magazineSchema = new Schema({

    userid: {type : String, required : true, unique : false},  // facebook id
    imageid: {type : String, required : true, unique : false}, // filename for now
    src: {type : String, required : true, unique : false},  // link to cloudinary location
    filename: {type : String, required : true, unique : false},
    description: {type : String, required : true, unique : false},
    created_at: {type : Date, required : true, default: Date.now}  
});

// Create the Model
var Magazine = mongoose.model("Magazine",  magazineSchema);

// Export it for use elsewhere
module.exports = Magazine;

