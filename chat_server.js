
function chat_server(io, models){


// rooms available in chat - populate from database 
// var rooms = ["room1", "room2", "room3"];  /// only needed when populating data 
// models.Room.find({}, function(err, results){  
// 	if (err) return console.log(err);
// 	for (var i = 0; i< results.length; i++){
// 		rooms.push(results[i].room);
// // 		connectedusers[rooms[i]] = [];
// // 	}	
// // })
// // save rooms to database -- only for testing purposes
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
	// Add user to database on connection then update room later when they select a room / prvt chat
	socket.on('adduser', function(username){
		var newConnectedUser = new models.ConnectedUser({room: "NewConnection", username: username, socketid: socket.id, created_at:  Date.now()});
		newConnectedUser.save().then(function(err, newconnection){
			// console.log("connections", newconnection)
		});
	})
	// when the client emits 'connectuser', this listens and executes
	// it updates the users room and sends back the latest connected user data and chat history for that room
	// this is when you select link to "Group" or "Private" chats
	socket.on('connectuser', function(username, defaultRoom){
		console.log("username, defaultRoom", username, defaultRoom);
		// Group Users subscribe to a default room
		// Private Chat Users are connected to a generic "Private" room until they start a private chat - no chats will be sent to this room, it is
		// purely for connected userlist updates
		/// get from FBAUTH.... then this function can be on connection instead
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		// only do this for group chat where there is a default room set
		socket.room = defaultRoom;
		socket.join(defaultRoom);
		// update database or other datastore - map username to room and socket id
		if (username !== ""){
			models.ConnectedUser.findOneAndUpdate({username: username}, { $set: { room: defaultRoom}}).exec(function(){
					// trying to find all connected users for Private Chat and onlly those in a Room for Group Chat
				    var searchObj = {};
					if (defaultRoom !== "Private"){
						searchObj = {room: defaultRoom}
					} 
					models.ConnectedUser.find(searchObj).exec(function (err, results) {
						io.sockets.in(defaultRoom).emit('connectedusers', results);
					})

			}).then(function(){
				// console.log("are we in here");
				if (defaultRoom !== "Private"){
					// send chat history for that room
					// console.log("are we in here");
					var cutoff = new Date();
					cutoff.setDate(cutoff.getDate()-1);
					models.Chat
						.find({room: socket.room, "created_at": {"$gte": cutoff }})
						.sort({'date': -1})
						.exec(function(err, results) {
							if (err) return console.log(err);
							// emit to current user only after they log in or join chat
							console.log("results", results);
							socket.emit('updatechat', results);
						});
				} else {
					console.log("are we in here2");
					// clear the chat window as no default private chats
					socket.emit('updatechat', []);
				}
			})
		}
	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// update database with new chat message
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
						// to everyone in that room including current client
						console.log("socket room for sendngchat back", socket.room);
						// don't want any broadcasts to all private users not in 1-1 chat
						if (socket.room !== "Private"){
							io.sockets.in(socket.room).emit('updatechat', results);
						}
						
					});
				})	
	});


	socket.on('switchRoom', function(newroom, chattype){
		// leave the current room (stored in session
		var username = socket.username;
		var oldroom = socket.room;
		socket.leave(socket.room);
		if (chattype === 'Private'){
			// the "newroom" variable stores the private chat username for chattype "Private" so it can now be extracted
			var chatWithUser = newroom;
			// look up database mapping table to get conversation id - if one exists for that user, if not create conversation id in the table for both parties
			models.PrivateChat.findOne({username: socket.username, chatwith: chatWithUser }).exec(function( err, results){
				if (results === null){
					var conversationid = socket.username +"-"+chatWithUser;
					// create both sides of the conversation in the table
					var newPrivateChat = new models.PrivateChat({username: socket.username, chatwith:chatWithUser, conversationid: conversationid });
					newPrivateChat.save().then(function(err, data){
					socket.room = conversationid;
					newroom = conversationid;
					socket.join(newroom);			
				}).then(function(){
						// save the other side so that when other user goes to join this private chat the conversation can be located
						var newPrivateChat = new models.PrivateChat({username: chatWithUser, chatwith: socket.username, conversationid: conversationid });
							newPrivateChat.save().then(function(err, data){
						})
					})
				} else {
					socket.room = results.conversationid;
					console.log("socket.room", socket.room)
					newroom = results.conversationid;
					socket.join(newroom);	
				}
			}).then(function(){
				// want to send user notification that you want a private chat
				// first get their socket id then send a message
				models.ConnectedUser.findOne({username: chatWithUser}).exec(function(err, results){
					console.log("socketid", results.socketid);
					// io.sockets.to(results.socketid).emit("privatemessage", 'I just met you');
					// socket.to(results.socketid).emit('privatemessage', 'I just met you');
					var message = socket.username + " would like a private style consultation.";
					// *** WORKING HERE
					io.sockets.connected[results.socketid].emit('privatemessage', message);

				})
				 
			})

		} else if (chattype === 'Group'){
			socket.room = newroom;
			socket.join(newroom);
		}

		// update the room in the database for current client
		console.log("newroom", newroom);
		models.ConnectedUser.findOneAndUpdate({username: socket.username}, { $set: { room: newroom }}).exec(function (err, results) {
			if (chattype === "Private"){
				// update all connected users list
				models.ConnectedUser.find({}, function(err, results){ 
				if (err) return console.log(err)
					console.log("conneced users on join private chat", results);
					// send to current client that switched to prvt room not everyone
					// socket.emit('connectedusers', results);
					// tell all users in the "Private" chat area
					io.sockets.in("Private").emit('connectedusers', results);
				});

			} else if (chattype === "Group"){

				// get users in this new room from database and sent to all users in new room
				models.ConnectedUser.find({room: newroom}, function(err, results){ 
				if (err) return console.log(err)
					// send updated user list to everyone in that room
					io.sockets.in(newroom).emit('connectedusers', results);
				});
		
			}

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
				});
		})

	})

	// when the user disconnects - delete from ConnectedUser collection
	socket.on('disconnect', function(){
		var room = socket.room;
		var username = socket.username;
		// remove from database of list current users/rooms on disconect
		models.ConnectedUser.findOneAndRemove({username: socket.username}, function (err) {
			if (err) return console.log(err);
			console.log("disconnect user removed:",  socket.username); 
			models.ConnectedUser.find({room: socket.room}, function(err, results){ 
			if (err) return console.log(err)
				// send updated user list to everyone in that room
				io.sockets.in(socket.room).emit('connectedusers', results);
			});
		});
		socket.leave(socket.room);
	});
});


}
// to do: test if connection, validate disconnect, message when prvt chat....to socket id then message, images uploading and storing
// remove old chat history - housekeeping, redis?
// make it pretty, test, test, test
// toggle chat hypelinks - open/close chat
// onkeyup for chat part - remove button

module.exports = chat_server;