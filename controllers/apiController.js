var request = require('request'); 
var path = require('path');
var React = require('react');

// I pass the app in as a parameter - this means i dont need to require express above
function router(app){
	// for sockets.io server


	// ******Routes
	// remember restful routes use nouns and not verbs!

	// put this at the end after all other routes
	app.get('/', function(req, res){
		res.sendFile('/index.html');
	});

	// app.get('/chat', function(req, res){
	// 	res.sendFile('/index.html');
	// });
      
}

module.exports = router;