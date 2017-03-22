var request = require('request'); 
var path = require('path');
var React = require('react');

module.exports = function(app, passport, models){
    //route for facebook logout
var path = require('path');

app.get('/', function(req, res){
    res.sendFile(__dirname + "../../public/index.html");
})


    app.get('/logout', isLoggedIn, function(req, res){
        req.logout();
        res.redirect('/');
    })

    //route for fb authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook'));
// passport.authorize('facebook', { scope : ['email'] }));

   app.get('/auth/facebook/callback', passport.authenticate('facebook',{
            failureRedirect: '/'}), function(req,res){
                console.log(req)
            //successful auth  , redirect home 
            res.redirect('http://localhost:8080/#');
            // res.sendFile(__dirname + "../../public/Home.html");
            // res.sendFile(path.resolve('public/profile.html'));
        }
        );


// Fiona --- I added my routes here -- please check i did it right!
	app.get('/chat/rooms', passport.authenticate('facebook',{
            failureRedirect: '/'}), function(req, res){
		models.Room.find({}, function(err, results){
		console.log("rooms", results); 
		if (err) return console.log(err);
			res.json(results)
		});
	});
////
}

function isLoggedIn(req, res,next){
    if(req.isAuthenticated())
        return next();
        //if not logged in redirect to home page
    res.redirect('/');
}