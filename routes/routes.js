module.exports = function(app, passport){
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


   app.get('/auth/facebook/callback', passport.authenticate('facebook',{
            failureRedirect: '/'}), function(req,res){
                console.log(req)
            //successful auth  , redirect home 
            res.redirect('http://localhost:8080/#');
            // res.sendFile(__dirname + "../../public/Home.html");
            // res.sendFile(path.resolve('public/profile.html'));
        }
        );
}

function isLoggedIn(req, res,next){
    if(req.isAuthenticated())
        return next();
        //if not logged in redirect to home page
    res.redirect('/');
}