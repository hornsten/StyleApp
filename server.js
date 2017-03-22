
// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var passport = require("passport");
var session = require("express-session");
var express = require('express');
var path =require('path');
var cookieSecret = 'anything';


// var methodOverride = require('method-override');
var PORT = process.env.PORT || 8080;
var app = express();

app.use(cookieParser());
// Run Morgan for Logging
app.use(logger("dev"));

var http = require('http').Server(app);
var io = require('socket.io')(http, {'pingInterval': 20000, 'pingTimeout': 60000});

// having a problem trying to require the models in chat_server.js and apiController.js - mongoose error: "MongooseError: Cannot overwrite `ConnectedUser` model once compiled."
// soln pass them as arg to chat_server
var Chat = require("./models/Chat.js");
var User = require("./models/user.js");
var Room = require("./models/Room.js");
var ConnectedUser = require("./models/ConnectedUser.js");
var PrivateChat = require("./models/PrivateChat.js");
var models = { "Chat" : Chat, "ConnectedUser" : ConnectedUser, "Room": Room, "PrivateChat": PrivateChat};

app.use( express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded 
// found urlencoded extended must be true for nested arrays and for post method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// parse an HTML body into a string 
app.use(bodyParser.text({ type: 'text/html' }));

// -------------------------------------------------
app.use(session({secret: cookieSecret,
                saveUninitialized: true,
                resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// //Facebook Login oauth routes
require('./auth/passport')(passport);
require('./routes/routes.js')(app, passport, models);
// require("./controllers/apiController.js")(app, models);
require("./chat_server.js")(io, models);


http.listen(8080, function(){
console.log('listening on *:8080');
});


