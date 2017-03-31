//facebook strategy
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys');
// load up the user model
var User = require('../models/user');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    })

var clientID = process.env.FACEBOOK_CLIENTID || '1454706357935887';
var clientSecret = process.env.FACEBOOK_SECRET || 'f956114b95df65fd35f1e5552b0fb756';
var callbackURL = process.env.FACEBOOK_URL || 'http://localhost:8080/auth/facebook/callback';

    passport.use(new FacebookStrategy({
        // clientID: keys.facebookAuth.clientID,
        clientID: clientID,
        clientSecret:clientSecret,
        callbackURL: callbackURL,
        profileFields: ['id', 'email', 'first_name', 'last_name']


    },

        function (token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {
                User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user); // user found, return that user
                    }

                    else {
                        // if there is no user, create them
                        var newUser = new User();

                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name = profile.displayName;
                        newUser.facebook.firstName= profile.name.givenName;
                        newUser.facebook.lastName =  profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                    // newUser.facebook.picture = profile.photos[0].value;
                        newUser.facebook.link = profile.link;
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));
}