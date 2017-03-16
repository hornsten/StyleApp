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
	app.get('/chat/user/:room', function(req, res){
		var room = req.params.room;
		console.log(room);
		// ({room: room});
		// hardcoded room for now due to async issus - will fix later
		models.ConnectedUser.find({room: room}, function(err, results){
		// console.log("saved:" + rooms[i]); 
		if (err) return console.log(err);
		console.log("results:" , results); 
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