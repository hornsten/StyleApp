var request = require('request'); 
var path = require('path');
var React = require('react');

// I pass the app in as a parameter - this means i dont need to require express above
function router(app){
	// ******Routes
	// remember restful routes use nouns and not verbs!

	// put this at the end after all other routes
	app.use(function(req, res){
		 res.render('index');
	})
}

module.exports = router;