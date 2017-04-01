// connect to the database
var mongoose = require('../config/connection.js');

var Schema = mongoose.Schema;
// create a Schema
var chatSchema = new Schema({
    // _id: Number,
    // id: {type : Number, required : true, unique : true},
    seq: { type: Number, default: 0 },
    room: {type : String, required : true, unique : false},
    username: {type : String, required : true, unique : false},
    message: {type : String, required : true, unique : false},
    type: {type : String, required : true, default: "text"},
    created_at: {type : Date, required : true, default: Date.now}
    // headline: {type : String, required : true, unique : true},
    // pubdate: {type : String, required : true, unique : false}, 
    // weburl: {type : String, required : true, unique : true},
    // snippet: {type : String, required : false, unique : true},
    // created_at: {type : Date, required : true, default: Date.now},
    // updated_at: {type : Date, required : true, default: Date.now},
});

// create a model using this Schema
var Chat = mongoose.model('Chat', chatSchema);

// export the model
module.exports = Chat;
