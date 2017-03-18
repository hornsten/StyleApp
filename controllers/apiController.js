var request = require('request'); 
var path = require('path');
var React = require('react');


// having a problem trying to require the models in chat_server.js and apiController.js - mongoose error: "MongooseError: Cannot overwrite `ConnectedUser` model once compiled."
// soln pass them as arg to chat_server

// I pass the app in as a parameter - this means i dont need to require express above
function router(app, models){
	
	// ******Routes
	// remember restful routes use nouns and not verbs!

	// turn into REACT
	// get connected users for each room
	// view should change with users changing rooms
	// route to get all connected users for a given room for display
	app.get('/chat/user/:room', function(req, res){
		var room = req.params.room;
		// hardcoded room for now due to async issus - will fix later
		models.ConnectedUser.find({room: room}, function(err, results){ 
		if (err) return console.log(err);
			res.json(results)
		});
	});
	// route to get all chat rooms for display
	app.get('/chat/rooms', function(req, res){
		models.Room.find({}, function(err, results){
		console.log("rooms", results); 
		if (err) return console.log(err);
			res.json(results)
		});
	});


	// put this at the end after all other routes
	app.get('/', function(req, res){
		res.sendFile('/index.html');
	});


	// app.get('/chat', function(req, res){
	// 	res.sendFile('/index.html');
	// });
      
}

module.exports = router;