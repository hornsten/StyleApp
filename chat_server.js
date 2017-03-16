
// var express = require('express');

// var CHAT_PORT = process.env.PORT || 8080;
// // var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http)
 
// adapted from http://psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/



function chat_server(io){

var Chat = require("./models/Chat.js");
var Room = require("./models/Room.js");
var ConnectedUser = require("./models/ConnectedUser.js");

// usernames which are currently connected to the chat
var usernames = {};
// rooms available in chat - populate from database
var rooms = ['room1','room2','room3'];

// save rooms to database -- only for testing purposes
for (var i = 0; i < rooms.length; i++){
	console.log("rooms",rooms[i] , "date",  Date.now())
	var roomList = new Room({room:rooms[i], created_by: "SERVER", created_at:  Date.now()});
	roomList.save(function (err) {
		// console.log("saved:" + rooms[i]); 
		if (err) return console.log(err);
		console.log("saved:" ); 
	})
}

io.sockets.on('connection', function (socket) {




	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		// this "room1" will need to be chaged to the selected room
		socket.room = "room1";
		// add the client's username to the global list
		usernames[username] = username;
		// send client to room 1
		socket.join('room1');
		// update database
		var newConnectedUser = new ConnectedUser({room:socket.room, username: socket.username, socketid: socket.id, created_at:  Date.now()});
		newConnectedUser.save(function (err) {
			// console.log("saved:" + rooms[i]); 
			if (err) return console.log(err);
			console.log("saved:" ); 
		})
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', ' You are in ' + socket.room);
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		var newChatMessage = new Chat({ room: socket.room, username: socket.username, message: data, created_at:  Date.now()});
		newChatMessage.save(function (err) {
			// console.log("saved:" + rooms[i]); 
			if (err) return console.log(err);
			console.log("saved:" ); 
		})
		//save chat
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', ' You are in ' + socket.room);
		// update the room in the database
		// Model.findOneAndUpdate(query, { $set: { name: 'jason borne' }}, options, callback)
		ConnectedUser.findOneAndUpdate({username: socket.username}, { $set: { room: newroom }}, function (err) {
			// console.log("saved:" + rooms[i]); 
			if (err) return console.log(err);
			console.log("saved:" ); 
			});
		// sent message to OLD room and dont include the user that left
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
    // sent message to NEW room and dont include the user that left
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// remove from database of list current users/rooms on disconect
		ConnectedUser.findOneAndRemove({username: socket.username}, function (err) {
		// console.log("saved:" + rooms[i]); 
			if (err) return console.log(err);
			console.log("saved:" ); 
		});
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});


}

module.exports = chat_server;