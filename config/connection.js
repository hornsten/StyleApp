var mongoose = require('mongoose');
// connect to the database
// var connectionString = process.env.MONGODB_URI | 'mongodb://localhost:27017/styleapp';
var db_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/styleapp';
var connection = mongoose.connect(db_url);
// export the connection
module.exports = connection;