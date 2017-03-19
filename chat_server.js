
// var express = require('express');

// var CHAT_PORT = process.env.PORT || 8080;
// // var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http)
 
// adapted from http://psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/



function chat_server(io, models){


// rooms available in chat - populate from database 
var rooms = [];
var connectedusers = {};
models.Room.find({}, function(err, results){  
	if (err) return console.log(err);
	for (var i = 0; i< results.length; i++){
		rooms.push(results[i].room);
		connectedusers[rooms[i]] = [];
	}	
	
	// console.log("connectedusers", connectedusers);
	// console.log("connectedusers room1", connectedusers.room1);
})





// usernames which are currently connected to the chat

// 
// save rooms to database -- only for testing purposes
// for (var i = 0; i < rooms.length; i++){
// 	console.log("rooms",rooms[i] , "date",  Date.now())
// 	var roomList = new models.Room({room:rooms[i], created_by: "SERVER", created_at:  Date.now()});
// 	roomList.save(function (err) {
// 		// console.log("saved:" + rooms[i]); 
// 		if (err) return console.log(err);
// 		console.log("saved:" ); 
// 	})
// }

// when the server starts - clear out connected users in database



// all connected clients
io.sockets.on('connection', function (socket) {

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		/// get from FBAUTH.... then this function can be removed
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		// default room when user selects chat option
		socket.room = "room1";
		socket.join('room1');
		// update database
		// console.log(socket.username, "username");
		// connectedusers[socket.room].push({username: socket.username, socketid: socket.id});
		// console.log(connectedusers[socket.room])
		var newConnectedUser = new models.ConnectedUser({room:socket.room, username: socket.username, socketid: socket.id, created_at:  Date.now()});
		if (username != " "){
			newConnectedUser.save(function (err) {
			// console.log("saved:" + rooms[i]); 
			if (err) return console.log(err);
				console.log("saved new user" ); 
			})
		}
		
		models.ConnectedUser.find({room: socket.room}, function(err, results){ 
		if (err) return console.log(err);
			// send updated user list to everyone in that room
			io.sockets.in(socket.room).emit('connectedusers', results);
		});
		// echo to client they've connected - not needed
		// socket.emit('updatechat', 'SERVER', ' You are in ' + socket.room);
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');


	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		//update database with new chat message
		console.log(socket.room, "room", socket.username, "usename", data, "message");
		// maybe store to redis instead of db
		var newChatMessage = new models.Chat({ room: socket.room, username: socket.username, message: data, created_at:  Date.now()});
		newChatMessage.save(function (err) {
			// console.log("saved:" + rooms[i]); 
			if (err) return console.log(err);
			console.log("chat saved" ); 
		})
		// we tell the client to execute 'updatechat' with 2 parameters
		// send out to all users in that room including sender 
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('switchRoom', function(newroom){
		console.log("newroom", newroom);
		// leave the current room (stored in session)
		var oldroom = socket.room;
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		
		// update the room in the database / update list
		models.ConnectedUser.findOneAndUpdate({username: socket.username}, { $set: { room: newroom }}, function (err) {
			if (err) return console.log(err);
			console.log("new room saved" ); 
			});
		// sent message to OLD room and dont include the user that left
		console.log("old socket room", socket.room)
		///make this a separate broadcast message - not saved in db
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username +' has left this room');
		// update socket session room title
		socket.room = newroom;
		console.log("new socket room", socket.room)
		// get users in this new room from database
		models.ConnectedUser.find({room: socket.room}, function(err, results){ 
		if (err) return console.log(err)
			console.log(oldroom, results)
			// send updated user list to everyone in that room
			io.sockets.in(socket.room).emit('connectedusers', results);
		});

		models.ConnectedUser.find({room: oldroom}, function(err, results){ 
		if (err) return console.log(err)
			console.log(socket.room, results)
			// send updated user list to everyone in that room
			io.sockets.in(oldroom).emit('connectedusers', results);
		});
 

        // also update chat history for that room for that joiner only
				
		models.Chat.find({room: socket.room},function (err) {
			// console.log("saved:" + rooms[i]); 
			if (err) return console.log(err);
			console.log("chat saved" ); 
		})

		models.Chat
			.find({room: socket.room})
			.sort({'date': -1})
			.limit(20)
			.exec(function(err, chathistory) {
				if (err) return console.log(err);
				// emit to current user only
			// socket.emit('chat history', chathistory);
				console.log("chat history", chathistory)
			});

		//make this a separate broadcast message - not saved in db
    	// sent message to NEW room and dont include the user that left
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
		// socket.emit('updaterooms', rooms, newroom);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// *** Also disconnet on logout - just in case browser not closed
		// remove the username from global usernames list
		var room = socket.room;
		var username = socket.username;
		// delete connectedusers[socket.room][username];
		// delete usernames[socket.username];
		// update list of users in chat, client-side
		// io.sockets.emit('updateusers', usernames);
		// remove from database of list current users/rooms on disconect
		models.ConnectedUser.findOneAndRemove({username: socket.username}, function (err) {
		// console.log("saved:" + rooms[i]); 
			if (err) return console.log(err);
			console.log("disconnect use removed:" ); 
			models.ConnectedUser.find({room: room}, function(err, results){ 
			if (err) return console.log(err)
				console.log(socket.room, results)
				// send updated user list to everyone in that room
				io.sockets.in(room).emit('connectedusers', results);
			});

		});
		

		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});


}

module.exports = chat_server;