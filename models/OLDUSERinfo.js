var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;

var userInfoSchema = new Schema({
    userid:  {type : String},
    stylemotto: {type : String},
    blurb: {type : String},
    imgsrc:{type:String}   
});

// create a model using this Schema
var UserInfo = mongoose.model('UserInfo', userInfoSchema);

// export the model
module.exports = UserInfo;