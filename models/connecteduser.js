// connect to the database
var mongoose = require('../config/connection.js');

var Schema = mongoose.Schema;

mongoose.models = {};
mongoose.modelSchemas = {};

// create a Schema
var connectedUserSchema = new Schema({

    username: {type : String, required : false, unique : false},
    room: {type : String, required : true, unique : false},
    socketid: {type : String, required : true, unique : false},
    created_at: {type : Date, required : true, default: Date.now}
});

// create a model using this Schema
var ConnectedUser = mongoose.model('ConnectedUser', connectedUserSchema);

// export the model
module.exports = ConnectedUser;