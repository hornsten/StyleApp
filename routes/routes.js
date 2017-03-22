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
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

   app.get('/auth/facebook/callback', passport.authenticate('facebook',{
            failureRedirect: '/'}), function(req,res){
                console.log(req.user.username);
                
            //successful auth  , redirect home 
            res.redirect('http://localhost:8080/#');
            // res.sendFile(__dirname + "../../public/Home.html");
            // res.sendFile(path.resolve('public/profile.html'));
        }
        );


// removed this path from FB auth - cors issue
	app.get('/chat/rooms', function(req, res){
		models.Room.find({}, function(err, results){
		console.log("rooms", results); 
		if (err) return console.log(err);
			res.json(results)
		});
	});

    app.get('/user', function(req, res){
        var userdetails = req.session.passport.user;
		// models.Room.find({}, function(err, results){
	   if (userdetails){
            models.User.find({_id: req.session.passport.user}, function(err, results){
                    console.log("user", results); 
                    if (err) return console.log(err);
                        res.json(results);
                    });
       } else {
           res.json({})
       }
		
        // res.json(req.session.passport.user);
	});
////
}

function isLoggedIn(req, res,next){
    if(req.isAuthenticated())

        return next();
        //if not logged in redirect to home page
    res.redirect('/');
}