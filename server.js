var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var PORT = process.env.PORT || 8080;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// having a problem trying to require the models in chat_server.js and apiController.js - mongoose error: "MongooseError: Cannot overwrite `ConnectedUser` model once compiled."
// soln pass them as arg to chat_server
var Chat = require("./models/Chat.js");
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

// populate database initially - dont erase existing data
require("./controllers/apiController.js")(app, models);
require("./chat_server.js")(io, models);

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});





// app.listen(8080);

// // routing
// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

// // usernames which are currently connected to the chat
// var usernames = {};

// // 
// // adapted from http://psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/
// // rooms available in chat - populate from database
// var rooms = ['room1','room2','room3'];

// io.sockets.on('connection', function (socket) {

// 	// when the client emits 'adduser', this listens and executes
// 	socket.on('adduser', function(username){
// 		// store the username in the socket session for this client
// 		socket.username = username;
// 		// store the room name in the socket session for this client
// 		socket.room = 'room1';
// 		// add the client's username to the global list
// 		usernames[username] = username;
// 		// send client to room 1
// 		socket.join('room1');
// 		// echo to client they've connected
// 		socket.emit('updatechat', 'SERVER', ' You are in ' + socket.room);
// 		// echo to room 1 that a person has connected to their room
// 		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
// 		socket.emit('updaterooms', rooms, 'room1');
// 	});

// 	// when the client emits 'sendchat', this listens and executes
// 	socket.on('sendchat', function (data) {
// 		// we tell the client to execute 'updatechat' with 2 parameters
// 		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
// 	});

// 	socket.on('switchRoom', function(newroom){
// 		// leave the current room (stored in session)
// 		socket.leave(socket.room);
// 		// join new room, received as function parameter
// 		socket.join(newroom);
// 		socket.emit('updatechat', 'SERVER', ' You are in ' + socket.room);
// 		// sent message to OLD room and dont include the user that left
// 		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
// 		// update socket session room title
// 		socket.room = newroom;
//     // sent message to NEW room and dont include the user that left
// 		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
// 		socket.emit('updaterooms', rooms, newroom);
// 	});

// 	// when the user disconnects.. perform this
// 	socket.on('disconnect', function(){
// 		// remove the username from global usernames list
// 		delete usernames[socket.username];
// 		// update list of users in chat, client-side
// 		io.sockets.emit('updateusers', usernames);
// 		// echo globally that this client has left
// 		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
// 		socket.leave(socket.room);
// 	});
// });
