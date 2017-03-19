// connect to the database
var mongoose = require('../config/connection.js');

var Schema = mongoose.Schema;
// create a Schema
var roomSchema = new Schema({
    // _id: Number,
    // id: {type : Number, required : true, unique : true},
    room: {type : String, required : true, unique : true},
    created_by: {type : String, required : true, unique : false},
    created_at: {type : Date, required : true, default: Date.now}
    
});

// create a model using this Schema
var Room = mongoose.model('Room', roomSchema);

// export the model
module.exports = Room;
