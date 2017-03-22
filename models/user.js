// Include the Mongoose Dependencies

var mongoose = require("mongoose");

var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var UserSchema = new Schema({
  // username: {type : String, required : false},
  facebook: {
    id: String,
    token: String,
    // email: String,
    // name: String,
    // photo: String,
    link:String,
  },
  // userprofile: {
  //   // whatever fields we need for the bio page / profile page
  //   created_at: {type : Date, required : false, default: Date.now}
  // },
  // email: {type : String, required : false},
  // chat: {
  //     isConnected: {type : Boolean,  default: false},
  //     room: {type : String, required : true, unique : false},
  //     socketid: {type : String, required : false, unique : false},
  //     created_at: {type : Date, required : false, default: Date.now}
  // },
  // created_at: {type : Date, required : false, default: Date.now}
});

// Create the Model
var User = mongoose.model("User", UserSchema);

// Export it for use elsewhere
module.exports = User;

