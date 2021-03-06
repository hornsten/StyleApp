
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
var cors = require('express-cors');
var request = require('request');

var PORT = process.env.PORT || 8080;
var app = express();


// // to handle cors issues with html2canvas and cloudinary;
// put this proxy before body parser middleware
app.use('/proxy', function(req, res) {  
        // seems to be an extra / on the path in HEROKU
        // take raw url and remove first / before passing it to the req.
        var rawurl = req.url;
        // + 1 for local +2 for heroku
        // rawurl.substr(rawurl.indexOf('/') + 1);
        var newurl = rawurl.replace(/^\/+/g, '');
        console.log("raw", newurl);
        req.pipe(request(newurl)).pipe(res);
});

app.use(cookieParser());
// Run Morgan for Logging
app.use(logger("dev"));
// to handle CORS issues when doing a GET locally after Auth with Facebook 
// turns out it is a problem on the FB side! Need to let them know to allow authentication from localhost:8080.
app.use(cors())
var allowedOrigins = "http://localhost:* http://127.0.0.1:* https://www.facebook.com/*";
var http = require('http').Server(app);

/// time out was causing heroku problems!!
// var io = require('socket.io')(http, {'pingInterval': 20000, 'pingTimeout': 60000, 'origins': allowedOrigins});


var io = require('socket.io')(http);
// having a problem trying to require the models in chat_server.js and apiController.js - mongoose error: "MongooseError: Cannot overwrite `ConnectedUser` model once compiled."
// soln pass them as arg to chat_server
var Chat = require("./models/chat.js");
var User = require("./models/user.js");
var Room = require("./models/room.js");
var ConnectedUser = require("./models/connecteduser.js");
var PrivateChat = require("./models/privatechat.js");
var Magazine = require("./models/magazine.js");
var Closet = require("./models/closet.js");
// var UserInfo = require("./models/userinfo.js");
var InteractiveClothesBin = require("./models/interactiveclothesbin.js");
var models = {  "Chat" : Chat, "ConnectedUser" : ConnectedUser, "Room": Room, "PrivateChat": PrivateChat,"User": User,  "Magazine": Magazine, "Closet": Closet, "InteractiveClothesBin": InteractiveClothesBin};

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

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

// //Facebook Login oauth routes
require('./auth/passport')(passport);
require('./routes/routes.js')(app, passport, models);
// require("./controllers/apiController.js")(app, models);
require("./chat_server.js")(app, io, models);


http.listen(PORT , function(){
console.log('listening on *:8080');
});


