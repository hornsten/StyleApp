// connect to the database
var mongoose = require('../config/connection.js');

var Schema = mongoose.Schema;

mongoose.models = {};
mongoose.modelSchemas = {};

// create a Schema
var privateChatSchema = new Schema({
    username: {type : String, required : true, unique : false},
    chatwith: {type : String, required : true, unique : false},
    conversationid: {type : String, required : true, unique : false},
    created_at: {type : Date, required : true, default: Date.now}
});

// create a model using this Schema
var PrivateChat = mongoose.model('PrivateChat', privateChatSchema);

// export the model
module.exports = PrivateChat;