// connect to the database
var mongoose = require('../config/connection.js');

var Schema = mongoose.Schema;
// create a Schema
var roomSchema = new Schema({
    room: {type : String, required : true, unique : true},
    description: {type : String, required : false, unique : false},
    image: {type : String, required : false, unique : false},
    created_by: {type : String, required : true, unique : false},
    created_at: {type : Date, required : true, default: Date.now}
    
});

// create a model using this Schema
var Room = mongoose.model('Room', roomSchema);

// export the model
module.exports = Room;
