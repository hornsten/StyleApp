var mongoose = require('mongoose');
// connect to the database

var MONGODB_URI = 'mongodb://heroku_wk1d2fsz:t9gn1gkjf21obtkimanj9lgmb4@ds143000.mlab.com:43000/heroku_wk1d2fsz';
var connectionString = process.env.MONGODB_URI | 'mongodb://localhost:27017/styleapp';
// var connection = mongoose.connect(process.env.MONGODB_URI);
// var connection = mongoose.connect('mongodb://localhost:27017/styleapp');
// export the connection

var connection = mongoose.connect(connectionString);

module.exports = connection;
