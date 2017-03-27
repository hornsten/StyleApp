// Include the Mongoose Dependencies

var mongoose = require("mongoose");

var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;
// https://gist.github.com/aheckmann/2408370
// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var closetSchema = new Schema({

    userid: {type : String, required : true, unique : false},
    imageid: {type : String, required : true, unique : false},
    type: {type : String, required : true, unique : false},
    src: {type : String, required : true, unique : false},
    filename: {type : String, required : true, unique : false},
    created_at: {type : Date, required : true, default: Date.now}
 
});

// Create the Model
var Closet = mongoose.model("Closet", closetSchema);

// Export it for use elsewhere
module.exports = Closet;

