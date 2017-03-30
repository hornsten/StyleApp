var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;

var UserInfoSchema = new Schema({
    userid:userid,
    stylemotto: {type : String},
    blurb: {type : String},
    imgsrc:{type:String}   
});

// create a model using this Schema
var UserInfo = mongoose.model('UserInfo', userinfoschema);

// export the model
module.exports = UserInfo;