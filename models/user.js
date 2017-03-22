
var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var UserSchema = new Schema({
  // username: {type : String, required : false},
  facebook: {
      id: String,
    token: String,
    email: String,
    name: String,
    // photo: String,
    link:String
  },
  // userprofile: {
      // isComplete: Boolean
  //   // whatever fields we need for the bio page / profile page
  //   //
  // },
  // email: {type : String, required : false},
  // chat: {
  //     isConnected: {type : Boolean,  default: false},
  //     room: {type : String, required : true, unique : false},
  //     socketid: {type : String, required : false, unique : false},
  //     created_at: {type : Date, required : false, default: Date.now}
  // },
  // magazines: {
      // title:
      // content_1:
      // content_2:
      // etc
      //   //whatever info
      //img1 etc
      // created_at: {type : Date, required : false, default: Date.now}


  // }

  // }
  // created_at: {type : Date, required : false, default: Date.now}
});

// Create the Model
var User = mongoose.model("User", UserSchema);

// Export it for use elsewhere
module.exports = User;

