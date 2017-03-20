
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

	// TO DO on connection automatically join room1


	// when the client emits 'adduser', this listens and execute
	socket.on('adduser', function(username){
		/// get from FBAUTH.... then this function can be on connection instead
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		// default room when user selects chat option
		socket.room = "room1";
		socket.join("room1");

		// update database or other datastore - map username to room and socket id
		var newConnectedUser = new models.ConnectedUser({room:socket.room, username: socket.username, socketid: socket.id, created_at:  Date.now()});
		if (username !== " "){
			newConnectedUser.save().then(function(){
					// get list of currently connected users from datastore to pass to client for display
					console.log("userlist socket.room", socket.room);
					// echo to client they've connected - not needed
					// var serverMessage = 'SERVER' + username + ' has connected to this room';

			}).then(function(){
					models.ConnectedUser.find({room: socket.room}).exec(function (err, results) {
						console.log("userlist", results);
						io.sockets.in(socket.room).emit('connectedusers', results);
					})
	
			}).then(function(){
				var cutoff = new Date();
				cutoff.setDate(cutoff.getDate()-1);
				models.Chat
					.find({room: socket.room, "created_at": {"$gte": cutoff }})
					.sort({'date': -1})
					.exec(function(err, results) {
						if (err) return console.log(err);
						// emit to current user only after they log in or join chat
						socket.emit('updatechat', results);
						// io.sockets.in(socket.room).emit('updatechat', socket.username, data);
						// io.sockets.in(socket.room).emit('updatechat', results);
					});
			})
		}
	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		//update database with new chat message
		// maybe store to redis instead of db
		console.log("username", socket.username, "message", data);
		var newChatMessage = new models.Chat({ room: socket.room, username: socket.username, message: data, created_at:  Date.now()});
		newChatMessage.save().then(function(){
			    var cutoff = new Date();
				cutoff.setDate(cutoff.getDate()-1);
				models.Chat
					.find({room: socket.room, "created_at": {"$gte": cutoff }})
					.sort({'date': -1})
					.exec(function(err, results) {
						if (err) return console.log(err);
						console.log("in here",results);
						// to everyone in that room including current client
						io.sockets.in(socket.room).emit('updatechat', results);
					});
				})	
	});

		// when the client emits 'sendchat', this listens and executes
	socket.on('sendprvtchat', function (chatuser, data) {
		//update database with new chat message
		// get users socket id

		// maybe store to redis instead of db
		var newChatMessage = new models.Chat({ room: socket.room, username: socket.username, message: data, created_at:  Date.now()});
		newChatMessage.save().then(function(){
			    var cutoff = new Date();
				cutoff.setDate(cutoff.getDate()-1);
				models.Chat
					.find({room: socket.room, "created_at": {"$gte": cutoff }})
					.sort({'date': -1})
					.exec(function(err, results) {
						if (err) return console.log(err);
						console.log("in here",results);
						// to everyone in that room including current client
						io.sockets.in(socket.room).emit('updatechat', results);
					});
				})	
	});


	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		switchRooms(newroom);
	});


	function switchRooms(newroom){
		var oldroom = socket.room;
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		// update the room in the database for current client
		models.ConnectedUser.findOneAndUpdate({username: socket.username}, { $set: { room: newroom }}).exec(function (err, results) {
			// sent message to OLD room and dont include the user that left
			///make this a separate broadcast message - not saved in db
			// socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username +' has left this room');
			// update socket session room title
			socket.room = newroom;
			// get users in this new room from database and sent to all users in new room
			models.ConnectedUser.find({room: newroom}, function(err, results){ 
			if (err) return console.log(err)
				// send updated user list to everyone in that room
				io.sockets.in(newroom).emit('connectedusers', results);
			});
			// get users in the old room from database and sent to all users in old room - updates user connected list
			models.ConnectedUser.find({room: oldroom}, function(err, results){ 
			if (err) return console.log(err)
				// send updated user list to everyone in that room
				io.sockets.in(oldroom).emit('connectedusers', results);
			});
	
		}).then(function(){
			// now get chat history for the new room
			var cutoff = new Date();
			cutoff.setDate(cutoff.getDate()-1);
			models.Chat
				.find({room: newroom, "created_at": {"$gte": cutoff }})
				.sort({'date': -1})
				.exec(function(err, results) {
					if (err) return console.log(err);
					// just send to current client that switched rooms not everyone
					socket.emit('updatechat', results);
					// io.sockets.in(socket.room).emit('updatechat', results);
				});
		})

		//make this a separate broadcast message - not saved in db
    	// sent message to NEW room and dont include the user that left
// socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
		// socket.emit('updaterooms', rooms, newroom);
	}

	socket.on('privatechat', function(chatuser){
		// want to send private chat to chatuser
		// first need to get socketid of chat user
		console.log(chatuser, "Chat user");
		// models.ConnectedUser.findOne({username: chatuser}, function(err, results){ 
		// if (err) return console.log(err);
		// 	console.log("socket id", results.socketid);
		// 	// send updated user list to everyone in that room
		// 	// io.sockets.in(socket.room).emit('connectedusers', results);
		// 	socket.to(results.socketid).emit('updatechat', [{_id: 1, username:socket.username, message: 'hello'}, {_id: 2, username:socket.username, message: 'how are u?'}]);
		// });

		var oldroom = socket.room;
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(chatuser);
		// update the room in the database for current client
		models.ConnectedUser.findOneAndUpdate({username: socket.username}, { $set: { room: chatuser }}).exec(function (err, results) {
			// sent message to OLD room and dont include the user that left
			///make this a separate broadcast message - not saved in db
			// socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username +' has left this room');
			// update socket session room title
			socket.room = chatuser;
			// get users in this new room from database and sent to all users in new room
			// models.ConnectedUser.find({room: newroom}, function(err, results){ 
			// if (err) return console.log(err)
			// 	// send updated user list to everyone in that room
			// 	io.sockets.in(newroom).emit('connectedusers', results);
			// });
			// get users in the old room from database and sent to all users in old room - updates user connected list
			models.ConnectedUser.find({room: oldroom}, function(err, results){ 
			if (err) return console.log(err)
				// send updated user list to everyone in that room
				io.sockets.in(oldroom).emit('connectedusers', results);
			});
	
		}).then(function(){
			// now get chat history for the new room
			var cutoff = new Date();
			cutoff.setDate(cutoff.getDate()-1);
			models.Chat
				.find({room: chatuser, username: socket.username, "created_at": {"$gte": cutoff }})
				.sort({'date': -1})
				.exec(function(err, results) {
					if (err) return console.log(err);
					// just send to current client that switched rooms not everyone
					// socket.emit('updatechat', results);
					// get soecket id of chat user
					models.ConnectedUser.findOne({username: chatuser}).exec(function(err,results){
						socket.to(results.socketid).emit('updatechat', results);
					})
					
				});
		})

		//make this a separate broadcast message - not saved in db
    	// sent message to NEW room and dont include the user that left
// socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
		// socket.emi

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
// socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});


}

module.exports = chat_server;