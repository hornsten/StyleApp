module.exports = function(app, passport){
    

    // //get the user id
    // app.get('/getUserId', isLoggedIn, function(req, res){
    //     res.send(req.user.id);
    // })

    //check user us authenticated

    app.get('/auth', function(req, res, next){
        var recentAuth = req.session.recentAuth;
        req.session.recentAuth = null;
        res.json({
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    });

    //route for facebook logout

    app.get('/logout', isLoggedIn, function(req, res){
        req.logout();
        res.redirect('/');
    })

    //route for fb authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook'));


    app.get('/auth/facebook/callback*', passport.authenticate('facebook',{
        successRedirect: '/',
        failureRedirect: '/'}), function(req,res){
            //successful auth  , redirect home 
            req.session.recentAuth = true;
            res.redirect('/');
        }
        );
}

function isLoggedIn(req, res,next){
    if(req.isAuthenticated())
        return next();
        //if not logged in redirect to home page
    res.redirect('/');
}