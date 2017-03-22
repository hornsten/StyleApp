// Include the Mongoose Dependencies

var mongoose = require("mongoose");

var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var UserSchema = new Schema({
  facebook: {
    id: String,
    token: String,
    // email: String,
    name: String,
    // photo: String,
    link:String
  }  
});

// Create the Model
var User = mongoose.model("User", UserSchema);

// Export it for use elsewhere
module.exports = User;

