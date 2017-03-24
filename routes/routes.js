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
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email'] }));


   app.get('/auth/facebook/callback', passport.authenticate('facebook',{
            failureRedirect: '/'}), function(req,res){
                console.log(req.user.username);
                
            //successful auth  , redirect home 
            res.redirect('http://localhost:8080/#');
            // res.sendFile(__dirname + "../../public/Home.html");
            // res.sendFile(path.resolve('public/profile.html'));
        }
        );



    // app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header('Access-Control-Allow-Methods', 'GET');
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    // });

// removed this path from FB auth - cors issue
	app.get('/chat/rooms', function(req, res){
        //to allow CORS
        
		models.Room.find({}, function(err, results){
		console.log("rooms", results); 
		if (err) return console.log(err);
			res.json(results)
		});
	});

  
    app.get('/user', function(req, res){
                //to allow CORS
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // var userdetails = req.session.passport.user;
		// models.Room.find({}, function(err, results){
	   if ( req.isAuthenticated()){
            models.User.find({_id: req.session.passport.user}, function(err, results){
                    console.log("user detaiks", results); 
                    
                    res.json(results);
                    // if (err) return console.log(err);
                        
                    });
       } else {
            
            res.json({})
       }
		
        // res.json(req.session.passport.user);
	});
 // to allow CORS

////
}

function isLoggedIn(req, res,next){
    if(req.isAuthenticated())

        return next();
        //if not logged in redirect to home page
    res.redirect('/');
}