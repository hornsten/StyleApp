// Include the Mongoose Dependencies

var mongoose = require("mongoose");

var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;
// https://gist.github.com/aheckmann/2408370
// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var profileSchema = new Schema({
  username: {type : String, required : true},   //From FB hopefully
  email: {type : String, required : false},     //From FB hopefully
  userprofile: {
      isComplete: Boolean,
      photo_img:  { data: Buffer, contentType: String }
    // whatever fields we need for the bio page / profile page
    //
  },
  chat: {
      isConnected: {type : Boolean,  default: false},
      room: {type : String, required : true, unique : false},
      socketid: {type : String, required : false, unique : false},
      created_at: {type : Date, required : false, default: Date.now}
  },
  magazines: {
      title: {type : String, required : false, unique : false},
    //   content_1: 
    //   content_2:
    //   etc
    //     //whatever info
    //   img1 etc
     created_at: {type : Date, required : false, default: Date.now}
  },
  created_at: {type : Date, required : false, default: Date.now}
});

// Create the Model
var Profile = mongoose.model("Profile", profileSchema);

// Export it for use elsewhere
module.exports = Profile;

