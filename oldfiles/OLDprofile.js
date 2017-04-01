// Include the Mongoose Dependencies

var mongoose = require("mongoose");

var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
  userprofile: {
    isComplete: Boolean,
    photo_img:  { data: Buffer, contentType: String },
 // whatever fields we need for the bio page / profile page
    style_motto: {type: String},
    blurb: {type: String},
    joined_date: {type: Date, default:Date.now}
    //
  },
  magazines: {
      // title: {type : String, required : false, unique : false},
      userid: {type : String, required : true, unique : false},  // facebook id
      imageid: {type : String, required : true, unique : false}, // filename for now
      src: {type : String, required : true, unique : false},  // link to cloudinary location
      filename: {type : String, required : true, unique : false},
      created_at: {type : Date, required : true, default: Date.now}
 

  },
  created_at: {type : Date, required : false, default: Date.now}
});

// Create the Model
var Profile = mongoose.model("Profile", profileSchema);

// Export it for use elsewhere
module.exports = Profile;

