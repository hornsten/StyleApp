// Include the Mongoose Dependencies

var mongoose = require("mongoose");

var mongoose = require('../config/connection.js');
var Schema = mongoose.Schema;
// https://gist.github.com/aheckmann/2408370
// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var interactiveClothesBinSchema = new Schema({
    conversationid: {type : String, required : true, unique : false},
    // accepts: {type : String, required : true, unique : false},
    // lastDroppedItem: {type : String, required : true, unique : false},
    item: {type : Object, required : true, unique : false},
    index: {type : String, required : true, unique : false},
    created_at: {type : Date, required : true, default: Date.now}
 
});

// Create the Model
var interactiveClothesBin = mongoose.model("InteractiveClothesBin", interactiveClothesBinSchema);

// Export it for use elsewhere
module.exports = interactiveClothesBin;

