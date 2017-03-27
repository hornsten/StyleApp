
function chat_server(app, io, models){

var heartbeatObj = {};
var siofu = require("socketio-file-upload");
// import siofu from 'socketio-file-upload';
var cloudinary = require('cloudinary');

var cloudinary = require('cloudinary');
// var cloudinary_keys = require('../auth/cloudinary_keys');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API, 
  api_secret: process.env.CLOUDINARY_SECRET
});

// var cloudinary_keys = require('./auth/cloudinary_keys');
// cloudinary.config(cloudinary_keys);
// for file uploads to chat socket
app.use(siofu.router);

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
	// var uploader = new siofu();
	// uploader.dir = "/public/assets/img";
	// uploader.listen(socket);

	socket.on('send-file', function(name, buffer) {
        var fs = require('fs');
       console.log("getggine  in here");
	    var usernameNoSpaces = socket.username.replace(/\s/g, '_');
		// create a unique name for the file
	    var uniqueFileName =   usernameNoSpaces + '_' + Date.now() + '_' + name;
        //path to store uploaded files (NOTE: presumed you have created the folders)
		// stored in temp area before being pushed to cloud
        var fileName = __dirname + '/public/assets/img/' + uniqueFileName;
		// remove .png extension
		var publicFileName = uniqueFileName.slice(0, -4);
		console.log("new filename", fileName);
		
		
		// save to data base

        fs.open(fileName, 'a', 0755, function(err, fd) {
            if (err) throw err;

            fs.write(fd, buffer, null, 'Binary', function(err, written, buff) {
                fs.close(fd, function() {
                    console.log('File saved successful!');
					var filePath = '/public/assets/img/' + uniqueFileName;
					cloudinary.uploader.upload(fileName, function(result) { 


					    console.log("url",result.url);
						var filelocation = result.url;
						// save to the database
						var newChatMessage = new models.Chat({ room: socket.room, username: socket.username, message: filelocation, type: "file", created_at:  Date.now()});
						newChatMessage.save().then(function(){
								var cutoff = new Date();
								cutoff.setDate(cutoff.getDate()-1);
								models.Chat
									.find({room: socket.room, "created_at": {"$gte": cutoff }})
									.sort({'date': -1})
									.exec(function(err, results) {
										if (err) return console.log(err);
										// to everyone in that room including current client
										// console.log("socket room for sendngchat back", socket.room);
										// don't want any broadcasts to all private users not in 1-1 chat
										if (socket.room !== "Private"){
											io.sockets.in(socket.room).emit('updatechat', results);
										}
										
									});
								})	
						    // // remove file from from tmp area
							// TODO

					}, {
						public_id: publicFileName, 
						crop: 'limit',
						width: 2000,
						height: 2000,
						eager: [
						{ width: 200, height: 200, crop: 'thumb',
							radius: 20 },
						{ width: 100, height: 150, crop: 'fit', format: 'png' }
						],                                     
						// tags: ['special', 'for_homepage']
					} );
					// save to data base
					// message = '<img src={\''+ fileName + '} alt="\''+ name + '"/>';
					// console.log(message);
					// var savefileName = '/assets/img/' + name;
			

                });
            })
        });

    });

	socket.on('send-url', function(url) {
		
		// maybe just save name and pull it back later on correct path
		var savefileName = url;
		console.log(url); // these are internally saved files (ie already saved) so dont need to save the actual file just the name / link to it
		var newChatMessage = new models.Chat({ room: socket.room, username: socket.username, message: savefileName, type: "file", created_at:  Date.now()});
		newChatMessage.save().then(function(){
				var cutoff = new Date();
				cutoff.setDate(cutoff.getDate()-1);
				models.Chat
					.find({room: socket.room, "created_at": {"$gte": cutoff }})
					.sort({'date': -1})
					.exec(function(err, results) {
						if (err) return console.log(err);
						// to everyone in that room including current client
						// console.log("socket room for sendngchat back", socket.room);
						// don't want any broadcasts to all private users not in 1-1 chat
						if (socket.room !== "Private"){
							io.sockets.in(socket.room).emit('updatechat', results);
						}
						
					});
				})	

	});
		

		socket.on('sendclosetpicker', function(item){

			console.log("item", item)
		})


	socket.on('img-file', function(name, image) {
        var fs = require('fs');
       console.log("getggine  in here");
        //path to store uploaded files (NOTE: presumed you have created the folders)
        var fileName = __dirname + '/public/assets/img/' + name;
		console.log(fileName);
		
		
		

		fs.writeFile(fileName, image, 'base64', function(err) {
			console.log('File saved successful!');
		});
		// // save to data base

        // fs.open(fileName, 'a', 0755, function(err, fd) {
        //     if (err) throw err;

        //     fs.write(fd, buffer, null, 'Binary', function(err, written, buff) {
        //         fs.close(fd, function() {
        //             console.log('File saved successful!');
		// // 			// save to data base
		// // 			// message = '<img src={\''+ fileName + '} alt="\''+ name + '"/>';
		// // 			// console.log(message);
		// // 			var savefileName = '/assets/img/' + name;
		// // 			var newChatMessage = new models.Chat({ room: socket.room, username: socket.username, message: savefileName, type: "file", created_at:  Date.now()});
		// // 			newChatMessage.save().then(function(){
		// // 					var cutoff = new Date();
		// // 					cutoff.setDate(cutoff.getDate()-1);
		// // 					models.Chat
		// // 						.find({room: socket.room, "created_at": {"$gte": cutoff }})
		// // 						.sort({'date': -1})
		// // 						.exec(function(err, results) {
		// // 							if (err) return console.log(err);
		// // 							// to everyone in that room including current client
		// // 							// console.log("socket room for sendngchat back", socket.room);
		// // 							// don't want any broadcasts to all private users not in 1-1 chat
		// // 							if (socket.room !== "Private"){
		// // 								io.sockets.in(socket.room).emit('updatechat', results);
		// // 							}
									
		// // 						});
		// // 					})	

        //         });
        //     })
        // });

    });


	// TO DO on connection automatically join room1 so put first two function connected user and adduser in the "on connection"" part directoy
	// Add user to database on connection then update room later when they select a room / prvt chat
	socket.on('adduser', function(username){
		// find if there, then update
		models.ConnectedUser.findOne({username: username}).exec(function(err, user){
			// there should not be a connected user of this name as it is unique but if there is for some reason like user did not disconnect properly update it
			if (user === null){
				//add it
				var newConnectedUser = new models.ConnectedUser({room: "NewConnection", username: username, socketid: socket.id, created_at:  Date.now()});
				newConnectedUser.save().then(function(err, newconnection){
					console.log(err);
				});
			} else {
				//update it
				models.ConnectedUser.findOneAndUpdate({username: username}, { $set: { room: "NewConnection", socketid: socket.id, created_at:  Date.now()}}).exec(function(){
					console.log(err);
				})
				// trying to find all connected users for Private Chat and onlly those in a Room for Group Ch}
			}
		})

	})

	var lastHeartBeat = Date.now();
	// when the client emits 'connectuser', this listens and executes
	// it updates the users room and sends back the latest connected user data and chat history for that room
	// this is when you select link to "Group" or "Private" chats
	socket.on('connectuser', function(username, defaultRoom){
		// maybe ping when needed would be better??
		socket.conn.on('heartbeat', function(lastHeartBeat) {
			// store heartbeats to verify socket connections later
			lastHeartBeat = Date.now();
			heartbeatObj[socket.username] = lastHeartBeat;
		});
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
						// console.log("socket room for sendngchat back", socket.room);
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
		var chatWithUser = newroom;
		var currentSocket = socket;
		// var userSession = socket.id;
		if (chattype === 'Private'){
			// the "newroom" variable stores the private chat username for chattype "Private" so it can now be extracted
			// var chatWithUser = newroom;
			// look up database mapping table to get conversation id - if one exists for that user, if not create conversation id in the table for both parties
			models.PrivateChat.findOne({username: socket.username, chatwith: chatWithUser }).exec(function( err, results){
				if (results === null){
					var conversationid = socket.username +"-"+chatWithUser;
					// create both sides of the conversation in the table
					var newPrivateChat = new models.PrivateChat({username: socket.username, chatwith:chatWithUser, conversationid: conversationid });
					newPrivateChat.save().then(function(err, data){
					socket.room = conversationid;
					socket.join(conversationid);	// used to send messages to this private room
				}).then(function(){
						// save the other side so that when other user goes to join this private chat the conversation can be located
						var newPrivateChat = new models.PrivateChat({username: chatWithUser, chatwith: socket.username, conversationid: conversationid });
							newPrivateChat.save().then(function(err, data){
						})
					})
				
				} else {
					socket.room = results.conversationid;
					socket.join(results.conversationid);	
					
				}
			}).then(function(){
				// want to send user notification that you want a private chat
				// first get their socket id then send a message
				models.ConnectedUser.findOne({username: chatWithUser}).exec(function(err, results){
					console.log(results);
					if (results === null){
						// no connected user
						// tell requestor user not available
						var message = chatWithUser + " is not currently online";
						if (io.sockets.connected[currentSocket.id]) io.sockets.connected[currentSocket.id].volatile.emit('privatemessage', message);
					} else {
						// load previous chat
						var cutoff = new Date();
						cutoff.setDate(cutoff.getDate()-1);
						models.Chat
							.find({room: currentSocket.room, "created_at": {"$gte": cutoff }})
							.sort({'date': -1})
							.exec(function(err, results) {
								if (err) return console.log(err);
								// just send to current client that switched rooms not everyone
								currentSocket.emit('updatechat', results);
							});
						// console.log("socketid", results.socketid);
						var socket = results.socketid;
						// console.log(socket, "socket");
						// io.sockets.to(results.socketid).emit("privatemessage", 'I just met you');
						// socket.to(results.socketid).emit('privatemessage', 'I just met you');
						var message = username + ' would like to have private style consultation.';
						// console.log("message", message);
						// *** WORKING HERE -- problem if you try to connect to stale socket that did not disconnect properly
						// io.sockets.connected[results.socketid].emit('privatemessage', message);
						// do a volatile emit in case socket id is stale
						var currentTime = Date.now();
						// check if socket is active - heartbeat should have been received within last 60 secs
						// can be problems 
						if (chatWithUser in heartbeatObj){
							var timeElapsed = (currentTime - heartbeatObj[chatWithUser]);
							console.log(timeElapsed);
							if (timeElapsed < 60000){
								if (io.sockets.connected[results.socketid]) io.sockets.connected[results.socketid].volatile.emit('privatemessage', message);
							} 
						} else {
							var message = chatWithUser + " is not currently online";
							if (io.sockets.connected[currentSocket.id]) io.sockets.connected[currentSocket.id].volatile.emit('privatemessage', message);
							// socket.emit('connectedusers', results);

						}

					}
					
				})
				 
			})

		} else if (chattype === 'Group'){
			socket.room = newroom;
			socket.join(newroom);
		}

		// update the room in the database for current client
		// console.log("newroom should be group or username", newroom);
		models.ConnectedUser.findOneAndUpdate({username: socket.username}, { $set: { room: newroom }}).exec(function (err, results) {
			if (chattype === "Private"){
				// update private chat connected users list with a list of  all connected users
				models.ConnectedUser.find({}, function(err, results){ 
				if (err) return console.log(err)
					// send to current client that switched to prvt room not everyone
					// tell all users in the "Private" chat area
					io.sockets.in("Private").emit('connectedusers', results);
					// and to current user if in a private chat
					socket.emit('connectedusers', results);
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
				.find({room: socket.room, "created_at": {"$gte": cutoff }})
				.sort({'date': -1})
				.exec(function(err, results) {
					if (err) return console.log(err);
					// just send to current client that switched rooms not everyone
					socket.emit('updatechat', results);
				});
		})

	})

    socket.on('interactive_closet', function(item, index){
		console.log(item, "item", index , "index");  //item contains id and src
        console.log(socket.room, "room"); 
		// now save these to the database for the current room  / private conversation
		// make sure there is a valid converation going on
		if (socket.room !== "Private"){
		

		    var returnObj= { index: index, item: item};
			console.log("data to be sent for interactive", returnObj);
			/// for testing
			io.sockets.in(socket.room).emit('updateclothesbin', returnObj);
			/// for prod - only emit to other party
			// socket.broadcast.to(socket.room).emit('updateclothesbin', result);

			// we dont need to save - just emit to other party in conversation
			// var newInteractiveClothesBin = new models.InteractiveClothesBin({conversationid: socket.room, index: index, item: item});
			// newInteractiveClothesBin.save(function(){
				
				// console.log("error", err);
				// console.log("result", result);
				// emit to other user
				// io.sockets.in(socket.room).emit('updateclothesbin', results);
				// sending to all clients in 'game' room(channel) except sender
			
				// console.log(socket.room);
				

			// });

		}
		

	})

	// when the user disconnects - delete from ConnectedUser collection
	// **** NB on logout remove user from ConnectedUser table too IF still there after disconnect - so wont fall over on private message emit to invalid socketid
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
